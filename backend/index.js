require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;
const { HoldingsModel } = require('./model/HoldingsModel');
const { PositionsModel } = require('./model/PositionsModel');
const { OrdersModel } = require('./model/OrdersModel');
const { UsersModel } = require('./model/UsersModel');
const bcrypt = require("bcryptjs");
const app = express();
app.use(cors());
app.use(express.json());

// --- 1. OPTIMIZED BATCH DATA ENGINE ---
const getLivePrices = async (stocks) => {
    if (!stocks || stocks.length === 0) return [];
    try {
        const tickers = stocks.map(s => s.name.includes('.') ? s.name : `${s.name}.NS`);
        const results = await yahooFinance.quote(tickers, { timeout: 5000 });

        return stocks.map(stock => {
            const ticker = stock.name.includes('.') ? stock.name : `${stock.name}.NS`;
            const liveData = Array.isArray(results) 
                ? results.find(r => r.symbol === ticker) 
                : (results.symbol === ticker ? results : null);

            if (liveData && liveData.regularMarketPrice) {
                return {
                    ...stock._doc,
                    price: liveData.regularMarketPrice,
                    day: `${liveData.regularMarketChangePercent?.toFixed(2)}%`,
                    isLive: true
                };
            }
            return fallbackSimulate(stock);
        });
    } catch (err) {
        console.log("🚀 API Batch Limit/Error - Simulation Mode active");
        return stocks.map(stock => fallbackSimulate(stock));
    }
};

const fallbackSimulate = (stock) => {
    const fluctuation = (Math.random() * 2 - 1).toFixed(2);
    const newPrice = Number(stock.price) + Number(fluctuation);
    return {
        ...stock._doc,
        price: newPrice,
        day: fluctuation > 0 ? `+${fluctuation}%` : `${fluctuation}%`,
        isLive: false
    };
};

// --- 2. SEEDING LOGIC ---
// Note: Seed data is now "admin" owned so new users start empty
const restoreAllData = async () => {
    const hCount = await HoldingsModel.countDocuments();
    if (hCount === 0) {
        await HoldingsModel.insertMany([
            { user: "admin", name: "INFY", qty: 10, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%" },
            { user: "admin", name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
            { user: "admin", name: "TCS", qty: 2, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%" }
        ]);
        console.log("✅ Seed Data Restored for Admin");
    }
};

// --- 3. ROUTES ---

// GET: Fetches ONLY the logged-in user's holdings
app.get('/allHoldings', async (req, res) => {
    const { user } = req.query; 
    try {
        const holdings = await HoldingsModel.find({ user: user }); 
        const updated = await getLivePrices(holdings);
        res.json(updated);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET: Fetches ONLY the logged-in user's positions
app.get('/allPositions', async (req, res) => {
    const { user } = req.query;
    try {
        const positions = await PositionsModel.find({ user: user });
        const updated = await getLivePrices(positions);
        res.json(updated);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET: Fetches ONLY the logged-in user's orders
app.get('/allOrders', async (req, res) => {
    const { user } = req.query;
    try {
        const orders = await OrdersModel.find({ user: user });
        res.json(orders);
    } catch (e) { res.status(500).json({ error: e.message }); }
});
// --- POST: User Registration ---
app.post("/signup", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // 1. Basic Validation
        if (!email || !username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // 2. Hash Password for Security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create User
        const newUser = new UsersModel({ 
            email, 
            username: username.toLowerCase(), // Store lowercase to avoid case-sensitivity issues
            password: hashedPassword 
        });

        await newUser.save();
        res.status(201).json({ success: true, message: "Signup successful!" });

    } catch (error) {
        // 4. Handle MongoDB Duplicate Key Error (E11000)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ 
                success: false, 
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists!` 
            });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// --- POST: User Authentication ---
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Find user by lowercase username
        const user = await UsersModel.findOne({ username: username.toLowerCase() });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        // 2. Compare Hashed Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Do NOT send the password back to the frontend
            res.status(200).json({ 
                success: true, 
                user: { username: user.username } 
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid username or password" });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during login" });
    }
});
/**
 * POST: TRADE EXECUTION ENGINE
 * Filtered by user to ensure private portfolios.
 */
app.post("/newOrder", async (req, res) => {
    try {
        const { name, qty, price, mode, user } = req.body; // 'user' must be passed from frontend
        const numQty = Number(qty);
        const userPrice = Number(price);
        const modeInput = mode.toUpperCase();

        if (!user) return res.status(400).json({ message: "User not identified!" });

        const ticker = name.includes('.') ? name : `${name}.NS`;
        let actualLTP;
        try {
            const quote = await yahooFinance.quote(ticker);
            actualLTP = quote.regularMarketPrice;
        } catch (e) {
            const stock = await HoldingsModel.findOne({ name, user });
            actualLTP = stock ? stock.price : userPrice;
        }

        // --- BUY LOGIC ---
        if (modeInput === "BUY") {
            // Update User-Specific Holdings
            let hold = await HoldingsModel.findOne({ name, user });
            if (hold) {
                hold.qty += numQty;
                hold.avg = (hold.avg + userPrice) / 2; 
                await hold.save();
            } else {
                await new HoldingsModel({
                    user, name, qty: numQty, avg: userPrice, price: actualLTP, net: "+0.00%", day: "+0.00%"
                }).save();
            }

            // Update User-Specific Positions
            let pos = await PositionsModel.findOne({ name, user });
            if (pos) {
                pos.qty += numQty;
                await pos.save();
            } else {
                await new PositionsModel({
                    user, name, qty: numQty, avg: userPrice, price: actualLTP, net: "+0.00%", day: "+0.00%", isLive: true
                }).save();
            }
        } 
        
        // --- SELL LOGIC ---
        else if (modeInput === "SELL") {
            let hold = await HoldingsModel.findOne({ name, user });
            
            if (!hold || hold.qty < numQty) {
                return res.status(400).json({ message: "Insufficient holdings to sell!" });
            }

            hold.qty -= numQty;
            if (hold.qty === 0) {
                await HoldingsModel.deleteOne({ _id: hold._id });
            } else {
                await hold.save();
            }

            let pos = await PositionsModel.findOne({ name, user });
            if (pos) {
                pos.qty -= numQty;
                if (pos.qty <= 0) {
                    await PositionsModel.deleteOne({ _id: pos._id });
                } else {
                    await pos.save();
                }
            }
        }

        // Record User-Specific Order
        await new OrdersModel({
            user, name, qty: numQty, price: userPrice, mode: modeInput,
            time: new Date().toLocaleTimeString('en-IN'),
            status: "COMPLETE"
        }).save();

        res.status(200).json({ status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3002; 

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("✅ MongoDB Connected");
    restoreAllData();
    // Change '3002' to 'PORT' and add '0.0.0.0'
    app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server is Live on Port ${PORT}`));
}).catch(err => console.error("❌ Connection Error:", err));

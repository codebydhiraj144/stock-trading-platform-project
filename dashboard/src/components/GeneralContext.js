import React, { useState } from "react";

const GeneralContext = React.createContext();

/**
 * Manages global UI states, stock selections, and cross-component data synchronization.
 */
export const GeneralContextProvider = (props) => {
    const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
    const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
    const [selectedStockUID, setSelectedStockUID] = useState("");
    const [selectedStockPrice, setSelectedStockPrice] = useState(0);
    const [selectedStockQty, setSelectedStockQty] = useState(0); 
    
    // Toggle state to trigger re-fetching of data in distant components like Summary or Holdings
    const [needsUpdate, setNeedsUpdate] = useState(false);

    const triggerRefresh = () => setNeedsUpdate(prev => !prev);

    // Centralized handlers to manage order window states and inject stock-specific data
    const handleOpenBuyWindow = (uid, price) => {
        setSelectedStockUID(uid);
        setSelectedStockPrice(price);
        setIsBuyWindowOpen(true);
    };

    const handleOpenSellWindow = (uid, price, qty) => { 
        setSelectedStockUID(uid);
        setSelectedStockPrice(price);
        setSelectedStockQty(qty);
        setIsSellWindowOpen(true);
    };

    const handleCloseBuyWindow = () => setIsBuyWindowOpen(false);
    const handleCloseSellWindow = () => setIsSellWindowOpen(false);

    return (
        <GeneralContext.Provider value={{
            openBuyWindow: handleOpenBuyWindow,
            closeBuyWindow: handleCloseBuyWindow,
            openSellWindow: handleOpenSellWindow,
            closeSellWindow: handleCloseSellWindow,
            isBuyWindowOpen,
            isSellWindowOpen,
            selectedStockUID,
            selectedStockPrice,
            selectedStockQty,
            needsUpdate,
            triggerRefresh
        }}>
            {props.children}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;
import React, { useState, useContext } from "react";
import { Tooltip, Grow } from "@mui/material"; 
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";
import DoughnoutChart from "./DoughnoutChart";

// Pre-calculating labels for the Doughnut chart to keep the component clean
const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  // Chart.js data configuration mapping prices from the local data source
  const data = {
    labels,
    datasets: [
      {
        label: "Market Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse, nifty fut weekly..."
          className="search"
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>

      {/* Visualizing watchlist distribution for better portfolio insight */}
      <DoughnoutChart data={data}/>
    </div>
  );
};

/**
 * Individual item component managing its own hover state for action triggers.
 */
const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        {/* Conditional class based on price trend (Up/Down) */}
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {/* Rendering action buttons only when the user hovers over the specific instrument */}
      {showWatchlistActions && <WatchListActions id={stock.name} price={stock.price} />}
    </li>
  );
};

/**
 * Action component utilizing Context to bridge the WatchList with the Order windows.
 */
const WatchListActions = ({ id, price }) => { 
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  return (
    <span className="actions">
      <span>
        {/* Material UI Tooltips for enhanced accessibility and UX feedback */}
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={() => openBuyWindow(id, price)}>B</button>
        </Tooltip>
        
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={() => openSellWindow(id, price)}>S</button>
        </Tooltip>

        <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

export default WatchList;
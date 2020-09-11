import React, { useState } from 'react';
import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';
import { getSelectedSymbolActionCreator } from '../../redux/modules/selectedSymbol';
import './RemindingStock.scss';
import { useRef } from 'react';

export default function RemindingStock({ stockList }) {
  const dispatch = useDispatch();

  const sendSymbol = (selectedStock) => {
    dispatch(getSelectedStockSagaActionCreator(selectedStock, 'stock'));
    dispatch(getSelectedSymbolActionCreator(selectedStock, 'stock'));
  };

  const [remindingStock, setRemindingStock] = useState(false);
  function click() {
    setRemindingStock(!remindingStock);
  }

  const stocklistItem = useRef();
  console.log(stocklistItem.current);

  return (
    <>
      <button className="reminding-btn" onClick={click}>
        알림
      </button>
      {remindingStock && (
        <div className="stocklist-wrap">
          <ul className="stocklist">
            {stockList.map((stock) => {
              const volume = stock.stockData
                .map((item) => item.volume)
                .reverse();

              function transSymbol(e) {
                e.stopPropagation();
                sendSymbol(stock.symbol);
              }

              if (volume[0] < volume[1] || stock.symbol === 'DOW') return false;
              console.log(stockList);
              return (
                <li
                  onClick={transSymbol}
                  className="clear-fix stocklist-item"
                  ref={stocklistItem}
                >
                  <div className="sidebar-left">
                    <span className="sidebar-symbol">{stock.symbol}</span>
                    <br />
                    <span className="sidebar-name">{stock.name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';
import { getSelectedSymbolActionCreator } from '../../redux/modules/selectedSymbol';
import './RemindingStock.scss';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function RemindingStock({ remindingStockList, loading }) {
  const dispatch = useDispatch();

  const sendSymbol = (selectedStock) => {
    dispatch(getSelectedStockSagaActionCreator(selectedStock, 'stock'));
    dispatch(getSelectedSymbolActionCreator(selectedStock, 'stock'));
  };

  const [remindingStock, setRemindingStock] = useState(false);
  const alertBtn = useRef();
  const alertMsg = useRef();
  const alertCount = remindingStockList.length;

  const handleClickOutside = ({ target }) => {
    if (target === alertBtn.current) {
      setRemindingStock(!remindingStock);
    } else if (target === alertMsg.current) {
      setRemindingStock(remindingStock);
    } else {
      setRemindingStock(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [remindingStock]);
  // 위의 deps는 alret아이콘 다시 눌러도 팝업없어지게하려고 설정함

  return (
    <>
      {!loading && (
        <>
          <button className="reminding-btn" ref={alertBtn}>
            {/* onClick={click} */}
            {remindingStockList.length && alertCount && (
              <span className="alert-color">{alertCount}</span>
            )}
            alert
          </button>
          {remindingStock && (
            <div className="stocklist-wrap">
              <>
                {/* {!alertCount && <p className="alert-msg">No messages yet</p>} */}

                <p className="alert-msg" ref={alertMsg}>
                  {alertCount
                    ? 'The trading volume of the stocks below is increasing.'
                    : 'No messages yet'}
                </p>

                {remindingStockList && (
                  <ul className="stocklist">
                    {remindingStockList.map((stock) => {
                      function transSymbol(e) {
                        e.stopPropagation();
                        sendSymbol(stock.symbol);
                        setRemindingStock(!remindingStock);
                      }
                      return (
                        <>
                          <li
                            onClick={transSymbol}
                            className="clear-fix stocklist-item"
                          >
                            <div className="sidebar-left">
                              <span className="sidebar-symbol">
                                {stock.symbol}
                              </span>
                              <br />
                              <span className="sidebar-name">{stock.name}</span>
                            </div>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                )}
              </>
            </div>
          )}
        </>
      )}
    </>
  );
}

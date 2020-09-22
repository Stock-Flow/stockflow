import React, { useEffect } from 'react';
import * as V from 'victory';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';
import { getSelectedSymbolActionCreator } from '../../redux/modules/selectedSymbol';
import { LoadingOutlined } from '@ant-design/icons';
import { getfavoriteListButtonActionCreator } from '../../redux/modules/selectedSymbol';

export default function StockList({
  stockList,
  getsidebarStock,
  loading,
  search,
  menu,
  toggleMenu,
  toggleMobile
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    getsidebarStock(search);
  }, [getsidebarStock, search]);

  const sendSymbol = (selectedStock) => {
    dispatch(getSelectedStockSagaActionCreator(selectedStock, 'stock'));
    dispatch(getSelectedSymbolActionCreator(selectedStock, 'stock'));
  };

  const sendToSymbol = (selectedStock, favoriteDataList) => {
    dispatch(
      getfavoriteListButtonActionCreator(
        selectedStock,
        favoriteDataList,
        'stock',
      ),
    );
  };

  const favoriteData = useSelector(
    (state) => state.selectedSymbol.selectedStockSymbol,
  );

  if (!loading) {
    return (
      <div className="sidebar stock">
        <ul className={menu === 'stock' ? '' : 'none'}>
          {stockList.map(
            (stock) => {
              let stocks = [];
              const keys = stock.stockData.map((date) => date.time).reverse();
              const values = stock.stockData.map((item) => +item.open);
              keys.forEach((item, i) => {
                stocks.push({ date: item, price: values[i] });
              });
              let color = stock.change[0] === '-' ? 'yellow' : 'red';

              function transSymbol(e) {
                toggleMenu();
                if (window.innerWidth < 768) {
                  toggleMobile();
                }
                e.stopPropagation();
                sendSymbol(stock.symbol);
              }

              // const selectedBookmark = (e) => {
              //   if (e.target.parentNode.previousElementSibling.firstElementChild.nodeValue === stock.symbol) {
              //     console.log(e.target.value)
              //     setMark(!mark)
              //   }
              // }

              const symbol = stock.symbol;
              let favoriteDataList = false;
              if (
                favoriteData.filter((stock) => stock.symbol === symbol)
                  .length !== 0
              ) {
                favoriteDataList = favoriteData.filter(
                  (stock) => stock.symbol === symbol,
                )[0].favorite;
                // console.log(favoriteDataList)
              }

              function selectedFavorite(e) {
                e.stopPropagation();
                sendToSymbol(stock.symbol);
                if (
                  favoriteData.filter((stock) => stock.symbol === symbol)
                    .length !== 0
                ) {
                  favoriteDataList = !favoriteDataList;
                }
              }

              return (
                <li onClick={transSymbol} className="clear-fix">
                  <div className="sidebar-title">
                    <button className="bookmark" onClick={selectedFavorite}>
                      {favoriteDataList ? (
                        <img
                          src="./images/bookmark_true.png"
                          alt="bookmark_true"
                          className="bookmark_true"
                        />
                      ) : (
                          <img
                            src="./images/bookmark_false.png"
                            alt="bookmark_false"
                            className="bookmark_false"
                          />
                        )}
                    </button>
                    <div className="sidebar-title-text">
                      <span className="sidebar-symbol">{stock.symbol}</span>
                      <br />
                      <span className="sidebar-name">{stock.name}</span>
                    </div>
                  </div>
                  <div className="inner-sidebar-chart">
                    <V.VictoryLine
                      data={stocks}
                      x="date"
                      y="price"
                      style={{
                        data: { stroke: color },
                        parent: {
                          width: 50,
                          height: 'auto',
                          margin: `${0} auto`,
                        },
                      }}
                    />
                  </div>
                  <span className="sidebar-price">{stock.price}</span>
                  <span className="sidebar-change">{stock.change}</span>
                </li>
              );
            },

            // <li><Plot
            //   data={[
            //     {
            //       x: Object.keys(stock.stockData),
            //       y: Object.values(stock.stockData).map(item => item["1. open"]),
            //       type: 'scatter',
            //       mode: 'lines',
            //     },
            //   ]}
            //   layout={{ width: 400, height: 250, showlegend: false, modebar: false, displaymodebar: false }}

            // />
            //   {stock.change}
            //   {stock.symbol}
            // </li>)
          )}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="sidebar stock">
        <ul className={menu === 'stock' ? '' : 'none'}>
          <LoadingOutlined className="loading_icon" />
        </ul>
      </div>
    );
  }
}

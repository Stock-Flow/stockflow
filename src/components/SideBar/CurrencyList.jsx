import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as V from 'victory';
import { getSelectedSymbolActionCreator } from '../../redux/modules/selectedSymbol';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';
import { getfavoriteListButtonActionCreator } from '../../redux/modules/selectedSymbol'
// import { useCallback } from 'react';

export default function CurrencyList({
  currencyList,
  renderCurrencyList,
  menu,
  currencyLoading
}) {
  useEffect(() => {
    renderCurrencyList();
  }, [renderCurrencyList]);

  // const [favorite, setFavorite] = useState(false)
  // let favorite = false;

  const dispatch = useDispatch();

  const sendSymbol = (selectedStock) => {
    dispatch(getSelectedStockSagaActionCreator(selectedStock, 'currency'));
    dispatch(getSelectedSymbolActionCreator(selectedStock, 'currency'));
    // dispatch(getfavoriteListButtonActionCreator(selectedStock, 'currency'))
  };

  // const sendToSymbol = (selectedStock) => {
  //   dispatch(getfavoriteListButtonActionCreator(selectedStock, 'currency'))
  // }

  // const favoriteData = useSelector(state => state.selectedSymbol.selectedCurrencySymbol)
  // console.log(favoriteData)


  // const selectedFavorite = (e, symbol) => {
  //   console.log(e.target.value)
  //   if (e.target.value === symbol) {
  //     setFavorite(!favorite)
  //   }
  // }

  // const selectedFavorite = useCallback((e, symbol) => {
  //   if (e.target.value === symbol) {
  //     dispatch(action(favorite))
  //   }
  // })

  if (!currencyLoading) {
    return (
      <div className="sidebar currency">
        <ul className={menu === 'currency' ? '' : 'none'}>
          {currencyList.map((currency) => {
            let currencys = [];
            const keys = Object.keys(
              currency['Time Series (Digital Currency Daily)'],
            ).reverse();
            const values = Object.values(
              currency['Time Series (Digital Currency Daily)'],
            )
              .map((item) => item['1a. open (USD)'])
              .reverse();
            keys.forEach((item, i) => {
              currencys.push({ date: item, price: Number(values[i]) });
            });
            // let color = currency.change[0] === "-" ? "green" : "red"

            function transSymbol(e) {
              e.stopPropagation();
              sendSymbol(currency['Meta Data']['2. Digital Currency Code']);
            }

            // function selectedFavorite(e) {
            //   e.stopPropagation();
            //   sendSymbol(currency['Meta Data']['2. Digital Currency Code']);
            // }
            // const symbol = currency['Meta Data']['2. Digital Currency Code']

            return (
              <li onClick={transSymbol} className="clear-fix">
                {/* {currency.change} */}
                <div className="sidebar-left">
                  <span className="sidebar-symbol">
                    {currency['Meta Data']['2. Digital Currency Code']}
                  </span>
                  <br />
                  <span className="sidebar-name">
                    {currency['Meta Data']['3. Digital Currency Name']}
                  </span>
                </div>
                <div className="sidebar-right">
                  <V.VictoryLine
                    data={currencys}
                    x="date"
                    y="price"
                    style={{
                      data: { stroke: 'yellow' },
                      parent: {
                        width: 50,
                        height: 'auto',
                      },
                    }}
                  />
                  <button className='bookmark' >
                    {/* {favoriteData.filter(currency => currency.symbol === symbol)[0].favorite ? <img src="./images/bookmark_true.png" alt="bookmark_true" className='bookmark_true' /> : <img src="./images/bookmark_false.png" alt="bookmark_false" className='bookmark_false' />} */}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <div></div>
  }
}

// <ul className={menu ? "none" : ""}>
//   {
//     currencyList.length && (currencyList.map((currency, i) => (

//       i < 10 && (<li><Plot
//         data={[
//           {
//             x: Object.keys(currency["Time Series (Digital Currency Daily)"]),
//             y: Object.values(currency["Time Series (Digital Currency Daily)"]).map(item => item["1a. open (USD)"]),
//             type: 'scatter',
//             mode: 'lines',
//           },
//         ]}
//         layout={{ width: 400, height: 250, title: currency["Meta Data"]["3. Digital Currency Name"] }}
//       />
//       </li>))
//     ))
//   }
// </ul>

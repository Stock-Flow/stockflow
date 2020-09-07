import React, { useEffect } from 'react'
import Plot from 'react-plotly.js';
import * as V from 'victory';
import { getSelectedCurrencySagaActionCreator } from '../../redux/modules/selectedCurrency';
import { useDispatch } from 'react-redux';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';


export default function CurrencyList({ currencyList, renderCurrencyList, menu }) {
  const dispatch = useDispatch()
  useEffect(() => {
    renderCurrencyList()
  }, [renderCurrencyList])

  const sendSymbol = (e) => {
    e.stopPropagation();
    let selectedCurrency = e.target.querySelector('span').textContent
    console.log(selectedCurrency)
    dispatch(getSelectedCurrencySagaActionCreator(selectedCurrency, 'stock'))
    selectedCurrency = '';
  }


  return (
    <ul className={menu ? "none" : ""}>

          {currencyList.map(currency => {
            let currencys = []
            const keys = Object.keys(currency["Time Series (Digital Currency Daily)"]).reverse()
            const values = Object.values(currency["Time Series (Digital Currency Daily)"]).map(item => item["1a. open (USD)"]).reverse()
            keys.forEach((item, i) => { currencys.push({ date: item, price: values[i] }) })
            // let color = currency.change[0] === "-" ? "green" : "red"

            return <li onClick ={sendSymbol}>
              <span>{currency["Meta Data"]["2. Digital Currency Code"]}</span>
              {currency["Meta Data"]["3. Digital Currency Name"]}
              {/* {currency.change} */}
            
              <V.VictoryLine
                data={currencys}
                x="date"
                y="price"
                style={{
                  data: { stroke: 'yellow' },
                  parent: {
                    width: 50,
                    height: "auto"
                  }

                }}
              />
            </li>
          }
          )
        }
      </ul>  
  )
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
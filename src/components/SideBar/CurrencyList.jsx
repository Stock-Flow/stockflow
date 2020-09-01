import React, { useEffect } from 'react'
import Plot from 'react-plotly.js';


export default function CurrencyList({ currencyList, renderCurrencyList, searchList}) {
  useEffect(() => {
    renderCurrencyList()
  }, [renderCurrencyList])

  return (
    <ul>
      {
        currencyList.length && (currencyList.map((currency,i) => (

          i < 10 && (<li><Plot
            data={[
              {
                x: Object.keys(currency["Time Series (Digital Currency Daily)"]),
                y: Object.values(currency["Time Series (Digital Currency Daily)"]).map(item => item["1a. open (USD)"]),
                type: 'scatter',
                mode: 'lines',
              },
            ]}
            layout={{ width: 400, height: 250, title: currency["Meta Data"]["3. Digital Currency Name"] }}
          />
          </li>))
        ))
      }
    </ul>
  )
}
import React from 'react';
import CurrencyList from '../../components/SideBar/CurrencyList'
import { useSelector } from 'react-redux'


export default function CurrencyListContainer({sort}) {
  let currencyList = useSelector(state => state.sidebarCurrency.sideBarCurrency)

  if (currencyList.length !== 0) {
    currencyList = currencyList.map((currency, i) => ({ ...currency, price: currency["Time Series (Digital Currency Daily)"]["1a. open (USD)"] }));
  
    console.log(currencyList)
    if (sort === 'name') {
      currencyList = [...currencyList].sort((a, b) => a["Meta Data"]["3. Digital Currency Name"]  > b["Meta Data"]["3. Digital Currency Name"] ? 1 : a["Meta Data"]["3. Digital Currency Name"]  < b["Meta Data"]["3. Digital Currency Name"]  ? -1 : 0);

    } else if (sort === 'cheap') {
      currencyList = [...currencyList].sort((a, b) => {
        return a.price - b.price;
      })
    } else if (sort === 'expensive') {
      currencyList = [...currencyList].sort((a, b) => b.price - a.price)
    }
  }

  console.log(currencyList)
  console.log(currencyList[0])
  return (
    <>
      <CurrencyList currencyList={currencyList} />
    </>
  )
}
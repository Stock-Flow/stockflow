import React, { useCallback } from 'react';
import CurrencyList from '../../components/SideBar/CurrencyList'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { getSideBarCurrencySagaActionCreator } from '../../redux/modules/sidebarCurrency';
import { getIndicatorSagaActionCreator } from '../../redux/modules/indicator';

export default function CurrencyListContainer({ search, sort, menu }) {
  const dispatch = useDispatch();
  let currencyList = useSelector(state => state.sidebarCurrency.sideBarCurrency)


  if (currencyList.length !== 0) {
    currencyList = currencyList.map((currency, i) => ({ ...currency, price: Object.values(currency["Time Series (Digital Currency Daily)"])[0]["1a. open (USD)"] }));

    if (search) {
      const regexp = new RegExp(search, 'i')
      currencyList = currencyList.filter(currency => regexp.test(currency["Meta Data"]["3. Digital Currency Name"]));
    }
    if (sort === 'name') {
      currencyList = [...currencyList].sort((a, b) => a["Meta Data"]["3. Digital Currency Name"] > b["Meta Data"]["3. Digital Currency Name"] ? 1 : a["Meta Data"]["3. Digital Currency Name"] < b["Meta Data"]["3. Digital Currency Name"] ? -1 : 0);

    } else if (sort === 'cheap') {
      currencyList = [...currencyList].sort((a, b) => {
        return a.price - b.price;
      })
    } else if (sort === 'expensive') {
      currencyList = [...currencyList].sort((a, b) => b.price - a.price)
    }
  }



  const renderCurrencyList = useCallback(() => {
    dispatch(getSideBarCurrencySagaActionCreator())
    dispatch(getIndicatorSagaActionCreator())
  }, [dispatch]);

  return (
    <>
      <CurrencyList currencyList={currencyList} renderCurrencyList={renderCurrencyList} menu={menu} />
    </>
  )
}
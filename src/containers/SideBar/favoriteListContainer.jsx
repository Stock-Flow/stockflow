import React, { useEffect } from 'react';
import FavoriteList from '../../components/SideBar/favoriteList';
import { useSelector, useDispatch } from 'react-redux';
import { getfavoriteListActionCreator } from '../../redux/modules/selectedSymbol';

export default function FavoriteListContainer({ menu, toggleMenu, value }) {
  const selectedStockSymbol = useSelector(
    (state) => state.selectedSymbol.selectedStockSymbol,
  );
  const selectedCurrencySymbol = useSelector(
    (state) => state.selectedSymbol.selectedCurrencySymbol,
  );

  const currencyList = useSelector(
    (state) => state.sidebarCurrency.sideBarCurrency,
  );
  // console.log(currencyList)
  const currencyLoading = useSelector((state) => state.sidebarCurrency.loading);
  const loading = useSelector((state) => state.sideBarStock.loading);
  const stockList = useSelector((state) => state.sideBarStock.sideBarStock);


  const dispatch = useDispatch();

  if (selectedStockSymbol.length !== 0) {
    localStorage.setItem('stockCount', JSON.stringify(selectedStockSymbol));
  }

  const getStockListElement = localStorage.getItem('stockCount');
  let getLocalStockList = JSON.parse(getStockListElement);
  if (getLocalStockList === null) {
    getLocalStockList = [];
  }

  if (selectedCurrencySymbol.length !== 0) {
    localStorage.setItem(
      'currencyCount',
      JSON.stringify(selectedCurrencySymbol),
    );
  }

  const getCurrencyListElement = localStorage.getItem('currencyCount');
  let getLocalCurrencyList = JSON.parse(getCurrencyListElement);
  if (getLocalCurrencyList === null) {
    getLocalCurrencyList = [];
  }

  useEffect(() => {
    dispatch(
      getfavoriteListActionCreator(getLocalStockList, getLocalCurrencyList),
    );
  }, []);

  const favoriteStockList = selectedStockSymbol.filter(
    (selectedStockSymbol) => {
      return selectedStockSymbol.favorite === true;
    },
  );

  const favoriteCurrencyList = selectedCurrencySymbol.filter(
    (selectedCurrencySymbol) => {
      return selectedCurrencySymbol.favorite === true;
    },
  );

  // if (currencyList.length !== 0) {
  //   currencyList = currencyList.map((currency, i) => ({
  //     ...currency,
  //     price: Object.values(currency['Time Series (Digital Currency Daily)'])[0][
  //       '1a. open (USD)'
  //     ],
  //   }));
  // }
  // console.log(currencyList);

  console.log(value)

  return (
    <FavoriteList
      favoriteStockList={favoriteStockList}
      favoriteCurrencyList={favoriteCurrencyList}
      currencyList={currencyList}
      stockList={stockList}
      menu={menu}
      loading={loading}
      currencyLoading={currencyLoading}
      toggleMenu={toggleMenu}
      value={value}
    />
  );
}
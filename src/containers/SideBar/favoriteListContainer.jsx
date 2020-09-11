import React, { useEffect } from 'react';
import FavoriteList from '../../components/SideBar/favoriteList';
import { useSelector, useDispatch } from 'react-redux';
import { getfavoriteListActionCreator } from '../../redux/modules/favoriteList';

export default function FavoriteListContainer() {
  let favoriteStockList = useSelector(
    (state) => state.selectedSymbol.selectedStockSymbol,
  );
  let favoriteCurrencyList = useSelector(
    (state) => state.selectedSymbol.selectedCurrencySymbol,
  );
  // console.log(favoriteStockList);
  console.log(favoriteCurrencyList);

  const dispatch = useDispatch();

  if (favoriteStockList.length !== 0) {
    localStorage.setItem('stockCount', JSON.stringify(favoriteStockList));
  }
  const getStockListElement = localStorage.getItem('stockCount');

  // const getStockList = () => {
  //   const getStockListElement = localStorage.getItem('stockCount');
  //   const getLocalStockList = JSON.parse(getStockListElement);
  //   // console.log(getLocalStockList);
  //   dispatch(getfavoriteListActionCreator(getLocalStockList, 'stock'))
  // };

  if (favoriteCurrencyList.length !== 0) {
    localStorage.setItem('currencyCount', JSON.stringify(favoriteCurrencyList));
  }
  const getCurrencyListElement = localStorage.getItem('currencyCount');

  useEffect(() => {
    dispatch(
      getfavoriteListActionCreator(getStockListElement, getCurrencyListElement),
    );
  }, []);

  // const getCurrencyList = () => {
  //   const getCurrencyListElement = localStorage.getItem('currencyCount');
  //   const getLocalCurrencyList = JSON.parse(getCurrencyListElement);
  //   // console.log(getLocalCurrencyList);
  //   dispatch(getfavoriteListActionCreator(getLocalCurrencyList, 'currency'))

  // };

  return (
    <FavoriteList
    // getStockList={getStockList}
    // getCurrencyList={getCurrencyList}
    />
  );
}

import React from 'react';
import FavoriteList from '../../components/SideBar/favoriteList';
import { useSelector } from 'react-redux';

export default function FavoriteListContainer() {
  const favoriteStockList = useSelector(
    (state) => state.selectedSymbol.selectedStockSymbol,
  );
  const favoriteCurrencyList = useSelector(
    (state) => state.selectedSymbol.selectedCurrencySymbol,
  );

  if (favoriteStockList.length !== 0) {
    const favoriteStockListArr = Object.values(favoriteStockList);
    // console.log(favoriteStockListArr);
    const stockCount = favoriteStockListArr.filter(
      (favoriteStockList) => favoriteStockList.count >= 3,
    );

    localStorage.setItem('stockCount', JSON.stringify(stockCount));
  }

  return <FavoriteList />;
}

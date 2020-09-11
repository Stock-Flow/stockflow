import React from 'react';

export default function FavoriteList({ getStockList, getCurrencyList }) {
  const selectedFavorite = () => {
    getStockList();
    getCurrencyList();
  };
  return (
    <button className="favorite-btn" onClick={selectedFavorite}>
      favorite
    </button>
  );
}

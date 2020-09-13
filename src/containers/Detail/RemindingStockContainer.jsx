import React from 'react';
import RemindingStock from '../../components/Detail/RemindingStock';
import { useSelector } from 'react-redux';
import RemindingStockBtn from '../../components/Detail/RemindingStockBtn';
import { useState } from 'react';

export default function () {
  const stockList = useSelector((state) => state.sideBarStock.sideBarStock);
  const loading = useSelector((state) => state.sideBarStock.loading);
  const remindinStockList = stockList.filter((stock) => {
    const volume = stock.stockData.map((item) => item.volume).reverse();
    if (
      !(volume[2] < volume[1] && volume[1] < volume[0]) ||
      // !(volume[1] < volume[0]) ||
      stock.symbol === 'DOW'
    ) {
      return false;
    }
    return stock;
  });

  return (
    <div className="reminding-stock-wrap">
      <RemindingStockBtn />
      <RemindingStock remindinStockList={remindinStockList} loading={loading} />
    </div>
  );
}

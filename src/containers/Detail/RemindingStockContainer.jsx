import React from 'react';
import RemindingStock from '../../components/Detail/RemindingStock';
import { useSelector } from 'react-redux';
import RemindingStockBtn from '../../components/Detail/RemindingStockBtn';
import { useState } from 'react';

export default function () {
  const stockList = useSelector((state) => state.sideBarStock.sideBarStock);

  return (
    <div className="reminding-stock-wrap">
      <RemindingStockBtn />
      <RemindingStock stockList={stockList} />
    </div>
  );
}

import React from 'react';
import StockList from '../../components/SideBar/StockList';
import { useSelector } from 'react-redux';

export default function StockListContainer() {
  let stockList = [];
  let loading = false;
  let initialList = useSelector(state => state.djia.djia);
  let initialLoading = useSelector(state => state.djia.loading);
  if (stockList.length === 0) {
    stockList = initialList;
    loading = initialLoading;
  }


  return (<StockList stockList={stockList} loading={loading} />)
}
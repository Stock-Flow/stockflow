import React, { useCallback, useState } from 'react';
import StockList from '../../components/SideBar/StockList';
import { useSelector, useDispatch } from 'react-redux';
import { getSideBarStockSagaActionCreator } from '../../redux/modules/sidebarstock';


export default function StockListContainer({ search, sort }) {
  const loading = useSelector(state => state.sideBarStock.loading)
  let stockList = useSelector(state => state.sideBarStock.sideBarStock)

  console.log(stockList);

  if (sort === 'name') {
    stockList = stockList.sort((a, b) => a.symbol > b.symbol ? 1 : a.symbol < b.symbol ? -1 : 0);
    // console.log(useSelector(state => state.sideBarStock.sideBarStock));
  } else if (sort === 'cheap') {
    stockList = stockList.sort((a, b) => {
      return a.stockData[Object.keys(a.stockData)[0]]["1. open"] - b.stockData[Object.keys(b.stockData)[0]]["1. open"]
    })
  } else if (sort === 'expensive') {
    stockList = stockList.sort((a, b) => b.stockData[Object.keys(b.stockData)[0]]["1. open"] - a.stockData[Object.keys(a.stockData)[0]]["1. open"])
  }



  const dispatch = useDispatch();
  const getsidebarStock = useCallback(() => {
    dispatch(getSideBarStockSagaActionCreator(search));
  }, [dispatch, search])


  return (<StockList getsidebarStock={getsidebarStock} loading={loading} search={search} stockList={stockList} sort={sort} />)


}
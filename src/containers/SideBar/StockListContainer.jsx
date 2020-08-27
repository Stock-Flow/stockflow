import React, { useCallback, useState } from 'react';
import StockList from '../../components/SideBar/StockList';
import { useSelector, useDispatch } from 'react-redux';
import SearchService from '../../services/SearchService';
import DataProcessingService from '../../services/DataProcessingService';
import { getSideBarStockSagaActionCreator } from '../../redux/modules/sidebarstock';


export default function StockListContainer({ search }) {
  const loading = useSelector(state => state.sidebarstock.loading)
  const stockList = useSelector(state => state.sidebarstock.sideBarStock)
  const dispatch = useDispatch();
  const getsidebarStock = useCallback(() => {
    dispatch(getSideBarStockSagaActionCreator(search));
  }, [dispatch, search])


  return (<StockList getsidebarStock={getsidebarStock} loading={loading} search={search} stockList={stockList} />)


}
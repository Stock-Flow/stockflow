import React, { useCallback } from 'react';
import StockList from '../../components/SideBar/StockList';
import { useSelector, useDispatch } from 'react-redux';
import { getSideBarStockSagaActionCreator } from '../../redux/modules/sidebarstock';

export default function StockListContainer({ search, sort, menu, toggleMenu }) {
  const loading = useSelector((state) => state.sideBarStock.loading);
  let stockList = useSelector((state) => state.sideBarStock.sideBarStock);

  if (!loading) {
    if (sort === 'name') {
      stockList = [...stockList].sort((a, b) =>
        a.symbol > b.symbol ? 1 : a.symbol < b.symbol ? -1 : 0,
      );
    } else if (sort === 'cheap') {
      stockList = [...stockList].sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sort === 'expensive') {
      stockList = [...stockList].sort((a, b) => b.price - a.price);
    }
  }

  const dispatch = useDispatch();
  const getsidebarStock = useCallback(() => {
    dispatch(getSideBarStockSagaActionCreator(search));
  }, [dispatch, search]);

  return (
    <StockList
      getsidebarStock={getsidebarStock}
      loading={loading}
      search={search}
      stockList={stockList}
      menu={menu}
      toggleMenu={toggleMenu}
    />
  );
}
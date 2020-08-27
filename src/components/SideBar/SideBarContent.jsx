import React from 'react';
import Search from './Search';
import StockListContainer from '../../containers/SideBar/StockListContainer';

export default function SideBarContent({ search }) {

  return (
    <StockListContainer search={search} />
  )
}
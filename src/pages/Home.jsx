import React from 'react';
import Logo from '../components/SideBar/Logo';
import Stock from '../components/SideBar/Stock';
import DigitalCurrency from '../components/SideBar/DigitalCurrency';
import ListSort from '../components/SideBar/ListSort';
import DigitalcurrencyList from '../components/SideBar/DigitalcurrencyList';
import Search from '../components/SideBar/Search';
import StockListContainer from '../containers/SideBar/StockListContainer';
import SideBarContentContainer from '../containers/SideBar/SideBarContentContainer';

export default function Home() {
  return (
    <>
      <h1>home</h1>
      <Logo />
      <Stock />
      <DigitalCurrency />
      <ListSort />
      <SideBarContentContainer />
      {/* <List /> */}
    </>
  )
}
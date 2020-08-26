import React from 'react';
import Logo from '../components/SideBar/Logo';
import Stock from '../components/SideBar/Stock';
import DigitalCurrency from '../components/SideBar/DigitalCurrency';
import ListSort from '../components/SideBar/ListSort';
import List from '../components/SideBar/List';
import Search from '../components/SideBar/Search';
import DigitalCurrencyContainer from '../containers/SideBar/DigitalCurrencyContainer';

export default function Home() {

  return (
    <>
      <h1>home</h1>
      <Logo/>
      <Stock/>
      <DigitalCurrencyContainer/>
      <ListSort/>
      <Search/>
      <List/>
    </>
  )
}
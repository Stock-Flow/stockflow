import React from 'react';
import Logo from '../components/SideBar/Logo';
import Stock from '../components/SideBar/Stock';
import ListSort from '../components/SideBar/ListSort';
import CurrencyList from '../components/SideBar/CurrencyList';
import SideBarContent from '../components/SideBar/SideBarContent';
import CurrencyContainer from '../containers/SideBar/CurrencyContainer';

export default function Home() {
  return (
    <>
      <h1>home</h1>
      <Logo />
      <Stock />
      <CurrencyContainer />
      <ListSort />
      <SideBarContent />
      <CurrencyList />
    </>
  )
}
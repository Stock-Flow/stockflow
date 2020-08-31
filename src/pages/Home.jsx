import React from 'react';
import Logo from '../components/SideBar/Logo';
import Stock from '../components/SideBar/Stock';
import ListSort from '../components/SideBar/ListSort';
import SideBarContent from '../components/SideBar/SideBarContent';
import CurrencyContainer from '../containers/SideBar/CurrencyContainer';
import CurrencyListContainer from '../containers/SideBar/CurrencyListContainer';

export default function Home() {
  return (
    <>
      <h1>home</h1>
      <Logo />
      <Stock />
      <ListSort />
      <SideBarContent />
    </>
  )
}
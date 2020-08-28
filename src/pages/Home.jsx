import React from 'react';
import Logo from '../components/SideBar/Logo';
import Stock from '../components/SideBar/Stock';
import DigitalCurrency from '../components/SideBar/DigitalCurrency';
import ListSort from '../components/SideBar/ListSort';
import List from '../components/SideBar/List';
import SideBarContent from '../components/SideBar/SideBarContent';

export default function Home() {

  return (
    <>
      <h1>home</h1>
      <Logo />
      <Stock />
      <DigitalCurrency />
      <ListSort />
      <SideBarContent />
      <List />
    </>
  )
}
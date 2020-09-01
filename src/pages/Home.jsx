
import React from "react";
import Logo from "../components/SideBar/Logo";
import Stock from "../components/SideBar/Stock";
// import DigitalCurrency from "../components/SideBar/DigitalCurrency";
import DjiagraphContainer from "../containers/djiagraphContainer";

// import SideBarContent from "../components/SideBar/SideBarContent";
import SideBarContent from '../components/SideBar/SideBarContent';
import CurrencyContainer from '../containers/SideBar/CurrencyContainer';
import CurrencyListContainer from '../containers/SideBar/CurrencyListContainer';


export default function Home() {
  return (
    <>
      <h1>home</h1>
      {/* <SideBarContainer /> */}
      <DjiagraphContainer />
      <Logo />
      <Stock />
      {/* <DigitalCurrency /> */}

      <SideBarContent />


    </>
  );
}

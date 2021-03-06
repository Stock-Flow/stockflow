import React, { useState } from 'react';

import DjiagraphContainer from '../containers/MainDjia/djiagraphContainer';
import SideBarContent from '../contents/SideBarContent';
import { useSelector } from 'react-redux';
import DetailStockGraphContainer from '../containers/Detail/DetailStockGraphContainer';
import DetailCurrencyGraphContainer from '../containers/Detail/DetailCurrencyGraphContainer';
import './Home.scss';
import Header from '../contents/Header';
import SwitchMode from '../contents/SwitchMode';
import { useEffect } from 'react';

export default function Home() {
  const selectedStock = useSelector((state) => state.selectedStock);
  // const selectedExchange = useSelector(
  //   (state) => state.selectedExchange.fxIntraday.fxIntraday,
  // );
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
    setScroll(!scroll);
    setScrolling(!scrolling);
    // const $body = document.querySelector('body');
    document.body.classList.toggle('scrolling-control');
  };

  // lightMode
  const [lightMode, setLightMode] = useState(
    JSON.parse(localStorage.getItem('lightMode')),
  );
  return (
    <div className={`home ${lightMode ? 'light' : ''}`}>
      <Header toggleMobileMenu={toggleMobileMenu} />

      <SideBarContent
        mobileMenu={mobileMenu}
        toggleMobileMenu={toggleMobileMenu}
        scroll={scroll}
      />
      {selectedStock.kind === 'stock' ? (
        <DetailStockGraphContainer
          symbol={selectedStock.symbol}
          lightMode={lightMode}
        />
      ) : selectedStock.kind === 'currency' ? (
        <DetailCurrencyGraphContainer
          symbol={selectedStock.symbol}
          lightMode={lightMode}
        />
      ) : (
            <>
              <DjiagraphContainer lightMode={lightMode} />
            </>
          )}
      <SwitchMode setLightMode={setLightMode} />
    </div>
  );
}

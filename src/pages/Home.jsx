import React from 'react';

import DjiagraphContainer from '../containers/MainDjia/djiagraphContainer';
import SideBarContent from '../contents/SideBarContent';
import { useSelector } from 'react-redux';
import DetailStockGraphContainer from '../containers/Detail/DetailStockGraphContainer';
import DetailCurrencyGraphContainer from '../containers/Detail/DetailCurrencyGraphContainer';
import './Home.scss';
import ForeignExchangeDetailContainer from '../containers/MainDjia/ForeignExchangeDetailContainer';
import Header from '../contents/Header';

export default function Home() {
  const selectedStock = useSelector((state) => state.selectedStock);
  const selectedExchange = useSelector(
    (state) => state.selectedExchange.fxIntraday.fxIntraday,
  );
  return (
    <div className="home">
      <Header />
      <SideBarContent />
      {selectedStock.kind === 'stock' ? (
        <DetailStockGraphContainer symbol={selectedStock.symbol} />
      ) : selectedStock.kind === 'currency' ? (
        <DetailCurrencyGraphContainer symbol={selectedStock.symbol} />
      ) : (
            <>
              <DjiagraphContainer />
            </>
          )}
    </div>
  );
}

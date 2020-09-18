import React from 'react';

import DjiagraphContainer from '../containers/MainDjia/djiagraphContainer';
import SideBarContent from '../contents/SideBarContent';
import { useSelector } from 'react-redux';
import DetailStockGraphContainer from '../containers/Detail/DetailStockGraphContainer';
import DetailCurrencyGraphContainer from '../containers/Detail/DetailCurrencyGraphContainer';
import ForeignExchangeContainer from '../containers/MainDjia/ForeignExchangeContainer';
import './Home.scss';
import RemindingStockContainer from '../containers/Detail/RemindingStockContainer';
import ForeignExchangeDetailContainer from '../containers/MainDjia/ForeignExchangeDetailContainer';

export default function Home() {
  const selectedStock = useSelector((state) => state.selectedStock);
  const selectedExchange = useSelector(
    (state) => state.selectedExchange.fxIntraday.fxIntraday,
  );
  console.log(selectedExchange);
  return (
    <div className="home">
      <SideBarContent />
      {selectedStock.kind === 'stock' ? (
        <DetailStockGraphContainer symbol={selectedStock.symbol} />
      ) : selectedStock.kind === 'currency' ? (
        <DetailCurrencyGraphContainer symbol={selectedStock.symbol} />
      ) : selectedExchange ? (
        <ForeignExchangeDetailContainer />
      ) : (
        <>
          <DjiagraphContainer />
          <ForeignExchangeContainer />
        </>
      )}

      <RemindingStockContainer />
    </div>
  );
}

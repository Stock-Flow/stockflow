import React from 'react';

import DjiagraphContainer from '../containers/MainDjia/djiagraphContainer';
import SideBarContent from '../contents/SideBarContent';
import { useSelector } from 'react-redux';
import DetailStockGraphContainer from '../containers/Detail/DetailStockGraphContainer';
import DetailCurrencyGraphContainer from '../containers/Detail/DetailCurrencyGraphContainer';
import ForeignExchangeContainer from '../containers/MainDjia/ForeignExchangeContainer';
import './Home.scss';
import RemindingStockContainer from '../containers/Detail/RemindingStockContainer';

export default function Home() {
  const selectedStock = useSelector((state) => state.selectedStock);
  return (
    <div className="home">
      <SideBarContent />
      {selectedStock.kind === 'stock' ? (
        <DetailStockGraphContainer symbol={selectedStock.symbol} />
      ) : selectedStock.kind === 'currency' ? (
        <DetailCurrencyGraphContainer symbol={selectedStock.symbol} />
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

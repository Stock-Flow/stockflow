import React from 'react';

import DjiagraphContainer from '../containers/MainDjia/djiagraphContainer';
import SideBarContent from '../contents/SideBarContent';
import { useSelector } from 'react-redux';
import DetailStockGraphContainer from '../containers/Detail/DetailStockGraphContainer';
import ForeignExchangeContainer from '../containers/MainDjia/ForeignExchangeContainer';
import './Home.scss';

export default function Home() {
  const selectedStock = useSelector(
    (state) => state.selectedStock.selectedStock,
  );
  return (
    <div className="home">
      <SideBarContent />
      <main>
        {selectedStock.length !== 0 ? (
          <DetailStockGraphContainer symbol={selectedStock} />
        ) : (
          <DjiagraphContainer />
        )}
        <ForeignExchangeContainer />
      </main>
    </div>
  );
}

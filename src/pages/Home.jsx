<<<<<<< HEAD
import React from 'react';

import DjiagraphContainer from '../containers/MainDjia/djiagraphContainer';
import SideBarContent from '../contents/SideBarContent';
import './Home.scss';
import { useSelector } from 'react-redux';
import DetailStockGraphContainer from '../containers/Detail/DetailStockGraphContainer';
import ForeignExchangeContainer from '../containers/MainDjia/ForeignExchangeContainer';

export default function Home() {
  const selectedStock = useSelector(
    (state) => state.selectedStock.selectedStock,
=======
import React from "react";

import DjiagraphContainer from "../containers/MainDjia/djiagraphContainer";
import SideBarContent from "../contents/SideBarContent";
import "./Home.scss";
import { useSelector } from "react-redux";
import DetailStockGraphContainer from "../containers/Detail/DetailStockGraphContainer";

export default function Home() {
  const selectedStock = useSelector(
    (state) => state.selectedStock.selectedStock
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b
  );
  return (
    <div className="home">
      <SideBarContent />
      {selectedStock.length !== 0 ? (
        <DetailStockGraphContainer symbol={selectedStock} />
      ) : (
        <DjiagraphContainer />
      )}
<<<<<<< HEAD
      <ForeignExchangeContainer />
=======
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b
    </div>
  );
}

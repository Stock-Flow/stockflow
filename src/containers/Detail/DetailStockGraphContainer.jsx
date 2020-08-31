import React from "react";
import { useSelector } from "react-redux";
import DetailStockGraph from "../../components/Detail/DetailStockGraph";

import axios from "axios";
import { apiKey } from "../../key";

export default function DetailStockGraphContainer({
  symbol = "IBM",
  stockData,
}) {
  // let stockList = [];
  // let loading = false;
  let sideBarStock = useSelector((state) => state.sideBarStock.sideBarStock);
  let showStock = sideBarStock.filter(
    (showStock) => showStock.symbol === symbol
  );
  showStock = showStock[0];
  console.log(showStock);

  // let initialList = useSelector((state) => state.djia.djia);
  // let initialLoading = useSelector((state) => state.sideBarStock.loading);
  // if (showStock.length === 0) {
  //   loading = initialLoading;
  // }
  return <DetailStockGraph showStock={showStock} />;
}

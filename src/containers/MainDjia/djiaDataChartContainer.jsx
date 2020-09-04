import React from "react";
import DjiaDataChart from "../../components/MainDjia/djiaDataChart";
import { useSelector } from "react-redux";

export default function DjiaDataChartContainer() {
  const djia = useSelector((state) => state.djia.djia);

  const djiaStockData = djia.map((djia) => {
    return djia.stockData;
  });

  // console.log(djiaStockData);

  if (djiaStockData.length !== 0) {
    // console.log(djiaStockData[99]);
  }

  return <DjiaDataChart />;
}

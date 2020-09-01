import React from "react";
import { useSelector } from "react-redux";
import DjiaGraph from "../../components/MainDjia/djiagraph";
import { useEffect } from "react";

export default function DjiagraphContainer() {
  const DOW_DIVISOR = 0.14748071991788;
  const djia = useSelector((state) => state.djia.djia);
  // const sum = useEffect(() => {
  //   sumOpenData()
  // }, [])

  const djiaStockData = djia.map((djia) => {
    return djia.stockData;
  });

  // console.log(djia);
  // console.log(djiaStockData);

  let djiaDateData = [];
  let djiaOpenData = [];
  let djiaDate = [];

  if (djia.length !== 0) {
    djiaDate = Object.keys(djiaStockData[0]);

    for (let i = 0; i < djiaStockData.length; i++) {
      djiaDateData = Object.values(djiaStockData[i]);
      for (let j = 0; j < djiaDateData.length; j++) {
        if (i === 0) djiaOpenData[j] = 0;
        djiaOpenData[j] += +djiaDateData[j]["1. open"];
      }
    }
    for (let i = 0; i < djiaOpenData.length; i++) {
      djiaOpenData[i] += djiaOpenData[i] / DOW_DIVISOR;
      djiaOpenData[i] = +djiaOpenData[i].toFixed(2);
      // djiaOpenData[i] += parseInt(djiaOpenData[i] / DOW_DIVISOR, 10);
    }
    // console.log(djiaDate);
  }

  return (
    <div>
      <DjiaGraph djiaOpenData={djiaOpenData} djiaDate={djiaDate} djia={djia} />
    </div>
  );
}

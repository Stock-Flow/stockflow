import React from "react";
import { useSelector } from "react-redux";
import DjiaGraph from "../components/djiagraph";
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
  console.log(djiaStockData);

  let djiaDateData = [];
  let djiaDateDataArr;
  let djiaOpenData = [];

  if (djia.length !== 0) {
    for (let i = 0; i < djiaStockData.length; i++) {
      djiaDateData = Object.values(djiaStockData[i]); // -->[100]
      for (let j = 0; j < djiaDateData.length; j++) {
        if(i===0) djiaOpenData[j] = 0;
        djiaDateDataArr = +(djiaDateData[j]['1. open']);
        djiaOpenData[j] += djiaDateDataArr;
      }
    }
 
  }
  for(let i =0; i < djiaOpenData.length; i++) {
    djiaOpenData[i] = djiaOpenData[i]/DOW_DIVISOR
  }
  console.log(djiaOpenData);


  return (
    <div>
      <DjiaGraph />
    </div>
  );
}

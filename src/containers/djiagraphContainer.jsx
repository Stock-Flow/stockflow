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
      djiaDateData = Object.values(djiaStockData[i]);
      // console.log(djiaDateData);
      for (let j = 0; j < djiaDateData.length; j++) {
        djiaDateDataArr = Object.values(djiaDateData[j]);
        console.log(djiaDateDataArr);
        djiaOpenData[j] += djiaDateDataArr[0];
      }
      // sumOpenData(djiaOpenData);
    }
    // console.log(djiaOpenData);
  }
  // function sumOpenData(openDataArray) {
  //   for (let b = 0; b < openDataArray.length; b++) {
  //     console.log(openDataArray[b]);
  //   }
  // }

  return (
    <div>
      <DjiaGraph />
    </div>
  );
}

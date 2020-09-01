import React from "react";
import { useSelector } from "react-redux";
import DjiaGraph from "../../components/MainDjia/djiagraph";
import { useEffect } from "react";
import DataProcessingService from "../../services/DataProcessingService";

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
  let djiaList = [];
  let djiaDateData = [];


  let djiaDate = [];

  if (djia.length !== 0) {
    let djiaOpenData = [];
    let djiaHighData = [];
    let djiaLowData = [];
    let djiaCloseData = [];
    djiaDate = Object.keys(djiaStockData[0]);
    for (let i = 0; i < djiaStockData.length; i++) {
      djiaDateData = Object.values(djiaStockData[i]);
      for (let j = 0; j < djiaDateData.length; j++) {
        if (i === 0) {
          djiaOpenData.push(0);
          djiaHighData.push(0);
          djiaLowData.push(0);
          djiaCloseData.push(0);
        }
        djiaOpenData[j] += +djiaDateData[j]['1. open'];
        djiaHighData[j] += +djiaDateData[j]['2. high'];
        djiaLowData[j] += +djiaDateData[j]['3. low'];
        djiaCloseData[j] += +djiaDateData[j]['4. close'];
      }
    }
    djiaOpenData = DataProcessingService.GetDJiaProcessing(djiaOpenData)
    djiaHighData = DataProcessingService.GetDJiaProcessing(djiaHighData)
    djiaLowData = DataProcessingService.GetDJiaProcessing(djiaLowData)
    djiaCloseData = DataProcessingService.GetDJiaProcessing(djiaCloseData)
    djiaList = [djiaOpenData, djiaHighData, djiaLowData, djiaCloseData,]
    // console.log(djiaDate);
  }

  return (
    <div>
      <DjiaGraph djiaList={djiaList} djiaDate={djiaDate} djia={djia} />
    </div>
  );
}

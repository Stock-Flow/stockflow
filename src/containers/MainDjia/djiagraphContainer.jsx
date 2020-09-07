<<<<<<< HEAD
import React from 'react';
import { useSelector } from 'react-redux';
import DjiaGraph from '../../components/MainDjia/djiagraph';
import { useEffect } from 'react';
import '../../components/MainDjia/MainDjia.scss';
import DataProcessingService from '../../services/DataProcessingService';
=======

import React from "react";
import { useSelector } from "react-redux";
import DjiaGraph from "../../components/MainDjia/djiagraph";
import { useEffect } from "react";
import "../../components/MainDjia/MainDjia.scss";
import DataProcessingService from "../../services/DataProcessingService";

>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a

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

<<<<<<< HEAD
  let djiaList = [];
=======
>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a

  let djiaDate = [];

  if (djia.length !== 0) {
    let djiaOpenData = [];
    let djiaHighData = [];
    let djiaLowData = [];
    let djiaCloseData = [];
    djiaDate = djiaStockData[0].map((date) => date.time);
    for (let i = 0; i < djiaStockData.length; i++) {
      for (let j = 0; j < djiaStockData[0].length; j++) {
        if (i === 0) {
          djiaOpenData.push(0);
          djiaHighData.push(0);
          djiaLowData.push(0);
          djiaCloseData.push(0);
        }
        // console.log(djiaStockData[i][j].open)
        djiaOpenData[j] += +djiaStockData[i][j].open;
        djiaHighData[j] += +djiaStockData[i][j].high;
        djiaLowData[j] += +djiaStockData[i][j].low;
        djiaCloseData[j] += +djiaStockData[i][j].close;
      }
    }
    djiaOpenData = DataProcessingService.GetDJiaProcessing(djiaOpenData);
    djiaHighData = DataProcessingService.GetDJiaProcessing(djiaHighData);
    djiaLowData = DataProcessingService.GetDJiaProcessing(djiaLowData);
    djiaCloseData = DataProcessingService.GetDJiaProcessing(djiaCloseData);
    djiaList = [djiaOpenData, djiaHighData, djiaLowData, djiaCloseData];
<<<<<<< HEAD
    console.log(djiaList);
=======

>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a
  }

  return (
    <div>
      <DjiaGraph djiaList={djiaList} djiaDate={djiaDate} djia={djia} />
    </div>
  );
}

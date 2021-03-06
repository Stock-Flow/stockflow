import React from 'react';
import { useSelector } from 'react-redux';
import DjiaGraph from '../../components/MainDjia/djiagraph';

import '../../components/MainDjia/MainDjia.scss';
import DataProcessingService from '../../services/DataProcessingService';

export default function DjiagraphContainer({ lightMode }) {
  const djia = useSelector((state) => state.djia.djia);
  const loading = useSelector((state) => state.djia.loading);
  let done = useSelector((state) => state.djia.done);
  // const sum = useEffect(() => {
  //   sumOpenData()
  // }, [])

  const djiaStockData = djia.map((djia) => {
    return djia.stockData;
  });

  let djiaList = [];
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
  }

  return (
    <div className="djiagraphBox">
      <DjiaGraph
        djiaList={djiaList}
        djiaDate={djiaDate}
        djia={djia}
        loading={loading}
        done={done}
        lightMode={lightMode}
      />
    </div>
  );
}

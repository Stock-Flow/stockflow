
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { createChart } from 'lightweight-charts';


// loading
export default function DetailStockGraph({
  getDetailStock,
  loading,
  symbol,
  movingAverageFive,
  movingAverageTen,
  movingAverageTwenty,
  movingAverageSixty,
  rsiSignal,
  indicators,
  stock,
}) {
  const chart = useRef();
  const assistChart = useRef();
  const chartposition = useRef();
  const candleSeries = useRef();
  useEffect(() => {
    getDetailStock(symbol);
  }, [symbol, getDetailStock])

  useEffect(() => {

    chart.current = createChart(chartposition.current, {
      width: 800,
      height: 400,
    });
    chart.current.applyOptions({
      priceScale: {
        position: 'left',
        autoScale: true,
      },
      timeScale: {
        rightOffset: 0,
        fixLeftEdge: true,
        barSpacing: 10,
      },
    });


  }, [])

  useEffect(() => {
    if (candleSeries.current) {
      chart.current.removeSeries(candleSeries.current);
    }
  }, [symbol])


  useEffect(() => {

    candleSeries.current = chart.current.addCandlestickSeries({
      title: symbol,
    });
    candleSeries.current.setData(stock);
    chart.current.timeScale().setVisibleLogicalRange({
      from: stock.length - 60,
      to: stock.length,
    });
  }, [stock])
  // stock
  // 0: {time: "2020-04-13", open: 121.63, high: 121.8, low: 118.04, close: 121.1
  return (
    <>
      <h1>Detail Stock</h1>
      {!loading && (
        <>
          <h2>{symbol}</h2>
          <button onClick={() => {
            const data = movingAverageFive(stock)
            const lineSeries = chart.current.addLineSeries();
            lineSeries.setData(data);
          }}>5 Moving Average</button>
          <button onClick={() => {
            const data = movingAverageTen(stock)
            const lineSeries = chart.current.addLineSeries({
              color: 'pink'
            });
            lineSeries.setData(data);
          }}>10 Moving Average</button>
          <button onClick={() => {
            const data = movingAverageTwenty(stock)
            const lineSeries = chart.current.addLineSeries({
              color: 'brown'
            });
            lineSeries.setData(data);
          }}>20 Moving Average</button>
          <button onClick={() => {
            const data = movingAverageSixty(stock)
            const lineSeries = chart.current.addLineSeries(
              { color: 'red' }
            );
            lineSeries.setData(data);
          }}>60 Moving Average</button>
          <button onClick={() => {
            const rsiSignalData = rsiSignal(indicators[0]);
            assistChart.current = createChart(chartposition.current, { width: 600, height: 400 })
            assistChart.current.applyOptions({
              priceScale: {
                position: 'left',
              },
              timeScale: {
                fixLeftEdge: true,
              },
            });
            console.log(rsiSignalData);
            const lineSeries = assistChart.current.addLineSeries({ title: "RSI" })
            lineSeries.setData(indicators[0])
            const rsiSeries = assistChart.current.addLineSeries({ title: "RSI Signal (6)", color: "brown" })
            rsiSeries.setData(rsiSignalData)
          }}>
            RSI
          </button>
          <button onClick={() => {
            const lowBBANDS = chart.current.addLineSeries({ title: "BBANDS LOW" })
            lowBBANDS.setData(indicators[1][0])
            const middleBBANDS = chart.current.addLineSeries({ title: "BBANDS MIDDLE" })
            middleBBANDS.setData(indicators[1][1])
            const highBBANDS = chart.current.addLineSeries({ title: "BBANDS HIGH" })
            highBBANDS.setData(indicators[1][2])
          }}>
            BBANDS
          </button>
          {/* <button onClick={() => dailyBtnClick()}>1일</button>
          <button onClick={() => weeklyBtnClick()}>1주</button>
          <button onClick={() => monthlyBtnClick()}>1달</button> */}

        </>
      )}
      <div ref={chartposition}></div>
    </>
  );

  // return <h1>Detail Stock</h1>;
}

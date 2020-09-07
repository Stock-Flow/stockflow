import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import { pink, lavender } from 'color-name';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
  },
  overlay: {
    zIndex: 100,
  },
};

Modal.setAppElement(document.getElementById('option_modal'));

// loading
export default function DetailStockGraph({
  getDetailStock,
  loading,
  symbol,
  movingAverageFive,
  movingAverageHundredTwenty,
  movingAverageTwenty,
  movingAverageSixty,
  rsiSignal,
  indicators,
  stock,
  volume,
}) {
  //chart ref
  const chart = useRef();
  const assistChart = useRef();
  const indicatorChart = useRef();
  //chart position ref
  const chartposition = useRef();
  const indicatorPosition = useRef();
  //graph ref
  const candleSeries = useRef();
  const smaFive = useRef();
  const smaHundredTwenty = useRef();
  const smaTwenty = useRef();
  const smaSixty = useRef();
  const rsiChart = useRef();
  const rsiSignalChart = useRef();
  const volumeChart = useRef();
  const lowBBANDS = useRef();
  const middleBBANDS = useRef();
  const highBBANDS = useRef();

  const [smaFiveCk, fiveCk] = useState(false);
  const [smaHundredTwentyCk, hundredTwentyCk] = useState(false);
  const [smaTwentyCk, twentyCk] = useState(false);
  const [smaSixtyCk, sixtyCk] = useState(false);
  const [BBANDSCk, setBBANDSCk] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getDetailStock(symbol);
  }, [symbol, getDetailStock]);

  useEffect(() => {
    chart.current = createChart(chartposition.current, {
      width: 800,
      height: 400,
    });
    chart.current.applyOptions({
      priceScale: {
        position: 'right',
        autoScale: true,
      },
      timeScale: {
        rightOffset: 0,
        fixLeftEdge: true,
        barSpacing: 10,
      },
    });
    assistChart.current = createChart(chartposition.current, {
      width: 800,
      height: 200,
    });
    assistChart.current.applyOptions({
      priceScale: {
        position: 'right',
      },
      timeScale: {
        fixLeftEdge: true,
      },
    });
    indicatorChart.current = createChart(indicatorPosition.current, {
      width: 0,
      height: 0,
    });
    indicatorChart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
        borderVisible: false,
      },
    });
  }, []);

  useEffect(() => {
    if (candleSeries.current) {
      chart.current.removeSeries(candleSeries.current);
      if (lowBBANDS.current) chart.current.removeSeries(lowBBANDS.current);

      if (middleBBANDS.current)
        chart.current.removeSeries(middleBBANDS.current);
      if (highBBANDS.current) chart.current.removeSeries(highBBANDS.current);
      if (smaFive.current) chart.current.removeSeries(smaFive.current);
      if (smaTwenty.current) chart.current.removeSeries(smaTwenty.current);
      if (smaSixty.current) chart.current.removeSeries(smaSixty.current);
      if (smaHundredTwenty.current)
        chart.current.removeSeries(smaHundredTwenty.current);

      assistChart.current.removeSeries(volumeChart.current);
      chartposition.current.removeChild(assistChart.current);
    }
  }, [symbol]);

  useEffect(() => {
    candleSeries.current = chart.current.addCandlestickSeries({
      title: symbol,
    });
    candleSeries.current.setData(stock);
    chart.current.timeScale().setVisibleLogicalRange({
      from: stock.length - 60,
      to: stock.length,
    });

    volumeChart.current = assistChart.current.addHistogramSeries({
      title: 'volume',
    });
    volumeChart.current.setData(volume);
    assistChart.current.timeScale().setVisibleLogicalRange({
      from: volume.length - 60,
      to: volume.length,
    });
  }, [stock]);
  // stock
  // 0: {time: "2020-04-13", open: 121.63, high: 121.8, low: 118.04, close: 121.1
  return (
    <>
      <button onClick={openModal}>open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form>
          <label>
            5 Moving Average
            <input
              type="checkbox"
              checked={smaFiveCk}
              onChange={() => {
                if (smaFive.current) {
                  fiveCk(false);
                  chart.current.removeSeries(smaFive.current);
                  smaFive.current = null;
                } else {
                  fiveCk(true);
                  const data = movingAverageFive(stock);
                  smaFive.current = chart.current.addLineSeries();
                  smaFive.current.setData(data);
                }
              }}
            />
          </label>

          <label>
            20 Moving Average
            <input
              type="checkbox"
              checked={smaTwentyCk}
              onChange={() => {
                if (smaTwenty.current) {
                  twentyCk(false);
                  chart.current.removeSeries(smaTwenty.current);
                  smaTwenty.current = null;
                } else {
                  twentyCk(true);
                  const data = movingAverageTwenty(stock);
                  smaTwenty.current = chart.current.addLineSeries({
                    color: 'brown',
                  });
                  smaTwenty.current.setData(data);
                }
              }}
            />
          </label>
          <label>
            60 Moving Average
            <input
              type="checkbox"
              checked={smaSixtyCk}
              onChange={() => {
                if (smaSixty.current) {
                  sixtyCk(false);
                  chart.current.removeSeries(smaSixty.current);
                  smaSixty.current = null;
                } else {
                  sixtyCk(true);
                  const data = movingAverageSixty(stock);
                  smaSixty.current = chart.current.addLineSeries({
                    color: 'red',
                  });
                  smaSixty.current.setData(data);
                }
              }}
            />
          </label>
          <label>
            120 Moving Average
            <input
              type="checkbox"
              checked={smaHundredTwentyCk}
              onChange={() => {
                if (smaHundredTwenty.current) {
                  hundredTwentyCk(false);
                  chart.current.removeSeries(smaHundredTwenty.current);
                  smaHundredTwenty.current = null;
                } else {
                  hundredTwentyCk(true);
                  const data = movingAverageHundredTwenty(stock);
                  smaHundredTwenty.current = chart.current.addLineSeries({
                    color: 'pink',
                  });
                  smaHundredTwenty.current.setData(data);
                }
              }}
            />
          </label>
          <label>
            BBANDS
            <input
              type="checkbox"
              checked={BBANDSCk}
              onChange={() => {
                if (lowBBANDS.current) {
                  setBBANDSCk(false);
                  chart.current.removeSeries(lowBBANDS.current);
                  chart.current.removeSeries(middleBBANDS.current);
                  chart.current.removeSeries(highBBANDS.current);
                  lowBBANDS.current = null;
                  middleBBANDS.current = null;
                  highBBANDS.current = null;
                } else {
                  setBBANDSCk(true);
                  lowBBANDS.current = chart.current.addLineSeries({
                    title: 'BBANDS LOW',
                  });
                  lowBBANDS.current.setData(indicators[1][0]);
                  middleBBANDS.current = chart.current.addLineSeries({
                    title: 'BBANDS MIDDLE',
                  });
                  middleBBANDS.current.setData(indicators[1][1]);
                  highBBANDS.current = chart.current.addLineSeries({
                    title: 'BBANDS HIGH',
                  });
                  highBBANDS.current.setData(indicators[1][2]);
                }
              }}
            />
          </label>
          <button onClick={closeModal}>Submit</button>
        </form>
      </Modal>
      <h1>Detail Stock</h1>
      {!loading && (
        <>
          <h2>{symbol}</h2>
          RSI
          <input
            type="checkbox"
            onChange={() => {
              if (rsiChart.current) {
                indicatorChart.current.removeSeries(rsiChart.current);
                indicatorChart.current.removeSeries(rsiSignalChart.current);
                rsiChart.current = null;
                rsiSignalChart.current = null;
                indicatorChart.current.applyOptions({
                  priceScale: {
                    borderVisible: false,
                  },
                  timeScale: {
                    borderVisible: false,
                  },
                });
                indicatorChart.current.resize(0, 0);
              } else {
                indicatorChart.current.applyOptions({
                  priceScale: {
                    borderVisible: true,
                  },
                  timeScale: {
                    borderVisible: true,
                  },
                });
                indicatorChart.current.resize(800, 200);
                const rsiSignalData = rsiSignal(indicators[0]);
                rsiChart.current = indicatorChart.current.addLineSeries({
                  title: 'RSI',
                });
                rsiChart.current.setData(indicators[0]);
                rsiSignalChart.current = indicatorChart.current.addLineSeries({
                  title: 'RSI Signal (6)',
                  color: 'brown',
                });
                rsiSignalChart.current.setData(rsiSignalData);
              }
            }}
          />
          {/* <button onClick={() => dailyBtnClick()}>1일</button>
          <button onClick={() => weeklyBtnClick()}>1주</button>
          <button onClick={() => monthlyBtnClick()}>1달</button> */}
        </>
      )}
      <div ref={chartposition}></div>
      <div ref={indicatorPosition}></div>
    </>
  );

  // return <h1>Detail Stock</h1>;
}

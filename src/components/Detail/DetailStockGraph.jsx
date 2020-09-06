
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
    zIndex: 100
  },
  overlay: {
    zIndex: 100
  }
}

Modal.setAppElement(document.getElementById('option_modal'))

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
  volume
}) {
  const chart = useRef();
  const assistChart = useRef();
  const chartposition = useRef();
  const candleSeries = useRef();
  const smaFive = useRef();
  const smaTen = useRef();
  const smaTwenty = useRef();
  const smaSixty = useRef();
  const rsiChart = useRef();
  const rsiSignalChart = useRef();
  const volumeChart = useRef();

  const [smaFiveCk, fiveCk] = useState(false)
  const [smaTenCk, tenCk] = useState(false)
  const [smaTwentyCk, twentyCk] = useState(false)
  const [smaSixtyCk, sixtyCk] = useState(false)


  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }
  function closeModal() {
    setIsOpen(false);
  }


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
    assistChart.current = createChart(chartposition.current, { width: 800, height: 200 })
    assistChart.current.applyOptions({
      priceScale: {
        position: 'left',
      },
      timeScale: {
        fixLeftEdge: true,
      },
    });

  }, [])

  useEffect(() => {
    if (candleSeries.current) {
      chart.current.removeSeries(candleSeries.current);
      assistChart.current.removeSeries(volumeChart.current);
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

    volumeChart.current = assistChart.current.addHistogramSeries({
      title: 'volume',
    })
    volumeChart.current.setData(volume);
    assistChart.current.timeScale().setVisibleLogicalRange({
      from: volume.length - 60,
      to: volume.length,
    });
  }, [stock])
  // stock
  // 0: {time: "2020-04-13", open: 121.63, high: 121.8, low: 118.04, close: 121.1
  return (
    <>
      <button onClick={openModal}>open Modal</button>
      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles}>
        <form>
          <label>
            5 Moving Average
            <input type="checkbox" checked={smaFiveCk} onChange={() => {
              if (smaFive.current) {
                fiveCk(false);
                chart.current.removeSeries(smaFive.current);
                smaFive.current = null;
              } else {
                fiveCk(true);
                const data = movingAverageFive(stock)
                smaFive.current = chart.current.addLineSeries();
                smaFive.current.setData(data);
              }
            }} />
          </label>
          <label>
            10 Moving Average
            <input type="checkbox" checked={smaTenCk} onChange={() => {
              if (smaTen.current) {
                tenCk(false)
                chart.current.removeSeries(smaTen.current);
                smaTen.current = null;
              } else {
                tenCk(true)
                const data = movingAverageTen(stock)
                smaTen.current = chart.current.addLineSeries({
                  color: "pink"
                });
                smaTen.current.setData(data);
              }
            }} />
          </label>
          <label>
            20 Moving Average
            <input type="checkbox" checked={smaTwentyCk} onChange={() => {
              if (smaTwenty.current) {
                twentyCk(false)
                chart.current.removeSeries(smaTwenty.current);
                smaTwenty.current = null;
              } else {
                twentyCk(true)
                const data = movingAverageTwenty(stock)
                smaTwenty.current = chart.current.addLineSeries({
                  color: 'brown'
                });
                smaTwenty.current.setData(data);
              }
            }} />
          </label>
          <label>
            60 Moving Average
            <input type="checkbox" checked={smaSixtyCk} onChange={() => {
              if (smaSixty.current) {
                sixtyCk(false)
                chart.current.removeSeries(smaSixty.current);
                smaSixty.current = null;
              } else {
                sixtyCk(true)
                const data = movingAverageSixty(stock)
                smaSixty.current = chart.current.addLineSeries({
                  color: 'red'
                });
                smaSixty.current.setData(data);
              }
            }} />
          </label>
          <button onClick={closeModal}>Submit</button>
        </form>


      </Modal>
      <h1>Detail Stock</h1>
      {!loading && (
        <>
          <h2>{symbol}</h2>
          RSI
          <input type="checkbox" onChange={() => {
            if (rsiChart.current) {
              assistChart.current.removeSeries(rsiChart.current)
              assistChart.current.removeSeries(rsiSignalChart.current);
              rsiChart.current = null
              rsiSignalChart.current = null
            }

            else {
              const rsiSignalData = rsiSignal(indicators[0]);
              rsiChart.current = assistChart.current.addLineSeries({ title: "RSI" })
              rsiChart.current.setData(indicators[0])
              rsiSignalChart.current = assistChart.current.addLineSeries({ title: "RSI Signal (6)", color: "brown" })
              rsiSignalChart.current.setData(rsiSignalData)
            }
          }} />

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

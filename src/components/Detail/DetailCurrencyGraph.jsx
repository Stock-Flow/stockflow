import React from 'react';
import Modal from 'react-modal';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import './DetailStockGraph.scss';
import GraphService from '../../services/GraphService';

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

export default function DetailCurrencyGraph({
  getDetailCurrency,
  loading,
  symbol,
  currency,
  volume,
  movingAverage,
  indicators,
  rsiSignal,
  getMACDData,
  getStochasticSlow,
}) {
  //chart ref
  const chart = useRef();
  const assistChart = useRef();
  const indicatorChart = useRef();
  const disparityChart = useRef();
  const MACDChart = useRef();
  const MACDOSCChart = useRef();
  const stochasticSlowChart = useRef();

  //chart position ref
  const chartposition = useRef();
  const indicatorPosition = useRef();
  const disparityPosition = useRef();
  const MACDPosition = useRef();

  //graph ref
  const compareGraph = useRef();
  const candleSeries = useRef();
  const smaFive = useRef();
  const smaHundredTwenty = useRef();
  const smaTwenty = useRef();
  const smaSixty = useRef();
  const rsiChart = useRef();
  const rsiSignalChart = useRef();
  const stochasticSlowKGraph = useRef();
  const stochasticSlowDGraph = useRef();
  const disparityGraph = useRef();
  const MACDGraph = useRef();
  const MACDSignalGraph = useRef();
  const MACDOSCGraph = useRef();
  const volumeChart = useRef();
  const lowBBANDS = useRef();
  const middleBBANDS = useRef();
  const highBBANDS = useRef();

  //data
  const MACDData = useRef();
  const stochasticSlowData = useRef();

  //check
  const [smaFiveCk, fiveCk] = useState(false);
  const [fiveColor, setFiveColor] = useState('#0000ff');

  const [smaTwentyCk, twentyCk] = useState(false);
  const [twentyColor, setTwentyColor] = useState('#964b00');

  const [smaSixtyCk, sixtyCk] = useState(false);
  const [sixtyColor, setSixtyColor] = useState('#ff0000');

  const [smaHundredTwentyCk, hundredTwentyCk] = useState(false);
  const [hundredTwentyColor, setHundredTwentyColor] = useState('#ffc0cb');


  const [BBANDSCk, setBBANDSCk] = useState(false);
  const [BBANDSColor, setBBANDSColor] = useState('#00ff00');

  const [rsiCk, setRsick] = useState(false);
  const [rsiColor, setRsiColor] = useState('#ffff00');
  const [rsiSignalColor, setRsiSignalColor] = useState('#ff00ff');

  const [macdCk, setMacdck] = useState(false);
  const [MACDColor, setMACDColor] = useState('#cc0c0c');
  const [MACDSignalColor, setMACDSignalColor] = useState('#181818');

  const [macdOscCk, setMacdOscCk] = useState(false);
  const [MACDOSCColor, setMACDOSCColor] = useState('#651542');

  const [disparityCk, setDisparityck] = useState(false);
  const [disparityColor, setDisparityColor] = useState('#00ffff');

  const [stochasticSlowCk, setStochasticSlowck] = useState(false);
  const [slowDColor, setSlowDColor] = useState('#cccc00');
  const [slowKColor, setSlowKColor] = useState('#0000cc');

  const fiveMovingAverageData = movingAverage(currency, 5);
  const twentyMovingAverageData = movingAverage(currency, 20);
  const sixtyMovingAverageData = movingAverage(currency, 60);
  const hundredTwentyMovingAverageData = movingAverage(currency, 120);
  const twentyDisparity = twentyMovingAverageData
    .map((_, i) => ({
      time: currency[currency.length - i - 1].time,
      value:
        (currency[currency.length - i - 1].open /
          twentyMovingAverageData[twentyMovingAverageData.length - i - 1]
            .value) *
        100,
    }))
    .reverse();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);


  function openAddModal() {
    setAddModalIsOpen(true);
  }
  function closeAddModal() {
    setAddModalIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() { }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getDetailCurrency(symbol);
  }, [symbol, getDetailCurrency]);

  useEffect(() => {
    chart.current = createChart(chartposition.current, {
      width: 800,
      height: 400,
    });
    chart.current.applyOptions({
      priceScale: {
        position: 'right',
        autoScale: true,
        borderVisible: false,
        scaleMargins: { bottom: 0.1, top: 0 },
      },
      timeScale: {
        rightOffset: 0,
        fixLeftEdge: true,
        barSpacing: 10,
      },
      layout: {
        backgroundColor: '#1e1e1e',
        textColor: '#eeeeee'
      },
      grid: {
        vertLines: {
          color: '#555555'
        },
        horzLines: {
          color: '#555555'
        }
      }
    });
    assistChart.current = createChart(chartposition.current, {
      width: 800,
      height: 200,
    });
    assistChart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
      },
      layout: {
        backgroundColor: '#1e1e1e',
        textColor: '#eeeeee'
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        }
      }
    });
    indicatorChart.current = createChart(indicatorPosition.current, {
      width: 0,
      height: 0,
    });
    indicatorChart.current.resize(0, 0);
    indicatorChart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
        borderVisible: false,
      },
      layout: {
        backgroundColor: '#1e1e1e',
        textColor: '#eeeeee'
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        }
      }
    })
    disparityChart.current = createChart(disparityPosition.current, {
      width: 0,
      height: 0,
    });
    disparityChart.current.resize(0, 0);
    disparityChart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
        borderVisible: false,
      },
      layout: {
        backgroundColor: '#1e1e1e',
        textColor: '#eeeeee',
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });
    MACDChart.current = createChart(MACDPosition.current, {
      width: 0,
      height: 0,
    });
    MACDChart.current.resize(0, 0);

    MACDChart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
        borderVisible: false,
      },
      layout: {
        backgroundColor: '#1e1e1e',
        textColor: '#eeeeee',
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });
    MACDOSCChart.current = createChart(indicatorPosition.current, {
      width: 0,
      height: 0,
    });
    MACDOSCChart.current.resize(0, 0);
    MACDOSCChart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
        borderVisible: false,
      },
      layout: {
        backgroundColor: '#1e1e1e',
        textColor: '#eeeeee',
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });
    stochasticSlowChart.current = createChart(indicatorPosition.current, {
      width: 0,
      height: 0,
    });
    stochasticSlowChart.current.resize(0, 0);
    stochasticSlowChart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
        borderVisible: false,
      },
      layout: {
        backgroundColor: '#1e1e1e',
        textColor: '#eeeeee',
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
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
    }
    indicatorChart.current.resize(0, 0);
    setRsick(false);
    stochasticSlowChart.current.resize(0, 0)
    setStochasticSlowck(false);
    MACDChart.current.resize(0, 0);
    setMacdck(false)
    MACDOSCChart.current.resize(0, 0);
    setMacdOscCk(false);
    disparityChart.current.resize(0, 0);
    setDisparityck(false);
  }, [symbol]);


  useEffect(() => {
    candleSeries.current = chart.current.addCandlestickSeries({
      title: symbol,
    });
    candleSeries.current.setData(currency);
    chart.current.timeScale().setVisibleLogicalRange({
      from: currency.length - 60,
      to: currency.length,
    });

    volumeChart.current = assistChart.current.addHistogramSeries({
      title: 'volume',
    });
    volumeChart.current.setData(volume);
    assistChart.current.timeScale().setVisibleLogicalRange({
      from: volume.length - 60,
      to: volume.length,
    });

    MACDData.current = getMACDData(currency);
    stochasticSlowData.current = getStochasticSlow(currency, 12, 5, 5);

  }, [currency]);

  return (
    <>
      <div className="detail-stock">
        {!loading && (
          <>
            <h2>{symbol}</h2>
          </>
        )}

        <button className="detail-button" onClick={openAddModal}>open Add Modal</button>
        <button className="detail-button" onClick={() => {
          if (compareGraph.current) {
            chart.current.removeSeries(compareGraph.current);
            compareGraph.current = null;
          }
        }}>remove compare graph</button>
        <Modal isOpen={addModalIsOpen} onAfterOpen={modalIsOpen} onRequestClose={closeAddModal} style={customStyles}>

          <button onClick={() => {
            closeAddModal()
          }}>close</button>
        </Modal>

        <button className="detail-button" onClick={openModal}>open Modal</button>
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
                    smaFive.current = chart.current.addLineSeries({
                      color: fiveColor,
                    });
                    smaFive.current.setData(fiveMovingAverageData);
                  }
                }}
              />
            </label>
            <label>
              Five Moving Average Color
            <input
                type="color"
                value={fiveColor}
                onChange={(e) => {
                  setFiveColor(e.target.value);
                  if (smaFive.current) {
                    smaFive.current.applyOptions({ color: fiveColor });
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
                    smaTwenty.current = chart.current.addLineSeries({
                      color: twentyColor,
                    });
                    smaTwenty.current.setData(twentyMovingAverageData);
                  }
                }}
              />
            </label>
            <label>
              Twenty Moving Average Color
            <input
                type="color"
                value={twentyColor}
                onChange={(e) => {
                  setTwentyColor(e.target.value);
                  if (smaTwenty.current) {
                    smaTwenty.current.applyOptions({ color: twentyColor });
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
                    smaSixty.current = chart.current.addLineSeries({
                      color: sixtyColor,
                    });
                    smaSixty.current.setData(sixtyMovingAverageData);
                  }
                }}
              />
            </label>
            <label>
              Sixty Moving Average Color
            <input
                type="color"
                value={sixtyColor}
                onChange={(e) => {
                  setSixtyColor(e.target.value);
                  if (smaSixty.current) {
                    smaSixty.current.applyOptions({ color: sixtyColor });
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
                    smaHundredTwenty.current = chart.current.addLineSeries({
                      color: hundredTwentyColor,
                    });
                    smaHundredTwenty.current.setData(
                      hundredTwentyMovingAverageData,
                    );
                  }
                }}
              />
            </label>
            <label>
              HundredTwenty Moving Average Color
            <input
                type="color"
                value={hundredTwentyColor}
                onChange={(e) => {
                  setHundredTwentyColor(e.target.value);
                  if (smaHundredTwenty.current) {
                    smaHundredTwenty.current.applyOptions({
                      color: hundredTwentyColor,
                    });
                  }
                }}
              />
            </label>
            {indicators.length !== 0 ?
              <>
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
                          color: BBANDSColor,
                        });
                        lowBBANDS.current.setData(indicators[1][0]);
                        middleBBANDS.current = chart.current.addLineSeries({
                          title: 'BBANDS MIDDLE',
                          color: BBANDSColor,
                        });
                        middleBBANDS.current.setData(indicators[1][1]);
                        highBBANDS.current = chart.current.addLineSeries({
                          title: 'BBANDS HIGH',
                          color: BBANDSColor,
                        });
                        highBBANDS.current.setData(indicators[1][2]);
                      }
                    }}
                  />
                </label>
                <label>
                  BBANDS Color
            <input
                    type="color"
                    value={BBANDSColor}
                    onChange={(e) => {
                      setBBANDSColor(e.target.value);
                      if (lowBBANDS.current) {
                        lowBBANDS.current.applyOptions({ color: BBANDSColor });
                        middleBBANDS.current.applyOptions({ color: BBANDSColor });
                        highBBANDS.current.applyOptions({ color: BBANDSColor });
                      }
                    }}
                  />
                </label>
                <label>
                  RSI

          <input type="checkbox" checked={rsiCk} onChange={() => {
                    if (rsiChart.current) {
                      setRsick(false);
                      indicatorChart.current.removeSeries(rsiChart.current);
                      indicatorChart.current.removeSeries(rsiSignalChart.current);
                      indicatorChart.current.resize(0, 0);
                      rsiChart.current = null;
                    } else {
                      setRsick(true);
                      GraphService.graphColor(indicatorChart.current, rsiColor, rsiChart, indicators[0])
                      GraphService.graphColor(indicatorChart.current, rsiSignalColor, rsiSignalChart, rsiSignal)
                    }
                  }} />
                </label>
                <label>
                  RSI Color
            <input
                    type="color"
                    onChange={(e) => {
                      setRsiColor(e.target.value);
                      if (rsiChart.current) {
                        rsiChart.current.applyOptions({ color: rsiColor });
                      }
                    }}
                    value={rsiColor}
                  />
                </label>
                <label>
                  RSI Signal Color
            <input
                    type="color"
                    onChange={(e) => {
                      setRsiSignalColor(e.target.value);
                      if (rsiSignalChart.current) {
                        rsiSignalChart.current.applyOptions({
                          color: rsiSignalColor,
                        });
                      }
                    }}
                    value={rsiSignalColor}
                  />
                </label>
              </>
              : ''}
            <label>
              Disparity
            <input
                type="checkbox"
                checked={disparityCk}
                onChange={() => {
                  if (disparityGraph.current) {
                    setDisparityck(false);
                    disparityChart.current.removeSeries(disparityGraph.current);
                    disparityChart.current.resize(0, 0);
                    disparityGraph.current = null;
                  } else {
                    setDisparityck(true);
                    GraphService.graphColor(
                      disparityChart.current,
                      disparityColor,
                      disparityGraph,
                      twentyDisparity,
                    );
                  }
                }}
              />
            </label>
            <label>
              Disparity Color
            <input
                type="color"
                onChange={(e) => {
                  setDisparityColor(e.target.value);
                  if (disparityGraph.current) {
                    disparityGraph.current.applyOptions({
                      color: disparityColor,
                    });
                  }
                }}
                value={disparityColor}
              />
            </label>
            <label>
              MACD
            <input
                type="checkbox"
                checked={macdCk}
                onChange={() => {
                  if (MACDGraph.current) {
                    setMacdck(false);
                    MACDChart.current.removeSeries(MACDGraph.current);
                    MACDChart.current.removeSeries(MACDSignalGraph.current);
                    MACDChart.current.resize(0, 0);
                    MACDGraph.current = null;
                    MACDSignalGraph.current = null;
                  } else {
                    setMacdck(true);
                    GraphService.graphColor(
                      MACDChart.current,
                      MACDColor,
                      MACDGraph,
                      MACDData.current[0],
                    );
                    GraphService.graphColor(
                      MACDChart.current,
                      MACDSignalColor,
                      MACDSignalGraph,
                      MACDData.current[1],
                    );
                  }
                }}
              />
            </label>
            <label>
              MACD Color
            <input
                type="color"
                onChange={(e) => {
                  setMACDColor(e.target.value);
                  if (MACDGraph.current) {
                    MACDGraph.current.applyOptions({ color: MACDColor });
                  }
                }}
                value={MACDColor}
              />
            </label>
            <label>
              MACD Signal Color
            <input
                type="color"
                onChange={(e) => {
                  setMACDSignalColor(e.target.value);
                  if (MACDSignalGraph.current) {
                    MACDSignalGraph.current.applyOptions({
                      color: MACDSignalColor,
                    });
                  }
                }}
                value={MACDSignalColor}
              />
            </label>
            <label>
              MACD Oscillator
            <input
                type="checkbox"
                checked={macdOscCk}
                onChange={() => {
                  if (MACDOSCGraph.current) {
                    setMacdOscCk(false);
                    MACDOSCChart.current.removeSeries(MACDOSCGraph.current);
                    MACDOSCChart.current.resize(0, 0);
                    MACDOSCGraph.current = null;
                  } else {
                    setMacdOscCk(true);
                    GraphService.setHistogramGraph(
                      MACDOSCChart.current,
                      MACDOSCColor,
                      MACDOSCGraph,
                      MACDData.current[2],
                    );
                  }
                }}
              />
            </label>
            <label>
              MACDO Oscillator Color
            <input
                type="color"
                onChange={(e) => {
                  setMACDOSCColor(e.target.value);
                  if (MACDOSCGraph.current) {
                    MACDOSCGraph.current.applyOptions({ color: MACDOSCColor });
                  }
                }}
                value={MACDOSCColor}
              />
            </label>
            <label>
              Stochastic Slow
            <input
                type="checkbox"
                checked={stochasticSlowCk}
                onChange={() => {
                  if (stochasticSlowDGraph.current) {
                    setStochasticSlowck(false);
                    stochasticSlowChart.current.removeSeries(
                      stochasticSlowDGraph.current,
                    );
                    stochasticSlowChart.current.removeSeries(
                      stochasticSlowKGraph.current,
                    );
                    stochasticSlowChart.current.resize(0, 0);
                    stochasticSlowDGraph.current = null;
                    stochasticSlowKGraph.current = null;
                  } else {
                    setStochasticSlowck(true);
                    GraphService.graphColor(
                      stochasticSlowChart.current,
                      slowDColor,
                      stochasticSlowDGraph,
                      stochasticSlowData.current[1],
                    );
                    GraphService.graphColor(
                      stochasticSlowChart.current,
                      slowKColor,
                      stochasticSlowKGraph,
                      stochasticSlowData.current[0],
                    );
                  }
                }}
              />
            </label>
            <label>
              Stochastic Slow K Color
            <input
                type="color"
                onChange={(e) => {
                  setSlowKColor(e.target.value);
                  if (stochasticSlowKGraph.current) {
                    stochasticSlowKGraph.current.applyOptions({
                      color: slowKColor,
                    });
                  }
                }}
                value={slowKColor}
              />
            </label>
            <label>
              Stochastic Slow D Color
            <input
                type="color"
                onChange={(e) => {
                  setSlowDColor(e.target.value);
                  if (stochasticSlowDGraph.current) {
                    stochasticSlowDGraph.current.applyOptions({
                      color: slowDColor,
                    });
                  }
                }}
                value={slowDColor}
              />
            </label>
            <button onClick={closeModal}>Submit</button>
          </form>
        </Modal>

        <div className="chart" ref={chartposition}></div>
        <div className="chart" ref={indicatorPosition}></div>
        <div className="chart" ref={disparityPosition}></div>
        <div className="chart" ref={MACDPosition}></div>
      </div>
    </>
  )
}

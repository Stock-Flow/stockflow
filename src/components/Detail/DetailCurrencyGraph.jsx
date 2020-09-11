import React from 'react';
import Modal from 'react-modal';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

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


export default function DetailCurrencyGraph({
  getDetailCurrency,
  loading,
  symbol,
  currency,
  volume,

}){
 //chart ref
 const chart = useRef();
 const assistChart = useRef();

  //chart position ref
  const chartposition = useRef();
  //graph ref
  const compareGraph = useRef();
  const candleSeries = useRef();
  const volumeChart = useRef();
 

//check


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
  }, []);

  useEffect(() => {
    if (candleSeries.current) {
      chart.current.removeSeries(candleSeries.current);
      assistChart.current.removeSeries(volumeChart.current);
    }
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
  }, [currency]);

  return( 
    <> 
      <div className="detail-currency">
      {!loading && (
        <>
          <h2>{symbol}</h2>
        </>
      )}

      <button onClick={openAddModal}>open Add Modal</button>
      <button onClick={() => {
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

      <button onClick={openModal}>open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form>          
          <button onClick={closeModal}>Submit</button>
        </form>
      </Modal>

      <div ref={chartposition}></div>
    </div>
    </>
  )
}

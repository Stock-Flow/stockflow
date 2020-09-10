import React from 'react';
import Modal from 'react-modal';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { createChart } from 'lightweight-charts';



export default function DetailCurrencyGraph({
  getDetailCurrency,
  symbol,
}){
  const chart = useRef();
  const assistChart = useRef();
  const indicatorChart = useRef();
  const disparityChart = useRef();

  const chartposition = useRef();
  const indicatorPosition = useRef();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(){
    setIsOpen(true);
  }
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
  });
  return( 
    <> 
      <button onClick = {openModal}>open Modal</button>
      <Modal>
        <button onClick={closeModal}>Submit</button>
      </Modal>
      <div ref={chartposition}></div>
    </>
  )
}

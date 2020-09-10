import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { useEffect } from 'react';

export default function DetailCurrencyGraph({
  getDetailCurrency,
  symbol,
}){
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

  // useEffect(() => {
  //   chart.current = createChart(chartposition.current, {
  //     width: 800,
  //     height: 400,
  //   });
  //   chart.current.applyOptions({
  //     priceScale: {
  //       position: 'right',
  //       autoScale: true,
  //     },
  //     timeScale: {
  //       rightOffset: 0,
  //       fixLeftEdge: true,
  //       barSpacing: 10,
  //     },
  //   });
  //   assistChart.current = createChart(chartposition.current, {
  //     width: 800,
  //     height: 200,
  //   });
  //   assistChart.current.applyOptions({
  //     priceScale: {
  //       position: 'right',
  //     },
  //     timeScale: {
  //       fixLeftEdge: true,
  //     },
  //   });
  //   indicatorChart.current = createChart(indicatorPosition.current, {
  //     width: 0,
  //     height: 0,
  //   });
  //   indicatorChart.current.applyOptions({
  //     priceScale: {
  //       position: 'right',
  //       borderVisible: false,
  //     },
  //     timeScale: {
  //       fixLeftEdge: true,
  //       borderVisible: false,
  //     },

  //   })
  //   disparityChart.current = createChart(indicatorPosition.current, { width: 0, height: 0 })
  //   disparityChart.current.applyOptions({
  //     priceScale: {
  //       position: 'right',
  //       borderVisible: false,
  //     },
  //     timeScale: {
  //       fixLeftEdge: true,
  //       borderVisible: false,
  //     },
  //   })
  //   customChart.current = createChart(chartposition.current, { width: 0, height: 0 })
  //   customChart.current.applyOptions({
  //     priceScale: {
  //       position: 'right',
  //       borderVisible: false,
  //     },
  //     timeScale: {
  //       fixLeftEdge: true,
  //       borderVisible: false,
  //     },
  //   })
  // }, [])
  return( 
    <> 
      <button onClick = {openModal}>open Modal</button>
      <Modal>
        <button onClick={closeModal}>Submit</button>
      </Modal>
      {/* <div ref={chartposition}></div> */}
    </>
  )
}

import React, { useRef } from 'react'
import { createChart } from 'lightweight-charts';

export default function CustomGraph({ chart, color, graph }) {
  chart.resize(800, 200);
  graph.current = chart.addLineSeries({
    color: color
  });
  graph.current.setData([
    { time: '2019-04-11', value: 80.01 },
    { time: '2019-04-12', value: 96.63 },
    { time: '2019-04-13', value: 76.64 },
    { time: '2019-04-14', value: 81.89 },
    { time: '2019-04-15', value: 74.43 },
    { time: '2019-04-16', value: 80.01 },
    { time: '2019-04-17', value: 96.63 },
    { time: '2019-04-18', value: 76.64 },
    { time: '2019-04-19', value: 81.89 },
    { time: '2019-04-20', value: 74.43 },
  ])


  return (
    <>
    </>
  )
}
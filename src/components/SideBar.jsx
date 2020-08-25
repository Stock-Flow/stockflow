import React, { useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import Plot from 'react-plotly.js';


export default function SideBar({ getDjia, djiaValue }) {
  useEffect(() => {
    getDjia();
  }, [getDjia])
  let testX = [];
  let testY = [];
  const test = djiaValue[0];
  if (test) {
    testX = Object.keys(test);
    testY = Object.values(test);
    testY = testY.map(item => item["1. open"]);

    console.log(testY);
  }

  return (
    <>
      <h1>HI</h1>
      <Plot data={[{
        x: testX,
        y: testY,
        type: 'scatter',
        mode: 'lines',
      }
      ]}
        layout={{ width: 800, height: 400, title: "MMM" }}
      />
    </>
  )
}
import React from "react";
import Plot from "react-plotly.js";
import "./MainDjia.scss";
import DjiaDataChartContainer from "../../containers/MainDjia/djiaDataChartContainer";

export default function DjiaGraph({ djiaOpenData, djiaDate }) {
  return (
    <div className="djiagraph">
      <h1>
        DOW J<span>다우지수</span>
      </h1>

      <Plot
        data={[
          {
            x: djiaDate,
            y: djiaOpenData,
            type: "scatter",
            mode: "lines",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 1000, height: 600 }}
      />
      <DjiaDataChartContainer />
    </div>
  );
}

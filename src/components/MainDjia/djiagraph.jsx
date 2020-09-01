import React from "react";
import Plot from "react-plotly.js";

export default function DjiaGraph({ djiaOpenData, djiaDate }) {
  return (
    <div>
      <h1>DOW J</h1>
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
      {/* {console.log(djia)}
      {console.log(djiaAverage)}
      {JSON.stringify(djia)} */}
    </div>
  );
}

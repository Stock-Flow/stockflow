import React from "react";
import { useSelector } from "react-redux";
import DjiaGraph from "../components/djiagraph";

export default function DjiagraphContainer() {
  const djia = useSelector((state) => state.djia.djia);
  const djiaAverage = djia.map((djia) => {
    return djia.stockData;
  });
  if (djiaAverage.length !== 0) {
    const a = Object.values(djiaAverage[0]);
    console.log(a);
    const b = a.map((item) => {
      return item["1. open"];
    });
    console.log(b);
  }
  return (
    <div>
      <DjiaGraph djia={djia} djiaAverage={djiaAverage} />
    </div>
  );
}

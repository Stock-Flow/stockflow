import React from "react";
import { useSelector } from "react-redux";
import DetailStockGraph from "../../components/Detail/DetailStockGraph";

export default function DetailStockGraphContainer() {
  let stockList = [];
  let loading = false;
  let initialList = useSelector((state) => state.djia.djia);
  let initialLoading = useSelector((state) => state.djia.loading);
  if (stockList.length === 0) {
    stockList = initialList;
    loading = initialLoading;
  }

  return <DetailStockGraph stockList={stockList} loading={loading} />;
}

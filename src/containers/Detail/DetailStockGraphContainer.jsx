import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import DetailStockGraph from "../../components/Detail/DetailStockGraph";
import { getDetailStockSagaActionCreator } from "../../redux/modules/detailStock";

export default function DetailStockGraphContainer({
  func = "TIME_SERIES_DAILY_ADJUSTED",
  symbol = "IBM",
}) {
  const loading = useSelector((state) => state.detailStock.loading);
  const stock = useSelector((state) => state.detailStock.stock);
  const dispatch = useDispatch();
  const getDetailStock = useCallback(() => {
    dispatch(getDetailStockSagaActionCreator(func, symbol));
  }, [dispatch, func, symbol]);
  console.log(useSelector((state) => state));

  return (
    <DetailStockGraph
      getDetailStock={getDetailStock}
      loading={loading}
      stock={stock}
    />
  );
}

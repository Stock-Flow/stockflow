import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DjiaGraph from "../components/djiagraph";
import { getDJIASagaActionCreator } from "../redux/modules/djia";

export default function DjiagraphContainer() {
  const djia = useSelector((state) => state.djia.djia);
  const djiaAverage = djia.map((djia) => {
    return djia.stockData;
  });

  console.log(djiaAverage[0]);

  // const dispatch = useDispatch();

  // const getDjia = React.useCallback(() => {
  //   dispatch(getDJIASagaActionCreator());
  // }, [dispatch]);

  return (
    <div>
      <DjiaGraph djia={djia} djiaAverage={djiaAverage} />
    </div>
  );
}

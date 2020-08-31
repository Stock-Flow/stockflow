import { all } from "redux-saga/effects";
import { stockSaga } from "../modules/stock";
import { DJIASaga } from "../modules/djia";
import { sideBarStockSaga } from "../modules/sidebarstock";
import { stockNowSaga } from "../modules/stocknow";
import { detailStockSaga } from "../modules/detailStock";

export default function* rootSaga() {
  yield all([
    stockSaga(),
    sideBarStockSaga(),
    DJIASaga(),
    stockNowSaga(),
    detailStockSaga(),
  ]);
}

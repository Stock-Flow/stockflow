import {
  all
} from "redux-saga/effects";
import {
  stockSaga
} from "../modules/stock";
import {
  DJIASaga
} from "../modules/djia";
import {
  sideBarStockSaga
} from "../modules/sidebarstock";
import {
  sideBarCurrencySaga
} from "../modules/sidebarCurrency"

import {
  currencyNowSaga
} from "../modules/currencynow";



export default function* rootSaga() {
  yield all([stockSaga(), DJIASaga(), sideBarCurrencySaga(), sideBarStockSaga()])
}

export function* sidebarSaga() {
  yield([sideBarStockSaga()])
}
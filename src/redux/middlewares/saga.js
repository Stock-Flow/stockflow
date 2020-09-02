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

import { 
  detailStockSaga 
} from "../modules/detailStock";
import { indicatorSaga } from "../modules/indicator";


export default function* rootSaga() {
  yield all([stockSaga(), DJIASaga(), sideBarCurrencySaga(), sideBarStockSaga(),  detailStockSaga(), indicatorSaga()])
}

export function* sidebarSaga() {
  yield([sideBarStockSaga()])
}
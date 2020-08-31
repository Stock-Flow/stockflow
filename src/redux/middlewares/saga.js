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
  stockNowSaga
} from "../modules/stocknow";
import {
  currencyNowSaga
} from "../modules/currencynow";



export default function* rootSaga() {
  yield all([stockNowSaga(), stockSaga(), DJIASaga(), sideBarStockSaga(), sideBarCurrencySaga(), currencyNowSaga()])
}
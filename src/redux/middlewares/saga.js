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
  sideBarDigitalCurrencySaga
} from "../modules/sidebarDigitalCurrency"



export default function* rootSaga() {
  yield all([stockSaga(), DJIASaga(), sideBarStockSaga(), sideBarDigitalCurrencySaga()
  ])
}
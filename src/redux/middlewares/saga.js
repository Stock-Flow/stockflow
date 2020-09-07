<<<<<<< HEAD
import { all } from 'redux-saga/effects';
import { stockSaga } from '../modules/stock';
import { DJIASaga } from '../modules/djia';
import { sideBarStockSaga } from '../modules/sidebarstock';
import { sideBarCurrencySaga } from '../modules/sidebarCurrency';

import { currencyNowSaga } from '../modules/currencynow';

import { detailStockSaga } from '../modules/detailStock';
import { exchangeSaga } from '../modules/exchange';
import { selectedStockSaga } from '../modules/selectedStock';
=======
import { all } from "redux-saga/effects";
import { stockSaga } from "../modules/stock";
import { DJIASaga } from "../modules/djia";
import { sideBarStockSaga } from "../modules/sidebarstock";
import { sideBarCurrencySaga } from "../modules/sidebarCurrency";

import { currencyNowSaga } from "../modules/currencynow";

import { detailStockSaga } from "../modules/detailStock";

import { selectedStockSaga } from "../modules/selectedStock";

import { selectedSymbolSaga } from "../modules/selectedSymbol";
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b

export default function* rootSaga() {
  yield all([
    stockSaga(),
    DJIASaga(),
    sideBarCurrencySaga(),
    sideBarStockSaga(),
    detailStockSaga(),
<<<<<<< HEAD
    exchangeSaga(),
    selectedStockSaga(),
=======
    selectedStockSaga(),
    selectedSymbolSaga(),
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b
  ]);
}

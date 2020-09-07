<<<<<<< HEAD
=======

>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a
import { all } from 'redux-saga/effects';
import { stockSaga } from '../modules/stock';
import { DJIASaga } from '../modules/djia';
import { sideBarStockSaga } from '../modules/sidebarstock';
import { sideBarCurrencySaga } from '../modules/sidebarCurrency';

import { currencyNowSaga } from '../modules/currencynow';

import { detailStockSaga } from '../modules/detailStock';
<<<<<<< HEAD

import { selectedStockSaga } from '../modules/selectedStock';

import { selectedSymbolSaga } from '../modules/selectedSymbol';
=======
import { exchangeSaga } from '../modules/exchange';
import { selectedStockSaga } from '../modules/selectedStock';

import { selectedSymbolSaga } from "../modules/selectedSymbol";

>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a

export default function* rootSaga() {
  yield all([
    stockSaga(),
    DJIASaga(),
    sideBarCurrencySaga(),
    sideBarStockSaga(),
    detailStockSaga(),
<<<<<<< HEAD
    selectedStockSaga(),
    selectedSymbolSaga(),
=======

    exchangeSaga(),
    selectedStockSaga(),


    selectedSymbolSaga(),

>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a
  ]);
}

<<<<<<< HEAD
import {
  all
} from 'redux-saga/effects';
import {
  DJIASaga
} from '../modules/djia';
import {
  sideBarStockSaga
} from '../modules/sidebarstock';
import {
  sideBarCurrencySaga
} from '../modules/sidebarCurrency';
import {
  detailStockSaga
} from '../modules/detailStock';
import {
  detailCurrencySaga
} from '../modules/detailCurrency';
import {
  exchangeSaga
} from '../modules/exchange';
import {
  selectedStockSaga
} from '../modules/selectedStock';
=======
import { all } from 'redux-saga/effects';
import { stockSaga } from '../modules/stock';
import { DJIASaga } from '../modules/djia';
import { sideBarStockSaga } from '../modules/sidebarstock';
import { sideBarCurrencySaga } from '../modules/sidebarCurrency';
import { detailStockSaga } from '../modules/detailStock';
import { detailCurrencySaga } from '../modules/detailCurrency';
import { exchangeSaga } from '../modules/exchange';
import { selectedStockSaga } from '../modules/selectedStock';
>>>>>>> 687fb8fe400d06a7c6a6ff67be15166bec440b50

import { selectedSymbolSaga } from '../modules/selectedSymbol';
import { compareSaga } from '../modules/compare';
import { favoriteSymbolSaga } from '../modules/selectedSymbol';

export default function* () {
  yield all([
    DJIASaga(),
    sideBarCurrencySaga(),
    sideBarStockSaga(),
    detailStockSaga(),
    detailCurrencySaga(),
    exchangeSaga(),
    selectedStockSaga(),
    compareSaga(),
    selectedSymbolSaga(),
    favoriteSymbolSaga(),
  ]);
}

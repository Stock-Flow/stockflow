<<<<<<< HEAD
import { all } from "redux-saga/effects";
import { stockSaga } from "../modules/stock";
import { DJIASaga } from "../modules/djia";
import { sideBarStockSaga } from "../modules/sidebarstock";

export default function* rootSaga() {
  yield all([stockSaga(), sideBarStockSaga(), DJIASaga()]);
}
=======
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
  stockNowSaga
} from "../modules/stocknow";



export default function* rootSaga() {
  yield all([stockSaga(), sideBarStockSaga(), DJIASaga(), stockNowSaga()])
}
>>>>>>> 1c2573a58e06b677262e1d323f5de6bd56cebc94

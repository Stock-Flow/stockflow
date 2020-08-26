import {
  all
} from "redux-saga/effects";
import {
  stockSaga
} from "../modules/stock";
import {
  DJIASaga
} from "../modules/djia";



export default function* rootSaga() {
  yield all([stockSaga(), DJIASaga()])
}
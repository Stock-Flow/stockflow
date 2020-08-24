import {
  all
} from "redux-saga/effects";
import {
  stockSaga
} from "../modules/stock";



export default function* rootSaga() {
  yield all([stockSaga()])
}
import StockService from '../../services/StockService'
import {
  put,
  call,
  select,
  takeLeading
} from 'redux-saga/effects'
import DataProcessingService from '../../services/DataProcessingService';


const prefix = "stockflow/djia"

const initialState = {
  loading: true,
  djia: [],
  error: null,
  date: new Date().getDate(),
}







const GET_DJIA_START = `${prefix}/GET_DJIA_START`;
const GET_DJIA_SUCCESS = `${prefix}/GET_DJIA_SUCCESS`;
const GET_DJIA_FAIL = `${prefix}/GET_DJIA_FAIL`;

const startGetDJIA = () => {
  return {
    type: GET_DJIA_START,
  }
}


const successGetDJIA = (DJIA) => {
  return {
    type: GET_DJIA_SUCCESS,
    DJIA
  }
}


const failGetDJIA = (error) => {
  return {
    type: GET_DJIA_FAIL,
    error
  }
}

function* getDJIASaga() {
  const DJIAList = yield select((state) => state.djia.djia);
  yield put(startGetDJIA())
  try {
    yield
    if (DJIAList.length === 0) {
      let DJIAList = yield call(StockService.getDJIA);
      DJIAList = DJIAList.map(DJIA => DataProcessingService.DataProcessing(DJIA, "Time Series (Daily)"))
      yield put(successGetDJIA(DJIAList));
    } else if (new Date().getDate() !== initialState.date) {
      const DJIAList = yield call(StockService.getDJIA);
      yield put(successGetDJIA(DJIAList));
    }

  } catch (error) {
    yield put(failGetDJIA(error))
  }
}

const GET_DJIA_SAGA = "GET_DJIA_SAGA";
export const getDJIASagaActionCreator = () => ({
  type: GET_DJIA_SAGA,
})




export function* DJIASaga() {
  yield takeLeading(GET_DJIA_SAGA, getDJIASaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_DJIA_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      }

      case GET_DJIA_SUCCESS:
        return {
          ...prevState,
          loading: false,
            djia: action.DJIA,
            error: null,
        }
        case GET_DJIA_FAIL:
          return {
            ...prevState,
            loading: false,
              error: action.error
          }
          default:
            return {
              ...prevState
            }
  }
}
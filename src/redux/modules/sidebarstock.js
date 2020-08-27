import StockService from '../../services/StockService'
import {
  put,
  call,
  select,
  takeLeading
} from 'redux-saga/effects'


const prefix = "stockflow/sidebarstock"

const initialState = {
  loading: false,
  sideBarStock: [],
  error: null
}

const GET_SIDEBARSTOCK_START = `${prefix}GET_SIDEBARSTOCK_START`
const GET_SIDEBARSTOCK_SUCCESS = `${prefix}GET_SIDEBARSTOCK_SUCCESS`
const GET_SIDEBARSTOCK_FAIL = `${prefix}GET_SIDEBARSTOCK_FAIL`


const startGetSideBarStock = () => {
  return {
    type: GET_SIDEBARSTOCK_START,
  }
}

const SuccessGetSideBarStock = (sideBarStock) => {
  return {
    type: GET_SIDEBARSTOCK_SUCCESS,
    sideBarStock
  }
}

const FailGetSideBarStock = (error) => {
  return {
    type: GET_SIDEBARSTOCK_FAIL,
    error
  }
}

function* getSideBarStockSaga(action) {
  const {
    symbols
  } = action.payload
  yield put(startGetSideBarStock());
  try {
    const stocks = yield call(StockService.getSideBarStock(symbols))
    yield put(SuccessGetSideBarStock(stocks))
  } catch (error) {
    yield put(FailGetSideBarStock(error));
  }

}

const GET_SIDEBARSTOCK_SAGA = "GET_SIDEBARSTOCK_SAGA";

export const getSideBarStockSagaActionCreator = (symbols) => ({
  type: GET_SIDEBARSTOCK_SAGA,
  payload: {
    symbols
  }
})

export function* sideBarStockSaga() {
  yield takeLeading(GET_SIDEBARSTOCK_SAGA, getSideBarStockSaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_SIDEBARSTOCK_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      }

      case GET_SIDEBARSTOCK_SUCCESS:
        return {
          ...prevState,
          loading: false,
            sideBarStock: action.sideBarStock,
            error: null,
        }
        case GET_SIDEBARSTOCK_FAIL:
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
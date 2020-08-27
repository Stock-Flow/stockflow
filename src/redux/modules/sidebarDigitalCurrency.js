import DigitalCurrencyService from '../../services/DigitalCurrencyService'
import {
  put,
  call,
  select,
  takeLeading
} from 'redux-saga/effects'


const prefix = "stockflow/sidebarstock"

const initialState = {
  loading: false,
  sideBarDigitalCurrency: [],
  error: null
}

const GET_SIDEBARDIGITALCURRENCY_START = `${prefix}GET_SIDEBARDIGITALCURRENCY_START`
const GET_SIDEBARDIGITALCURRENCY_SUCCESS = `${prefix}GET_SIDEBARDIGITALCURRENCY_SUCCESS`
const GET_SIDEBARDIGITALCURRENCY_FAIL = `${prefix}GET_SIDEBARDIGITALCURRENCY_FAIL`


const startGetSideBarDigitalCurrency = () => {
  return {
    type: GET_SIDEBARDIGITALCURRENCY_START,
  }
}

const SuccessGetSideBarDigitalCurrency = (sideBarStock) => {
  return {
    type: GET_SIDEBARDIGITALCURRENCY_SUCCESS,
    sideBarStock
  }
}

const FailGetSideBarDigitalCurrency = (error) => {
  return {
    type: GET_SIDEBARDIGITALCURRENCY_FAIL,
    error
  }
}

function* getSideBarDigitalCurrencySaga(action) {
  const {
    symbols
  } = action.payload
  yield put(startGetSideBarDigitalCurrency());
  try {
    const digitalCurrencys = yield call(DigitalCurrencyService.getSideBarDigitalCurrency(symbols))
    yield put(SuccessGetSideBarDigitalCurrency(digitalCurrencys))
  } catch (error) {
    yield put(FailGetSideBarDigitalCurrency(error));
  }

}

const GET_SIDEBARDIGITALCURRENCY_SAGA = "GET_SIDEBARDIGITALCURRENCY_SAGA";

export const getSideBarDigitalCurrencySagaActionCreator = (symbols) => ({
  type: GET_SIDEBARDIGITALCURRENCY_SAGA,
  payload: {
    symbols
  }
})

export function* sideBarDigitalCurrencySaga() {
  yield takeLeading(GET_SIDEBARDIGITALCURRENCY_SAGA, getSideBarDigitalCurrencySaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_SIDEBARDIGITALCURRENCY_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      }

      case GET_SIDEBARDIGITALCURRENCY_SUCCESS:
        return {
          ...prevState,
          loading: false,
          sideBarDigitalCurrency: action.sideBarDigitalCurrency,
            error: null,
        }
        case GET_SIDEBARDIGITALCURRENCY_FAIL:
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
import {
  put,
  call,
  takeLeading
} from 'redux-saga/effects'
import CurrencyService from '../../services/CurrencyService'
// 루트사가에 추가, 리덕스 스토어에 사가 추가

// 1.액션 start, sucess,  error 3가지
const GET_SIDEBARCURRENCY_START = `GET_SIDEBARCURRENCY_START`
const GET_SIDEBARCURRENCY_SUCCESS = `GET_SIDEBARCURRENCY_SUCCESS`
const GET_SIDEBARCURRENCY_FAIL = `GET_SIDEBARCURRENCY_FAIL`

// 2.액션 생성자 함수 생성

const startGetSideBarCurrency = () => {
  return {
    type: GET_SIDEBARCURRENCY_START,
  }
}

const SuccessGetSideBarCurrency = (sideBarCurrency) => {
  return {
    type: GET_SIDEBARCURRENCY_SUCCESS,
    sideBarCurrency
  }
}

const FailGetSideBarCurrency = (error) => {
  return {
    type: GET_SIDEBARCURRENCY_FAIL,
    error
  }
}

// 3.reducer 만들기 start일경우 loading이 true, success일경우 통신으로 가져온 데이터를 저장, error일경우 error가 true
const initialState = {
  loading: false,
  sideBarCurrency: [],
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SIDEBARCURRENCY_START:
      return {
        ...state,
        loading: true,
          error: null,
      }

      case GET_SIDEBARCURRENCY_SUCCESS:
        return {
          ...state,
          loading: false,
          sideBarCurrency: action.sideBarCurrency,
            error: null,
        }
        case GET_SIDEBARCURRENCY_FAIL:
          return {
            ...state,
            loading: false,
              error: action.error
          }
          default:
            return {
              ...state
            }
  }
}


// 4.saga 만들기

// 사가에서 할일
// 1.액션 start로 store의 로딩을 true로 바꾼다
// 1.서비스에서 통신하여 데이터를 가져온다
// 2.try로 성공하면 가져온 데이터를 액션에 인수로 줘서 디스패치 로딩을 faulse로 바꾼다.
// 3.catch로 실패하면 액션에 error를 인수로 줘서 디스패치

// 액션타입

const GET_SIDEBARCURRENCY_SAGA = 'GET_SIDEBARCURRENCY_SAGA'

export function getSideBarCurrencySagaActionCreator() {
  return{
    type :GET_SIDEBARCURRENCY_SAGA
  }
}

// 어떤 액션이 들어왔을때 saga를 수행할것인지
export function* sideBarCurrencySaga() {
  yield takeLeading(GET_SIDEBARCURRENCY_SAGA, getSideBarCurrencySaga)
}

function* getSideBarCurrencySaga() {
  yield put(startGetSideBarCurrency());
  try {
    const Currencys = yield call(CurrencyService.getSideBarCurrency)
    yield put(SuccessGetSideBarCurrency(Currencys))
  } catch (error) {
    console.log(error)
    yield put(FailGetSideBarCurrency(error));
  }
}











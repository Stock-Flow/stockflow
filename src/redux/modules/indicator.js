import {
  put,
  call,
  takeLeading,
} from 'redux-saga/effects'
import IndicatorService from "../../services/IndicatorService"

//액션
const GET_INDICATOR_START = `GET_INDICATOR_START`
const GET_INDICATOR_SUCCESS = `GET_INDICATOR_SUCCESS`
const GET_INDICATOR_FAIL = `GET_INDICATOR_FAIL`

//액션생성자함수

const startGetIndicator = () => {
  return {
    type: GET_INDICATOR_START,
  }
}

const SuccessGetIndicator = (indicator) => {
  return {
    type: GET_INDICATOR_SUCCESS,
    indicator
  }
}

const FailGetIndicator = (error) => {
  return {
    type: GET_INDICATOR_FAIL,
    error
  }
}

//리듀서
const initialState = {
  loading: false,
  indicator: [],
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_INDICATOR_START:
      return {
        ...state,
        loading: true,
          error: null,
      }

      case GET_INDICATOR_SUCCESS:
        return {
          ...state,
          loading: false,
          indicator: action.indicator,
            error: null,
        }
        case GET_INDICATOR_FAIL:
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

//사가액션
const GET_INDICATOR_SAGA = 'GET_INDICATOR_SAGA'

//사가색션생성자 함수
export function getIndicatorSagaActionCreator() {
  return{
    type :GET_INDICATOR_SAGA,
    // param : {
    //   symbol : '',
    //   interval : '',
    //   time_period : '',
    //   series_type : '',
    // },
  }
}

// chart = [
//   chart1 : {
//     indicator : '',
//     symbol : '',
//     interval : '',
//     time_period : '',
//     series_type : '',
//   }
//   chart2 : {
//     indicator : '',
//     symbol : '',
//     interval : '',
//     time_period : '',
//     series_type : '',
//   }
// ]

export function* indicatorSaga() {
  yield takeLeading(GET_INDICATOR_SAGA, getIndicatorSaga)
}

function* getIndicatorSaga() {
  yield put(startGetIndicator());
  try {
    const indicator = yield call(() => IndicatorService.getIndicator())
    yield put(SuccessGetIndicator(indicator))
  } catch (error) {
    console.log(error)
    yield put(FailGetIndicator(error));
  }
}

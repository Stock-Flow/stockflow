// 루트사가에 추가, 리덕스 스토어에 사가 추가

// 1.액션 start, sucess,  error 3가지
const GET_SIDEBARDIGITALCURRENCY_START = `GET_SIDEBARDIGITALCURRENCY_START`
const GET_SIDEBARDIGITALCURRENCY_SUCCESS = `GET_SIDEBARDIGITALCURRENCY_SUCCESS`
const GET_SIDEBARDIGITALCURRENCY_FAIL = `GET_SIDEBARDIGITALCURRENCY_FAIL`

// 2.액션 생성자 함수 생성

const startGetSideBarDigitalCurrency = () => {
  return {
    type: GET_SIDEBARDIGITALCURRENCY_START,
  }
}

const SuccessGetSideBarDigitalCurrency = (sideBarStock) => {
  return {
    type: GET_SIDEBARDIGITALCURRENCY_SUCCESS,
    sideBarDigitalCurrency
  }
}

const FailGetSideBarDigitalCurrency = (error) => {
  return {
    type: GET_SIDEBARDIGITALCURRENCY_FAIL,
    error
  }
}

// 3.reducer 만들기 start일경우 loading이 true, success일경우 통신으로 가져온 데이터를 저장, error일경우 error가 true
const initialState = {
  loading: false,
  sideBarDigitalCurrency: [],
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SIDEBARDIGITALCURRENCY_START:
      return {
        ...state,
        loading: true,
          error: null,
      }

      case GET_SIDEBARDIGITALCURRENCY_SUCCESS:
        return {
          ...state,
          loading: false,
          sideBarDigitalCurrency: action.sideBarDigitalCurrency,
            error: null,
        }
        case GET_SIDEBARDIGITALCURRENCY_FAIL:
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


4.saga 만들기











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





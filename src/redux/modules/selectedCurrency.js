import {
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

const prefix = "stockflow/selectedCurrency";

const initialState = {
  loading: true,
  selectedCurrency: '',
  error: null,
};

const GET_SELECTEDCURRENCY_START = `${prefix}/GET_SELECTEDCURRENCY_START`;
const GET_SELECTEDCURRENCY_SUCCESS = `${prefix}/GET_SELECTEDCURRENCY_SUCCESS`;
const GET_SELECTEDCURRENCY_FAIL = `${prefix}/GET_SELECTEDCURRENCY_FAIL`;

const startGetSelectedCurrency = () => {
  return {
    type: GET_SELECTEDCURRENCY_START,
  };
};

const successGetSelectedCurrency = (selectedCurrency) => {
  return {
    type: GET_SELECTEDCURRENCY_SUCCESS,
    selectedCurrency,
  };
};

const failGetSelectedCurrency = (error) => {
  return {
    type: GET_SELECTEDCURRENCY_FAIL,
    error,
  };
};

function* getSelectedCurrencySaga(action) {
  const {
    selectedCurrency
  } = action.payload;
  yield put(startGetSelectedCurrency())
  try {
    yield put(successGetSelectedCurrency(selectedCurrency));
  } catch (error) {
    yield put(failGetSelectedCurrency(error))
  }
}

const GET_SELECTEDCURRENCY_SAGA = "GET_SELECTEDCURRENCY_SAGA";
export const getSelectedCurrencySagaActionCreator = (selectedCurrency) => ({
  type: GET_SELECTEDCURRENCY_SAGA,
  payload: {
    selectedCurrency
  },
});

export function* selectedCurrencySaga() {
  yield takeLatest(GET_SELECTEDCURRENCY_SAGA, getSelectedCurrencySaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_SELECTEDCURRENCY_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      };

    case GET_SELECTEDCURRENCY_SUCCESS:
      console.log(action.selectedCurrency);
      return {
        ...prevState,
        loading: false,
          selectedCurrency: action.selectedCurrency,
          error: null,
      };
    case GET_SELECTEDCURRENCY_FAIL:
      return {
        ...prevState,
        loading: false,
          error: action.error,
      };
    default:
      return {
        ...prevState,
      };
  }
}
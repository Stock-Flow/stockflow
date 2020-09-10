import { put, takeEvery, takeLatest } from "redux-saga/effects";

const prefix = "stockflow/selectedStock";

const initialState = {
  loading: true,
  kind : "",
  symbol: "",
  error: null,
};

const GET_SELECTEDSTOCK_START = `${prefix}/GET_SELECTEDSTOCK_START`;
const GET_SELECTEDSTOCK_SUCCESS = `${prefix}/GET_SELECTEDSTOCK_SUCCESS`;
const GET_SELECTEDSTOCK_FAIL = `${prefix}/GET_SELECTEDSTOCK_FAIL`;

const startGetSelectedStock = () => {
  return {
    type: GET_SELECTEDSTOCK_START,
  };
};

const successGetSelectedStock = (selectedStock) => {
  return {
    type: GET_SELECTEDSTOCK_SUCCESS,
    selectedStock,
  };
};

const failGetelectedStock = (error) => {
  return {
    type: GET_SELECTEDSTOCK_FAIL,
    error,
  };
};

function* getSelectedStockSaga(action) {
  const  selectedStock = action.payload;
  console.log(selectedStock)
  yield put(startGetSelectedStock());
  try {
    yield put(successGetSelectedStock(selectedStock));
  } catch (error) {
    yield put(failGetelectedStock(error));
  }
}

const GET_SELECTEDSTOCK_SAGA = "GET_SELECTEDSTOCK_SAGA";
export const getSelectedStockSagaActionCreator = (symbol, kind) => ({
  type: GET_SELECTEDSTOCK_SAGA,
  payload: {
    symbol,
    kind
  },
});

export function* selectedStockSaga() {
  yield takeLatest(GET_SELECTEDSTOCK_SAGA, getSelectedStockSaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_SELECTEDSTOCK_START:
      return {
        ...prevState,
        loading: true,
        error: null,
      };

    case GET_SELECTEDSTOCK_SUCCESS:
      console.log(action.selectedStock);
      return {
        ...prevState,
        loading: false,
        kind : action.selectedStock.kind,
        symbol: action.selectedStock.symbol,
        error: null,
      };
    case GET_SELECTEDSTOCK_FAIL:
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

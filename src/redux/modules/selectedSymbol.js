import { put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { useSelector } from "react-redux";

const prefix = "stockflow/selectedSymbol";

// action type
const START = `${prefix}/START`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;

/*
  [
    {
      symbol: MMM,
      count: 1
    }
  ]
*/

// initial state
const initialState = {
  selectedSymbol: [],
  loading: false,
  error: null,
};

// action creator
const selectedSymbolStart = () => ({
  type: START,
});

const selectedSymbolSuccess = (selectedSymbol) => ({
  type: SUCCESS,
  selectedSymbol,
});

const selectedSymbolFail = (error) => ({
  type: FAIL,
  error,
});

function* getSelectedSymbolSaga(action) {
  let selectedSymbol = yield select(
    (state) => state.selectedSymbol.selectedSymbol
  );
  console.log(selectedSymbol);
  if (
    selectedSymbol.filter(
      (symbol) => symbol.symbol === action.payload.selectedSymbol
    ).length === 0
  ) {
    selectedSymbol = [
      ...selectedSymbol,
      { symbol: action.payload.selectedSymbol, count: 1 },
    ];
  } else {
    selectedSymbol = selectedSymbol.map((symbol) =>
      symbol.symbol === action.payload.selectedSymbol
        ? { ...symbol, count: symbol.count + 1 }
        : symbol
    );
  }

  console.log(selectedSymbol);
  yield put(selectedSymbolStart());
  try {
    yield put(selectedSymbolSuccess(selectedSymbol));
  } catch (error) {
    yield put(selectedSymbolFail(error));
  }
}

const GET_SELECTEDSYMBOL_SAGA = "GET_SELECTEDSYMBOL_SAGA";
export const getSelectedSymbolActionCreator = (selectedSymbol) => ({
  type: GET_SELECTEDSYMBOL_SAGA,
  payload: {
    selectedSymbol,
  },
});

export function* selectedSymbolSaga() {
  yield takeLatest(GET_SELECTEDSYMBOL_SAGA, getSelectedSymbolSaga);
}

// reducer

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case START:
      return {
        ...prevState,
        loading: true,
        error: null,
      };

    case SUCCESS:
      console.log(action.selectedSymbol);
      return {
        ...prevState,
        loading: false,
        selectedSymbol: action.selectedSymbol,
        error: null,
      };
    case FAIL:
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

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
    // 같은 symbol이 없을때 새로운 symbol 추가
    selectedSymbol.filter(
      (symbol) => symbol.symbol === action.payload.selectedSymbol
    ).length === 0
  ) {
    selectedSymbol = [
      ...selectedSymbol,
      {
        names: action.payload.names,
        symbol: action.payload.selectedSymbol,
        count: 1,
      },
    ];
  } else {
    // 만약 이미 추가된 symbol이라면 count만 + 1
    selectedSymbol = selectedSymbol.map((symbol) =>
      symbol.symbol === action.payload.selectedSymbol
        ? {
            ...symbol,
            count: symbol.count + 1,
          }
        : symbol
    );
  }

  yield put(selectedSymbolStart());
  try {
    yield put(selectedSymbolSuccess(selectedSymbol));
  } catch (error) {
    yield put(selectedSymbolFail(error));
  }
}

const GET_SELECTEDSYMBOL_SAGA = "GET_SELECTEDSYMBOL_SAGA";
export const getSelectedSymbolActionCreator = (selectedSymbol, names) => ({
  type: GET_SELECTEDSYMBOL_SAGA,
  payload: {
    selectedSymbol,
    names,
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
      return {
        ...prevState,
        loading: false,
        selectedSymbol: action.selectedSymbol,
        names: action.names,
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

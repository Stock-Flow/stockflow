import { put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { useSelector } from 'react-redux';

const prefix = 'stockflow/favoriteList';

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
  selectedStockSymbol: [],
  selectedCurrencySymbol: [],
  loading: false,
  error: null,
};

// action creator
const selectedSymbolStart = () => ({
  type: START,
});

const selectedSymbolSuccess = (selectedSymbol, names) => ({
  type: SUCCESS,
  selectedSymbol,
  names,
});

const selectedSymbolFail = (error) => ({
  type: FAIL,
  error,
});

function* getFavoriteListSaga(action) {
  yield put(selectedSymbolStart());
  try {
    yield put(selectedSymbolSuccess());
  } catch (error) {
    yield put(selectedSymbolFail(error));
  }
}

const GET_FAVORITELIST_SAGA = 'GET_FAVORITELIST_SAGA';
export const getfavoriteListActionCreator = (selectedSymbol, names) => ({
  type: GET_FAVORITELIST_SAGA,
  payload: {
    selectedSymbol,
    names,
  },
});

export function* selectedSymbolSaga() {
  yield takeLatest(GET_FAVORITELIST_SAGA, getFavoriteListSaga);
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
      if (action.names === 'stock') {
        return {
          ...prevState,
          loading: false,
          selectedStockSymbol: action.selectedSymbol,
          error: null,
        };
      } else {
        return {
          ...prevState,
          loading: false,
          selectedCurrencySymbol: action.selectedSymbol,
          error: null,
        };
      }
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

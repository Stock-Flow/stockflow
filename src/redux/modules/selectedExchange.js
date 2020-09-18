import {
  takeLatest,
  put
} from 'redux-saga/effects';

const prefix = `stockflow/selectedExchange`;
const initialState = {
  loading: false,
  fxIntraday: {},
  error: null,
};

const GET_SELECTEDEXCHANGE_START = `${prefix}/GET_SELECTEDEXCHANGE_START`;
const GET_SELECTEDEXCHANGE_SUCCESS = `${prefix}/GET_SELECTEDEXCHANGE_SUCCESS`;
const GET_SELECTEDEXCHANGE_FAIL = `${prefix}/GET_SELECTEDEXCHANGE_FAIL`;
const GET_SELECTEDEXCHANGE_SAGA = `${prefix}/GET_SELECTEDEXCHANGE_SAGA`;

const startGetSelectedExchange = () => {
  return {
    type: GET_SELECTEDEXCHANGE_START,
  };
};

const successGetSelectedExchange = (fxIntraday) => {
  return {
    type: GET_SELECTEDEXCHANGE_SUCCESS,
    fxIntraday,
  };
};

const failGetSelectedExchange = (error) => {
  return {
    type: GET_SELECTEDEXCHANGE_FAIL,
    error,
  };
};

function* getSelectedExchangeSaga(action) {
  console.log(action);
  const selectedExchange = action.payload;
  console.log(selectedExchange);
  yield put(startGetSelectedExchange());
  try {
    yield put(successGetSelectedExchange(selectedExchange));
  } catch (error) {
    yield put(failGetSelectedExchange(error));
  }
}

export const createGetSelectedExchangeSaga = (
  fromCurrenciesCode,
  fromCurrenciesName,
  toCurrenciesCode,
  toCurrenciesName,
  fxIntraday,
) => {
  return {
    type: GET_SELECTEDEXCHANGE_SAGA,
    payload: {
      fromCurrenciesCode,
      fromCurrenciesName,
      toCurrenciesCode,
      toCurrenciesName,
      fxIntraday,
    },
  };
};
export function* selectedExchangeSaga() {
  yield takeLatest(GET_SELECTEDEXCHANGE_SAGA, getSelectedExchangeSaga);
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SELECTEDEXCHANGE_START:
      return {
        ...state,
        loading: true,
          error: null,
      };
    case GET_SELECTEDEXCHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
          error: null,
          fromCurrenciesCode: action.fromCurrenciesCode,
          fromCurrenciesName: action.fromCurrenciesName,
          toCurrenciesCode: action.toCurrenciesCode,
          toCurrenciesName: action.toCurrenciesName,
          fxIntraday: action.fxIntraday,
      };
    case GET_SELECTEDEXCHANGE_FAIL:
      return {
        ...state,
        loading: false,
          error: action.error,
      };
    default: {
      return state;
    }
  }
}
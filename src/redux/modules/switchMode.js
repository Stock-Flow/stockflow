import { put, call, takeEvery } from 'redux-saga/effects';

const prefix = 'stockflow/switchmode';
const initialState = {
  loading: true,
  darkMode: true,
  error: null,
};

const GET_SWITCHMODE_START = `${prefix}/GET_SWITCHMODE_START`;
const GET_SWITCHMODE_SUCCESS = `${prefix}/GET_SWITCHMODE_SUCCESS`;
const GET_SWITCHMODE_FAIL = `${prefix}/GET_SWITCHMODE_FAIL`;

const startGetSwitchmode = () => {
  return {
    type: GET_SWITCHMODE_START,
  };
};
const successSwitchmode = (darkMode) => {
  return {
    type: GET_SWITCHMODE_SUCCESS,
    darkMode,
  };
};
const failSwitchmode = (error) => {
  return {
    type: GET_SWITCHMODE_FAIL,
    error,
  };
};

function* getSwitchModeSage(action) {
  console.log('askdopsakdopsakdopk');
  const { darkModeSaga } = action.payload;
  yield put(startGetSwitchmode());
  try {
    // delay(1000);

    yield put(successSwitchmode(darkModeSaga));
  } catch (error) {
    console.log(error);
    yield put(failSwitchmode(error));
  }
}

const GET_SWITCHMODE_SAGA = `${prefix}GET_SWITCHMODE_SAGA`;

export const getSwitchModeSagaActionCreator = (darkMode) => ({
  type: GET_SWITCHMODE_SAGA,
  payload: {
    darkMode,
  },
});

export function* switchModeSaga() {
  yield takeEvery(GET_SWITCHMODE_SAGA, getSwitchModeSage);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_SWITCHMODE_START:
      return {
        ...prevState,
        loading: true,
        error: null,
      };

    case GET_SWITCHMODE_SUCCESS:
      return {
        loading: false,
        darkMode: action.darkMode,
        error: null,
      };
    case GET_SWITCHMODE_FAIL:
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

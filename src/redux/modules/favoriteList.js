// import { put, takeEvery, takeLatest, select } from 'redux-saga/effects';
// import { useSelector } from 'react-redux';

// const prefix = 'stockflow/favoriteList';

// // action type
// const START = `${prefix}/START`;
// const SUCCESS = `${prefix}/SUCCESS`;
// const FAIL = `${prefix}/FAIL`;

// /*
//   [
//     {
//       symbol: MMM,
//       count: 1
//     }
//   ]
// */

// // initial state
// const initialState = {
//   selectedStockSymbol: [],
//   selectedCurrencySymbol: [],
//   loading: false,
//   error: null,
// };

// // action creator
// const CounterListStart = () => ({
//   type: START,
// });

// const CounterListSuccess = (getStockListElement, getCurrencyListElement) => ({
//   type: SUCCESS,
//   getStockListElement,
//   getCurrencyListElement,
// });

// const CounterListFail = (error) => ({
//   type: FAIL,
//   error,
// });

// function* getFavoriteListSaga(action) {
//   // let selectedStockSymbol = yield select(
//   //   (state) => state.selectedSymbol.selectedStockSymbol,
//   // );

//   // let selectedCurrencySymbol = yield select(
//   //   (state) => state.selectedSymbol.selectedCurrencySymbol,
//   // );

//   const getStockListElement = action.payload.getStockListElement;
//   const getCurrencyListElement = action.payload.getCurrencyListElement;

//   console.log(getStockListElement);
//   console.log(getCurrencyListElement);

//   yield put(CounterListStart());
//   try {
//     yield put(CounterListSuccess(getStockListElement, getCurrencyListElement));
//   } catch (error) {
//     yield put(CounterListFail(error));
//   }
// }

// const GET_FAVORITELIST_SAGA = 'GET_FAVORITELIST_SAGA';
// export const getfavoriteListActionCreator = (
//   getStockListElement,
//   getCurrencyListElement,
// ) => ({
//   type: GET_FAVORITELIST_SAGA,
//   payload: {
//     getStockListElement,
//     getCurrencyListElement,
//   },
// });

// export function* favoriteSymbolSaga() {
//   yield takeLatest(GET_FAVORITELIST_SAGA, getFavoriteListSaga);
// }

// // reducer

// export default function reducer(prevState = initialState, action) {
//   switch (action.type) {
//     case START:
//       return {
//         ...prevState,
//         loading: true,
//         error: null,
//       };

//     case SUCCESS:
//       // if (action.selectedStockSymbol) {
//       //   return {
//       //     ...prevState,
//       //     loading: false,
//       //     selectedStockSymbol: action.selectedStockSymbol,
//       //     error: null,
//       //   };
//       // } else {
//       //   return {
//       //     ...prevState,
//       //     loading: false,
//       //     selectedCurrencySymbol: action.selectedCurrencySymbol,
//       //     error: null,
//       //   };
//       // }
//       return {
//         selectedStockSymbol: action.getStockListElement,
//         selectedCurrencySymbol: action.getCurrencyListElement,
//         loading: false,
//         error: null,
//       };
//     case FAIL:
//       return {
//         ...prevState,
//         loading: false,
//         error: action.error,
//       };
//     default:
//       return {
//         ...prevState,
//       };
//   }
// }

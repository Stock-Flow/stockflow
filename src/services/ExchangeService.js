import axios from 'axios';
import { apiKey } from '../key';

export default class ExchangeSerivice {
  static async getExchange(exchangeArr) {
    // const [fromCurrency, toCurrency] = exchange;

    // API 요청
    const returnExchange = exchangeArr.map((_, index) => {
      const fromCurrency = exchangeArr[index][0];
      const toCurrency = exchangeArr[index][1];
      return axios
        .get(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apiKey}`,
        )
        .then((res) => res.data['Realtime Currency Exchange Rate'])
        .catch((e) => console.error(e));
    });
    const exchangePromise = await Promise.all(returnExchange).then(
      (res) => res,
    );

    const returnIntraday = exchangeArr.map((_, index) => {
      const fromSymbol = exchangeArr[index][0];
      const toSymbol = exchangeArr[index][1];
      return axios
        .get(
          `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&interval=5min&apikey=${apiKey}`,
        )
        .then((res) => res.data['Time Series FX (Daily)'])
        .catch((e) => console.error(e));
    });
    const exchangeIntraPromise = await Promise.all(returnIntraday).then(
      (res) => res,
    );

    const exchangeArrState = [...exchangePromise];
    let combineExchangeArray = await exchangeArr.map((exchange, i) => {
      return (exchangeArrState[i].fxIntraday = exchangeIntraPromise[i]);
    });
    return exchangeArrState;
  }
}
// export default class ExchangeSerivice {
//   static async getExchange(exchangeArr) {
//     const exchangeArrState = [];

//     for (const exchange of exchangeArr) {
//       const [fromCurrency, toCurrency] = exchange;
//       const returnExchange = await axios.get(
//         `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apiKey}`,
//       );

//       exchangeArrState.push({
//         ...returnExchange.data['Realtime Currency Exchange Rate'],
//       });
//     }

//     for (let i = 0; i < exchangeArr.length; i++) {
//       const [fromSymbol, toSymbol] = exchangeArr[i];

//       const fxIntraday = await axios.get(
//         `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&interval=5min&apikey=${apiKey}`,
//       );

//       exchangeArrState[i].fxIntraday = fxIntraday.data['Time Series FX (5min)'];
//     }

//     return exchangeArrState;
//   }
// }

import axios from 'axios';
import { apiKey } from '../key';
import Logo from '../components/SideBar/Logo';

// const exchangeArr = ['AUD', 'EUR', 'KRW', 'USD']

export default class ExchangeSerivice {
  static async getExchange(exchangeArr) {
    let exchangeArrState = [];

    exchangeArr.forEach(async (exchange, i) => {
      const [fromCurrency, toCurrency] = exchange;
      const [fromSymbol, toSymbol] = exchange;

      let returnExchange = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apiKey}`,
      );
      let fxIntraday = await axios.get(
        `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&interval=5min&apikey=${apiKey}`,
      );

      fxIntraday = fxIntraday.data['Time Series FX (5min)'];
      returnExchange = returnExchange.data['Realtime Currency Exchange Rate'];
      // exchangeArrState[i] = {
      //   ...returnExchange,
      //   fxIntraday,
      // };
      const fxMerge = Object.assign(returnExchange, fxIntraday);
      exchangeArrState[i] = fxMerge;
    });

    return exchangeArrState;
  }
}

/*
exchangeArr.forEach(async (exchange) => {
      const [fromCurrency, toCurrency] = exchange;
      let returnExchange = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apiKey}`,
      );
      returnExchange = returnExchange.data['Realtime Currency Exchange Rate'];
      exchangeArrState.push(returnExchange);
    });

    exchangeArr.forEach(async (exchange, i) => {
      const [fromSymbol, toSymbol] = exchange;
      let fxIntraday = await axios.get(
        `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&interval=5min&apikey=${apiKey}`,
      );
      fxIntraday = fxIntraday.data['Time Series FX (5min)'];
      exchangeArrState[i] = {
        ...exchangeArrState[i],
        fxIntraday,
      };
    });
*/

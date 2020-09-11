import axios from 'axios';
import {
  apiKey
} from '../key';

export default class ExchangeSerivice {
  static async getExchange(exchangeArr) {
    const exchangeArrState = [];

    for (const exchange of exchangeArr) {
      const [fromCurrency, toCurrency] = exchange;
      const returnExchange = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apiKey}`,
      );

      exchangeArrState.push({
        ...returnExchange.data['Realtime Currency Exchange Rate'],
      });
    }

    for (let i = 0; i < exchangeArr.length; i++) {
      const [fromSymbol, toSymbol] = exchangeArr[i];

      const fxIntraday = await axios.get(
        `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&interval=5min&apikey=${apiKey}`,
      );

      exchangeArrState[i].fxIntraday = fxIntraday.data['Time Series FX (5min)'];
    }
    return exchangeArrState;
  }
}
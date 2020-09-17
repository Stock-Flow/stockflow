import axios from 'axios';
import {
  apiKey
} from '../key';
import DataProcessingService from './DataProcessingService';

export default class DetailCurrencyService {
  static async getCurrencyDaily(func, symbol, date) {

    const currencyData = await axios.get(
      `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&market=USD&apikey=${apiKey}`,
    );

    let detailCurrency = await DataProcessingService.CurrencyDataProcessing(
      currencyData.data,
      date,
    );

    let volume = Object.values(detailCurrency.currencyData).map(item => (item['5. volume']))

    volume = Object.keys(detailCurrency.currencyData).map((item, i) => ({
      time: item,
      value: +volume[i]
    }))

    detailCurrency = DataProcessingService.CurrencyGraphDataProcessing(detailCurrency);

    return [detailCurrency, volume.reverse()];
  }
}
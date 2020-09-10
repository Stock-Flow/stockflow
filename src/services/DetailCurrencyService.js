import axios from 'axios';
import { apiKey } from '../key';
import DataProcessingService from './DataProcessingService';

export default class DetailCurrencyService {
  static async getCurrencyDaily(func, symbol, date) {
    console.log(func, symbol, date)
    const currencyData = await axios.get(
      `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&market=USD&apikey=${apiKey}`,
    );

    let detailCurrency = await DataProcessingService.CurrencyDataProcessing(
      currencyData.data,
      date,
    );

    console.log(detailCurrency)
    detailCurrency = DataProcessingService.AdjustCurrencySplitSingle(detailCurrency, date)
    console.log(detailCurrency)
    let volume = Object.values(detailCurrency.currencyData).map(item => (item['5. volume']))
    console.log('volume', volume)
    volume = Object.keys(detailCurrency.currencyData).map((item, i) => ({
      time: item,
      value: +volume[i]
    }))

    detailCurrency = DataProcessingService.CurrencyGraphDataProcessing(detailCurrency);

    console.log(detailCurrency, volume)
    return [detailCurrency, volume.reverse()];
  }
}
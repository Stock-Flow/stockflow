import axios from 'axios';
import { apiKey } from '../key';
import DataProcessingService from './DataProcessingService';

export default class DetailStockService {
  static async getStockDaily(func, symbol, date) {
    const stockData = await axios.get(
      `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&outputsize=full&apikey=${apiKey}`,
    );

    let detailStock = DataProcessingService.DataProcessing(
      stockData.data,
      date,
    );

    detailStock = DataProcessingService.AdjustSplitSingle(detailStock, date)
    console.log(detailStock)
    let volume = Object.values(detailStock.stockData).map(item => (item['6. volume']))
    volume = Object.keys(detailStock.stockData).map((item, i) => ({
      time: item,
      value: +volume[i]
    }))

    detailStock = DataProcessingService.GraphDataProcessing(detailStock);
    return [detailStock, volume.reverse()];
  }
}

import axios from 'axios'
import {
  apiKey
} from '../key'
const DOW_DIVISOR = 0.14748071991788;
const DOW_ITEMS_SYMBOL = ["MMM", "IBM", "JPM", "AAPL", "GS", "NKE", "DOW", "MSFT", "MCD", "MRK", "VZ", "BA", "V", "CVX", "CSCO", "AXP", "XOM", "WMT", "DIS", "RTX", "UNH", "INTC", "WBA", "JNJ", "CAT", "KO", "TRV", "PG", "HD", "PFE"];

export default class StockService {
  static async getStockIntra(func, symbol) {
    const stockData = await axios.get(`https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=1min&apikey=${apiKey}`)
    return stockData.data
  }


  static async getDJIA() {
    const DJIAList = [];
    for (const symbol of DOW_ITEMS_SYMBOL) {
      const djiaData = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=1min&apikey=${apiKey}`)
      DJIAList.push(djiaData.data);
    }
    return DJIAList;
  }
}
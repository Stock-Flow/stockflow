import axios from 'axios';
import { apiKey } from '../key';

export default class DetailStockService {
  static async getStockDaily(func, symbol, date) {
    const stockData = await axios.get(
      `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=1min&apikey=${apiKey}`,
    );

    let newDateForm = stockData.data[date];
    let newDateFormArr = [];
    for (let i in newDateForm) {
      newDateFormArr.push({
        time: i,
        open: Number(newDateForm[i]['1. open']),
        high: Number(newDateForm[i]['2. high']),
        low: Number(newDateForm[i]['3. low']),
        close: Number(newDateForm[i]['4. close']),
      });
    }
    newDateFormArr = newDateFormArr.reverse();
    return newDateFormArr;
  }
}

import axios from "axios";
import { apiKey } from "../key";

export default class DetailStockService {
  static async getStockDaily(func, symbol) {
    const stockData = await axios.get(
      `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=1min&slice=year1month1&apikey=${apiKey}`
    );
    // console.log(stockData.data);
    return stockData.data;
  }
}



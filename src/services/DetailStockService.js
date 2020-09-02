import axios from "axios";
import {
  apiKey
} from "../key";

export default class DetailStockService {
  static async getStockDaily(func, symbol) {
    const stockData = await axios.get(
      `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=1min&apikey=${apiKey}`
    );

    return stockData.data;
  }
}
import axios from 'axios';
import {
  apiKey
} from '../key';


export default class SearchService {
  static async searchingStock(searchvalue) {
    const stockSymbols = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchvalue}&apikey=${apiKey}`);
    return stockSymbols.data;
  }
}
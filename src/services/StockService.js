import axios from 'axios';
import {
  apiKey
} from '../key';
import DataProcessingService from './DataProcessingService';
const DOW_ITEMS_SYMBOL = [
  'MMM',
  'IBM',
  'JPM',
  'AAPL',
  'GS',
  'NKE',
  'DOW',
  'MSFT',
  'MCD',
  'MRK',
];

const DOW_ITEMS_SYMBOL2 = [
  'VZ',
  'BA',
  'V',
  'CVX',
  'CSCO',
  'AXP',
  'XOM',
  'WMT',
  'DIS',
  'RTX',
]
const DOW_ITEMS_SYMBOL3 = [
  'UNH',
  'INTC',
  'WBA',
  'JNJ',
  'CAT',
  'KO',
  'TRV',
  'PG',
  'HD',
  'PFE',
]

export default class StockService {
  static async getStockIntra(func, symbol) {
    const stockData = await axios.get(
      `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=1min&apikey=${apiKey}`,
    );
    return stockData.data;
  }

  static async getDJIA() {
    let DJIAList = [];
    const getDjiaPromise = (symbol) => {
      return axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&interval=1min&apikey=${apiKey}`,
      );
    };

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
    const promDjia1 = DOW_ITEMS_SYMBOL.map((symbol) => getDjiaPromise(symbol));
    sleep(100)
    const promDjia2 = DOW_ITEMS_SYMBOL2.map((symbol) => getDjiaPromise(symbol));
    sleep(100)
    const promDjia3 = DOW_ITEMS_SYMBOL3.map((symbol) => getDjiaPromise(symbol));
    DJIAList = await Promise.all([...promDjia1, ...promDjia2, ...promDjia3]).then((result) => {
      return result.map((item) => item.data);
    });
    return DJIAList;
  }

  static async getSideBarStock(symbols) {
    const getSideBarStockPromise = (symbol) => {
      return axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`,
      );
    };
    const promGetSideBarStock = symbols.map((symbol) =>
      getSideBarStockPromise(symbol['1. symbol']),
    );
    let SideBarStocks = await Promise.all(promGetSideBarStock).then((result) =>
      result.map((item) => item.data),
    );

    SideBarStocks = SideBarStocks.filter(
      (stock) => stock['Meta Data'] !== undefined,
    );
    SideBarStocks = SideBarStocks.map((stock) =>
      DataProcessingService.DataProcessing(stock, 'Time Series (Daily)'),
    );

    return SideBarStocks;
  }

  static async getStockNow(stockNow) {
    const symbols = stockNow.map((item) => item.symbol);
    const getStockNowPromise = (symbol) => {
      return axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
      );
    };
    const promGetStockNow = symbols.map((symbol) => getStockNowPromise(symbol));
    const stocks = await Promise.all(promGetStockNow).then((result) =>
      result.map((item) => item.data),
    );

    const getStockInfoPromise = (symbol) => {
      return axios.get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`,
      );
    };
    const promGetStockInfo = symbols.map((symbol) =>
      getStockInfoPromise(symbol),
    );
    const info = await Promise.all(promGetStockInfo).then((result) =>
      result.map((item) => item.data),
    );

    const stockList = stockNow.map((stock, i) => ({
      ...stock,
      name: info[i].Name,
      price: stocks[i]['Global Quote']['05. price'],
      change: stocks[i]['Global Quote']['10. change percent'],
    }));
    return stockList;
  }
}
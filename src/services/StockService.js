import axios from 'axios';
import {
  store
} from '../index'
import {
  apiKey
} from '../key';
import DataProcessingService from './DataProcessingService';
// const DOW_ITEMS_SYMBOL = [
//   'MMM',
//   'IBM',
//   'JPM',
//   'AAPL',
//   'GS',

// ];
// const DOW_ITEMS_SYMBOL11 = [
//   'NKE',
//   'DOW',
//   'MSFT',
//   'MCD',
//   'MRK',
// ];

// const DOW_ITEMS_SYMBOL2 = [
//   'VZ',
//   'BA',
//   'V',
//   'CVX',
//   'CSCO',

// ]

// const DOW_ITEMS_SYMBOL22 = [
//   'AXP',
//   'XOM',
//   'WMT',
//   'DIS',
//   'RTX',
// ]
// const DOW_ITEMS_SYMBOL3 = [
//   'UNH',
//   'INTC',
//   'WBA',
//   'JNJ',
//   'CAT',
// ]
// const DOW_ITEMS_SYMBOL33 = [
//   'KO',
//   'TRV',
//   'PG',
//   'HD',
//   'PFE',
// ]

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
];

export default class StockService {
  static async getStockIntra(func, symbol) {
    const stockData = await axios.get(
      `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=1min&apikey=${apiKey}`,
    );
    return stockData.data;
  }

  static async getDJIA() {
    localStorage.setItem('count', 0);
    let DJIAList = [];
    const getDjiaPromise = (symbol) => {
      return axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&interval=1min&apikey=${apiKey}`,
      ).then(result => {
        store.dispatch({
          type: "GET_DJIA_PROGRESS"
        })
        return result
      })
    };


    // const promDjia1 = DOW_ITEMS_SYMBOL.map((symbol) => getDjiaPromise(symbol));
    // const promDjia11 = DOW_ITEMS_SYMBOL11.map((symbol) => getDjiaPromise(symbol));
    // const promDjia2 = DOW_ITEMS_SYMBOL2.map((symbol) => getDjiaPromise(symbol));
    // const promDjia22 = DOW_ITEMS_SYMBOL22.map((symbol) => getDjiaPromise(symbol));
    // const promDjia3 = DOW_ITEMS_SYMBOL3.map((symbol) => getDjiaPromise(symbol));
    // const promDjia33 = DOW_ITEMS_SYMBOL33.map((symbol) => getDjiaPromise(symbol));
    const promDjia = DOW_ITEMS_SYMBOL.map((symbol) => getDjiaPromise(symbol));

    // DJIAList = await Promise.all([...promDjia1, ...promDjia2, ...promDjia3, ...promDjia11, ...promDjia22, ...promDjia33]).then((result) => {
    //   return result.map((item) => item.data);
    // });
    DJIAList = await Promise.all(promDjia).then((result) => {
      return result.map((item) => {

        return item.data
      });
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
      price: (+stocks[i]['Global Quote']['05. price']).toFixed(2),
      change: (stocks[i]['Global Quote']['10. change percent'])
    }));
    return stockList;
  }
}
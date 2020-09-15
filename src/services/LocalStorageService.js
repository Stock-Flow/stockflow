export default class LocalStorageService {
  static getItem(keyword) {
    return JSON.parse(localStorage.getItem(keyword))
  }
  static setItem(keyword, item) {
    localStorage.setItem(keyword, JSON.stringify(item));
  }

  static getDjia(date) {
    const DJIAList = JSON.parse(localStorage.getItem('djia'));
    console.log('a', +DJIAList[0].stockData[99].time.slice(-2), date)
    if (!DJIAList) return null;
    if (!DJIAList.length) return null;
    if (DJIAList.length !== 30) return null;
    if (!(DJIAList[0].symbol && DJIAList[0].stockData)) return null;
    if (+DJIAList[0].stockData[99].time.slice(-2) !== date - 1) return null;
    return DJIAList;
  }

  static getDetailStock(symbol, date) {
    const detailStock = JSON.parse(localStorage.getItem(symbol));
    if (!detailStock) return null;
    if (!(detailStock.stock && detailStock.indicator && detailStock.volume && detailStock.indicator)) return null;
    if (+detailStock.stock[detailStock.stock.length - 1].time.day !== date - 1) return null;
    return detailStock;
  }

  static getDetailCurrency(symbol, date) {
    const detailCurrency = JSON.parse(localStorage.getItem(symbol));
    if (!detailCurrency) return null;
    if (!(detailCurrency.currency && detailCurrency.indicator && detailCurrency.volume && detailCurrency.indicator)) return null;
    if (+detailCurrency.currency[detailCurrency.currency.length - 1].time.day !== date - 1) return null;
    return detailCurrency;
  }
}
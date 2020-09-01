import {
  concatSeries
} from "async";
const DOW_DIVISOR = 0.14748071991788;
export default class DataProcessingService {
  static DataProcessing(data, func) {
    const ProcessedData = {
      symbol: data["Meta Data"]["2. Symbol"],
      stockData: data[func]
    }

    return ProcessedData;
  }

  static SearchDataProcessing(data) {
    console.log(data);
    const ProcessedData = data.bestMatches.map(match => match["1. symbol"]);
    return ProcessedData;
  }

  static MakeValueArray(data, func) {
    return Object.values(data.stockData).reverse().map(item => item[func]);
  }

  static GraphDataProcessing(data) {
    const date = Object.keys(data.stockData).reverse();
    const open = DataProcessingService.MakeValueArray(data, "1. open")
    const high = DataProcessingService.MakeValueArray(data, "2. high")
    const low = DataProcessingService.MakeValueArray(data, "3. low")
    const close = DataProcessingService.MakeValueArray(data, "4. close")

    return date.map((item, i) => {
      return {
        time: item,
        open: open[i],
        high: high[i],
        low: low[i],
        close: close[i]
      }
    })
  }

  static GetDJiaProcessing(data) {
    const djia = [];

    for (let i = 0; i < data.length; i++) {
      djia.push(data[i] / DOW_DIVISOR);
      djia[i] = +djia[i].toFixed(2);
    }

    return djia
  }
}
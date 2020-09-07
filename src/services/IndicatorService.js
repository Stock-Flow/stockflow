import axios from 'axios'
import {
  apiKey
} from '../key'
import DataProcessingService from './DataProcessingService'

// [SMI, VWAP, MACD, STOCH, RSI, ADX, CCI, AROON, BBANDS, AD, OBV]
const indicatorSymbols = ["RSI", "BBANDS"]
export default class IndicatorService {
  static async getIndicator(symbol) {
    console.log(symbol);
    const indicatorsApi = [
      `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=daily&time_period=14&series_type=open&apikey=${apiKey}`,
      `https://www.alphavantage.co/query?function=BBANDS&symbol=${symbol}&interval=daily&time_period=20&series_type=close&apikey=${apiKey}`,
    ]
    const getindicatorPromise = api => {
      return axios.get(api)
    }
    const promIndicator = indicatorsApi.map(api => getindicatorPromise(api));
    let indicators = await Promise.all(promIndicator)
      .then(result => result.map(item => item.data))
    console.log(indicators);
    indicators = indicators.map((indicator, i) => DataProcessingService.IndicatorsProcessing(indicator, indicatorSymbols[i]));
    return indicators;
  }
}
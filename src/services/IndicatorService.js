import axios from 'axios'
import {
  apiKey
} from '../key'
import DataProcessingService from './DataProcessingService'
// [SMI, VWAP, MACD, STOCH, RSI, ADX, CCI, AROON, BBANDS, AD, OBV]

export default class IndicatorService {
  static async getIndicator(symbol) {
    const indicatorsApi = [
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=5&series_type=close&apikey=${apiKey}`,
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=10&series_type=close&apikey=${apiKey}`,
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=20&series_type=close&apikey=${apiKey}`,
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=60&series_type=close&apikey=${apiKey}`,
    ]
    const getindicatorPromise = api => {
      return axios.get(api)
    }
    const promIndicator = indicatorsApi.map(api => getindicatorPromise(api));
    let indicators = await Promise.all(promIndicator)
      .then(result => result.map(item => item.data))

    indicators = indicators.map(indicator => DataProcessingService.IndicatorsProcessing(indicator));
    return indicators;
  }
}
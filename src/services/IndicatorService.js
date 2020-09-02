import axios from 'axios'
import {
  apiKey
} from '../key'


export default class IndicatorService {
  static async getIndicator(indicatorSymbol) {
    // const indicatorSymbols = {
    //   SMI : `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=${interval}&time_period=${time_period}&series_type=${series_type}&apikey=${apiKey}`,
    //   EMA : `https://www.alphavantage.co/query?function=EMA&symbol=${symbol}&interval=${interval}&time_period=${time_period}&series_type=${series_type}&apikey=${apiKey}`, 
    //   VWAP : `https://www.alphavantage.co/query?function=VWAP&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`,
    //   MACD : `https://www.alphavantage.co/query?function=MACD&symbol=${symbol}&interval=${interval}&series_type=${series_type}&apikey=${apiKey}`,
    //   STOCH : `https://www.alphavantage.co/query?function=STOCH&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`,
    //   RSI : `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=${interval}&time_period=${time_period}&series_type=${series_type}&apikey=${apiKey}`,
    //   ADX : `https://www.alphavantage.co/query?function=ADX&symbol=${symbol}&interval=${interval}&time_period=${time_period}&apikey=${apiKey}`,
    //   CCI : `https://www.alphavantage.co/query?function=CCI&symbol=${symbol}&interval=${interval}&time_period=${time_period}&apikey=${apiKey}`,
    //   AROON : `https://www.alphavantage.co/query?function=AROON&symbol=${symbol}&interval=${interval}&time_period=${time_period}&apikey=${apiKey}`,
    //   BBANDS : `https://www.alphavantage.co/query?function=BBANDS&symbol=${symbol}&interval=${interval}&time_period=${time_period}&series_type=close&nbdevup=3&nbdevdn=3&apikey=${apiKey}`,
    //   AD : `https://www.alphavantage.co/query?function=AD&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`,
    //   OBV : `https://www.alphavantage.co/query?function=OBV&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`,
    // }
    const promGetIndicator = await axios.get(`https://www.alphavantage.co/query?function=SMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=${apiKey}`)
    const indicator = await promGetIndicator.data;
    
    return indicator;
  }
}
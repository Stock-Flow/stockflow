import axios from 'axios'
import {
  apiKey
} from '../key'

const simbols = ['ABT',  'AC',  'ACT',  'ADA',  'ADT',  'ADX',  'AEON',  'AGI',  'AGRS', 'AI',  'AID',  'AION',  'AIR',  'AKY']


export default class digitalCurrencyService {
  static async getSideBarDigitalCurrency(symbols) {
    const market = 'KRW'
    const getSideBarDigitalCurrencyPromise = symbol => {
      return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=1min&apikey=${apiKey}`)
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${market}&apikey=${apiKey}`
    }
    const promGetSideBarDigitalCurrency = symbols.map(symbol => getSideBarDigitalCurrencyPromise(symbol));
    const SideBarDigitalCurrencys = await Promise.all(promGetSideBarDigitalCurrency)
      .then(result => result.map(item => item.data))

    return SideBarDigitalCurrencys
  }
}
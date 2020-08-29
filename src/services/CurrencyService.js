import axios from 'axios'
import {
  apiKey
} from '../key'

const symbols = ['ABT', 'AC',  'ACT',  'ADA',  'ADT',  'ADX',  'AEON',  'AGI',  'AGRS', 'AI',  'AID',  'AION',  'AIR',  'AKY']


export default class currencyService {
  static async getSideBarCurrency() {
    const market = 'USD'
    const getSideBarCurrencyPromise = symbol => {
      return axios.get( `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${market}&apikey=${apiKey}`)
     
    }
    const promGetSideBarCurrency = symbols.map(symbol => getSideBarCurrencyPromise(symbol));
    /////////////////////////////////////
    const sideBarCurrencys = await Promise.all(promGetSideBarCurrency)
      .then(result => result.map(item => item.data))

    return sideBarCurrencys
  }
}
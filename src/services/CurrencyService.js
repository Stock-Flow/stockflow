import axios from 'axios'
import {
  apiKey
} from '../key'
import DataProcessingService from './DataProcessingService'

// const symbols = ['ADA','AION','ANT','ARDR','BAT','BCC','BCH','BLZ','BNB','BNT']
const key = '619d698817a4aaee6678160ef99c0898946c1e24372fe8df4cde97b6d1dcf85d'
// ,'BTC','BTS','BUSD','CTXC','CVC','DAI','DASH','DATA','DCR','DENT','DGB','ENJ','EOS','ETC','ETH','FUN','GTO','GXS','ICX','IOST','IOTA','IOTX','KMD','KNC','LEND','LINK','LRC','LSK','LTC','MANA','MCO','MITH','MKR','NANO','NEO','NMR','NPXS','NULS','OMG','ONT','QTUM','REP','RLC','SC','SNX','STORJ','STORM','STRAT','STX','THETA','TRX','TUSD','VEN','WAN','WAVES','WTC','XLM','XMR','XRP','XTZ','XZC','ZEC','ZEN','ZIL','ZRX'
const symbols = ['ADA', 'AION', 'ANT', 'ARDR', 'BAT', 'BTC', 'BCH', 'BLZ', 'XRP', 'XTZ', 'XZC', 'ZEC', 'ZEN', 'ZIL', 'ZRX']

export default class currencyService {
  static async getSideBarCurrency() {
    const market = 'USD'
    const getSideBarCurrencyPromise = symbol => {
      return axios.get(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${market}&apikey=${apiKey}`)
    }
    const promGetSideBarCurrency = symbols.map(symbol => getSideBarCurrencyPromise(symbol));
    let sideBarCurrencys = await Promise.all(promGetSideBarCurrency)
      .then(result => result.map(item => item.data))
    return sideBarCurrencys
  }

  static async getData() {
    const a = await axios.get(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=100&api_key=${key}`)
    console.log(a);
  }
}
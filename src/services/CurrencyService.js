import axios from 'axios'
import {
  apiKey
} from '../key'

// const symbols = ['ADA','AION','ANT','ARDR','BAT','BCC','BCH','BLZ','BNB','BNT']

// ,'BTC','BTS','BUSD','CTXC','CVC','DAI','DASH','DATA','DCR','DENT','DGB','ENJ','EOS','ETC','ETH','FUN','GTO','GXS','ICX','IOST','IOTA','IOTX','KMD','KNC','LEND','LINK','LRC','LSK','LTC','MANA','MCO','MITH','MKR','NANO','NEO','NMR','NPXS','NULS','OMG','ONT','QTUM','REP','RLC','SC','SNX','STORJ','STORM','STRAT','STX','THETA','TRX','TUSD','VEN','WAN','WAVES','WTC','XLM','XMR','XRP','XTZ','XZC','ZEC','ZEN','ZIL','ZRX'
const symbols = ['ADA', 'AION', 'ANT', 'ARDR', 'BAT', 'BCC', 'BCH', 'BLZ', 'XRP', 'XTZ', 'XZC', 'ZEC', 'ZEN', 'ZIL', 'ZRX']

export default class currencyService {
  static async getSideBarCurrency() {
    const market = 'USD'
    const getSideBarCurrencyPromise = symbol => {
      return axios.get(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${market}&apikey=${apiKey}`)
    }
    const promGetSideBarCurrency = symbols.map(symbol => getSideBarCurrencyPromise(symbol));
    const sideBarCurrencys = await Promise.all(promGetSideBarCurrency)
      .then(result => result.map(item => item.data))
    return sideBarCurrencys
  }
}
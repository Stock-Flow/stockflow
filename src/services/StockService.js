import axios from 'axios'



export default class StockService {
  static async getStockIntra(func, symbol) {
    const stockData = await axios.get(`https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=1min&apikey=${apiKey}`)
    return stockData.data
  }

}
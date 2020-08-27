export default class DataProcessingService {
  static DataProcessing(data, func) {
    const ProcessedData = {
      symbol: data["Meta Data"]["2. Symbol"],
      stockData: data[func]
    }

    return ProcessedData;
  }
}
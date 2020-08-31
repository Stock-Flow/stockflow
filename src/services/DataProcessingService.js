import {
  concatSeries
} from "async";

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
}
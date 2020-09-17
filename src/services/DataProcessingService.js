const DOW_DIVISOR = 0.14748071991788;
export default class DataProcessingService {
  static DataProcessing(data, func) {
    const ProcessedData = {
      symbol: data['Meta Data']['2. Symbol'],
      stockData: data[func],
    };

    return ProcessedData;
  }
  static CurrencyDataProcessing(data, func) {
    const ProcessedData = {
      symbol: data['Meta Data']['2. Digital Currency Code'],
      currencyData: data[func],
    };

    return ProcessedData;
  }

  static SearchDataProcessing(data) {
    const ProcessedData = data.bestMatches.map((match) => match['1. symbol']);
    return ProcessedData;
  }

  static MakeValueArray(data, func) {
    return Object.values(data.stockData)
      .reverse()
      .map((item) => item[func]);
  }
  static MakeCurrencyValueArray(data, func) {
    return Object.values(data.currencyData)
      .reverse()
      .map((item) => item[func]);
  }

  static GraphDataProcessing(data) {
    const date = Object.keys(data.stockData).reverse();
    const open = DataProcessingService.MakeValueArray(data, '1. open');
    const high = DataProcessingService.MakeValueArray(data, '2. high');
    const low = DataProcessingService.MakeValueArray(data, '3. low');
    const close = DataProcessingService.MakeValueArray(data, '4. close');
    const volume = DataProcessingService.MakeValueArray(data, '6. volume');
    return date.map((item, i) => {
      return {
        time: item,
        open: open[i],
        high: high[i],
        low: low[i],
        close: close[i],
        volume: volume[i],
      };
    });
  }
  static sidebarGraphDataProcessing(data) {
    const date = Object.keys(data.stockData).reverse();
    const open = DataProcessingService.MakeValueArray(data, '1. open');
    const volume = DataProcessingService.MakeValueArray(data, '6. volume');

    return date.map((item, i) => {
      return {
        time: item,
        open: open[i],
        volume: volume[i],
      };
    });
  }
  static CurrencyGraphDataProcessing(data) {
    const date = Object.keys(data.currencyData).reverse();
    const open = DataProcessingService.MakeCurrencyValueArray(
      data,
      '1a. open (USD)',
    );
    const high = DataProcessingService.MakeCurrencyValueArray(
      data,
      '2a. high (USD)',
    );
    const low = DataProcessingService.MakeCurrencyValueArray(
      data,
      '3a. low (USD)',
    );
    const close = DataProcessingService.MakeCurrencyValueArray(
      data,
      '4a. close (USD)',
    );

    return date.map((item, i) => {
      return {
        time: item,
        open: open[i],
        high: high[i],
        low: low[i],
        close: close[i],
      };
    });
  }

  static GetDJiaProcessing(data) {
    const djia = [];

    for (let i = 0; i < data.length; i++) {
      djia.push(data[i] / DOW_DIVISOR);
      djia[i] = +djia[i].toFixed(2);
    }
    return djia;
  }

  static AdjustSplit(data) {
    let processedData = data;
    for (let i = 0; i < data.length; i++) {
      const date = Object.keys(data[i].stockData);
      let split = 0;
      for (let j = 0; j < Object.keys(data[i].stockData).length; j++) {
        if (split !== 0) {
          processedData[i].stockData[date[j]]['1. open'] /= split;
          processedData[i].stockData[date[j]]['2. high'] /= split;
          processedData[i].stockData[date[j]]['3. low'] /= split;
          processedData[i].stockData[date[j]]['4. close'] /= split;
        }
        if (data[i].stockData[date[j]]['8. split coefficient'] !== '1.0000') {
          split = +data[i].stockData[date[j]]['8. split coefficient'];
        }
      }
    }
    return processedData;
  }
  static AdjustSplitSingle(data) {
    let processedData = data;
    const date = Object.keys(data.stockData);
    let split = 0;
    for (let j = 0; j < Object.keys(data.stockData).length; j++) {
      if (split !== 0) {
        processedData.stockData[date[j]]['1. open'] /= split;
        processedData.stockData[date[j]]['2. high'] /= split;
        processedData.stockData[date[j]]['3. low'] /= split;
        processedData.stockData[date[j]]['4. close'] /= split;
      }
      if (data.stockData[date[j]]['8. split coefficient'] !== '1.0000') {
        split = +data.stockData[date[j]]['8. split coefficient'];
      }
    }

    return processedData;
  }

  static IndicatorsProcessing(data, symbol) {
    if (symbol === 'BBANDS') {
      const date = Object.keys(data[`Technical Analysis: ${symbol}`]);
      const value = Object.values(data[`Technical Analysis: ${symbol}`]);
      const lowBBANDS = date.map((item, i) => {
        return {
          time: item,
          value: value[i]['Real Lower Band'],
        };
      });
      const middleBBANDS = date.map((item, i) => {
        return {
          time: item,
          value: value[i]['Real Middle Band'],
        };
      });
      const upBBANDS = date.map((item, i) => {
        return {
          time: item,
          value: value[i]['Real Upper Band'],
        };
      });
      return [lowBBANDS.reverse(), middleBBANDS.reverse(), upBBANDS.reverse()];
    }
    const date = Object.keys(data[`Technical Analysis: ${symbol}`]);
    const value = Object.values(data[`Technical Analysis: ${symbol}`]);
    const processedIndicators = date.map((item, i) => {
      return {
        time: item,
        value: value[i][symbol],
      };
    });

    return processedIndicators.reverse();
  }
}
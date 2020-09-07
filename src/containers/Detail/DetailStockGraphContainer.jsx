import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DetailStockGraph from '../../components/Detail/DetailStockGraph';
import { getDetailStockSagaActionCreator } from '../../redux/modules/detailStock';


export default function DetailStockGraphContainer({
  func = 'TIME_SERIES_DAILY_ADJUSTED',
  symbol = 'IBM',
}) {
  const loading = useSelector((state) => state.detailStock.loading);
  const stock = useSelector((state) => state.detailStock.stock);
  const indicators = useSelector((state) => state.detailStock.indicator)
  const volume = useSelector((state => state.detailStock.volume))

  const dispatch = useDispatch();
<<<<<<< HEAD
  const getDetailStock = useCallback(
    (func, symbol, date) => {
      dispatch(getDetailStockSagaActionCreator(func, symbol, date));
    },
    [dispatch],
  );

  const movingAverageFive = (stock) => {
    const movingAverage = [];
    for (let i = 0; i < stock.length; i += 5) {
=======
  const getDetailStock = useCallback((symbol) => {
    dispatch(
      getDetailStockSagaActionCreator(symbol),
    );
  }, [dispatch]);

  const movingAverageFive = (stock) => {
    const movingAverage = []
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - 5) {
        continue;
      }
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b
      let sum = 0;
      for (let j = 0; j < 5; j++) {
        sum += +stock[i + j].close;
      }
<<<<<<< HEAD
      movingAverage.push({ time: stock[i].time, value: sum / 5 });
    }
    movingAverage.push({
      time: stock[stock.length - 1].time,
      value: stock[stock.length - 1].close,
    });
    return movingAverage;
  };
  const movingAverageTen = (stock) => {
    const movingAverage = [];
    for (let i = 0; 10 * Math.trunc(stock.length / 10); i += 10) {
      let sum = 0;
      for (let j = 0; j < 10; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i].time, value: sum / 10 });
    }
    movingAverage.push({
      time: stock[stock.length - 1].time,
      value: stock[stock.length - 1].close,
    });
    return movingAverage;
  };
  const movingAverageTwenty = (stock) => {
    const movingAverage = [];
    for (let i = 0; i < 20 * Math.trunc(stock.length / 20); i += 20) {
      let sum = 0;
      for (let j = 0; j < 20; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i].time, value: sum / 20 });
    }
    movingAverage.push({
      time: stock[stock.length - 1].time,
      value: stock[stock.length - 1].close,
    });
    return movingAverage;
  };
  const movingAverageSixty = (stock) => {
    const movingAverage = [];
    for (let i = 0; i < 60 * Math.trunc(stock.length / 60); i += 60) {
      let sum = 0;
      for (let j = 0; j < 60; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i].time, value: sum / 60 });
    }
    movingAverage.push({
      time: stock[stock.length - 1].time,
      value: stock[stock.length - 1].close,
    });
    return movingAverage;
  };
  // function dailyBtnClick(func, symbol) {
  //   setDate('Time Series (Daily)');
  //   func = 'TIME_SERIES_DAILY';
  //   symbol = 'IBM';
  //   dispatch(
  //     getDetailStockSagaActionCreator(func, symbol, 'Time Series (Daily)'),
  //   );
  // }
  // function weeklyBtnClick(func, symbol) {
  //   setDate('Weekly Time Series');
  //   func = 'TIME_SERIES_WEEKLY_ADJUSTED';
  //   symbol = 'IBM';
  //   dispatch(
  //     getDetailStockSagaActionCreator(func, symbol, 'Weekly Adjusted Time Series'),
  //   );
  // }
  // function monthlyBtnClick(func, symbol) {
  //   setDate('Monthly Time Series');
  //   func = 'TIME_SERIES_MONTHLY_ADJUSTED';
  //   symbol = 'IBM';
  //   dispatch(
  //     getDetailStockSagaActionCreator(func, symbol, 'Monthly Adjusted Time Series'),
  //   );

  // }

  // console.log(useSelector((state) => state));

=======
      movingAverage.push({ time: stock[i + 4].time, value: sum / 5 })
    }
    return movingAverage.reverse();
  }
  const movingAverageTwenty = (stock) => {
    const movingAverage = []
    for (let i = stock.length - 1; i >= 0; i--) {
      let sum = 0;
      if (i > stock.length - 20) {
        continue;
      }
      for (let j = 0; j < 20; j++) {
        sum += +stock[i + j].close

      }
      movingAverage.push({ time: stock[i + 19].time, value: sum / 20 })
    }

    return movingAverage.reverse();
  }
  const movingAverageSixty = (stock) => {
    const movingAverage = []
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - 60) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < 60; j++) {
        sum += +stock[i + j].close

      }
      movingAverage.push({ time: stock[i + 59].time, value: sum / 60 })
    }
    return movingAverage.reverse();
  }
  const movingAverageHundredTwenty = (stock) => {
    const movingAverage = []
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - 120) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < 120; j++) {
        sum += +stock[i + j].close

      }
      movingAverage.push({ time: stock[i + 119].time, value: sum / 120 })
    }
    return movingAverage.reverse();
  }

  const rsiSignal = (rsi) => {
    const rsiSignal = []
    for (let i = rsi.length - 1; i >= 0; i--) {
      if (i > rsi.length - 6) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < 6; j++) {
        sum += +rsi[i + j].value

      }
      rsiSignal.push({ time: rsi[i + 5].time, value: +(sum / 6).toFixed(2) })
    }

    return rsiSignal.reverse()
  }

>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b
  return (
    <DetailStockGraph
      getDetailStock={getDetailStock}
      movingAverageFive={movingAverageFive}
      movingAverageTwenty={movingAverageTwenty}
      movingAverageSixty={movingAverageSixty}
      movingAverageHundredTwenty={movingAverageHundredTwenty}
      rsiSignal={rsiSignal}
      indicators={indicators}
      loading={loading}
      stock={stock}
      volume={volume}

      symbol={symbol}
    />
  );
}

export default class GraphService {
  static graphColor(chart, color, graph, data, windowWidth) {
    if (windowWidth >= 1200) {
      chart.resize(windowWidth * 0.72 - 100, 200);
    } else {
      chart.resize(windowWidth * 0.72, 200);
    }
    graph.current = chart.addLineSeries({
      color: color
    });
    graph.current.setData(data)

    chart.timeScale().setVisibleLogicalRange({
      from: data.length - 60,
      to: data.length,
    });
  }
  static setHistogramGraph(chart, color, graph, data, windowWidth) {
    if (windowWidth >= 1200) {
      chart.resize(windowWidth * 0.72 - 100, 200);
    } else {
      chart.resize(windowWidth * 0.72, 200);
    }
    graph.current = chart.addHistogramSeries({
      color: color,
      base: 0
    });
    graph.current.setData(data)

    chart.timeScale().setVisibleLogicalRange({
      from: data.length - 60,
      to: data.length,
    });
  }
}
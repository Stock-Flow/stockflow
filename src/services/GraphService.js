export default class GraphService {
  static graphColor(chart, color, graph, data) {
    chart.resize(800, 200);
    graph.current = chart.addLineSeries({
      color: color
    });
    graph.current.setData(data)

    chart.timeScale().setVisibleLogicalRange({
      from: data.length - 60,
      to: data.length,
    });
  }
  static setHistogramGraph(chart, color, graph, data) {
    chart.resize(800, 200);
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
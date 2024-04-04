// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = {
  height: 480,
  type: "bar",
  options: {
    chart: {
      id: "bar-chart",
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Até 30 Dias",
        "De 61 a 90 Dias",
        "De 181 a 365 Dias",
        "De 1 a 2 Anos",
        "De 2 a 3 Anos",
        "Mais de 3 Anos",
      ],
    },
    legend: {
      show: true,
      fontSize: "14px",
      fontFamily: "'Roboto', sans-serif",
      position: "bottom",
      offsetX: 20,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
    fill: {
      type: "solid",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
  },
  series: [
    {
      name: "Investment",
      data: [9000, 6000, 3000, 30000, 35, 12000],
    },
    {
      name: "Loss",
      data: [400, 4000, 500, 15000, 65, 5000],
    },
    {
      name: "Profit",
      data: [400, 0, 35, 700, 0, 900],
    },
  ],
};
export default chartData;

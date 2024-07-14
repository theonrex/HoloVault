import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler,
} from "chart.js";

//  necessary components for Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler
);

export default function SolChart({ solanaData }) {
  const prices = solanaData.data.market_data.sparkline_7d.price;

  const last7DaysPrices = prices.slice(-7);
  const labels = last7DaysPrices.map((_, index) => `Day ${7 - index}`);

  //  data for Chart.js
  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "Price over Last 7 Days",
        data: last7DaysPrices.reverse(),
        fill: true,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(144, 238, 144, 0.2)",
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Price: $${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
        ticks: {
          callback: function (value) {
            return `$${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 class="text-3xl font-bold text-white-800 mb-4">
        Solana Price Chart (Last 7 Days)
      </h2>
      <Line data={data} options={options} />
    </div>
  );
}

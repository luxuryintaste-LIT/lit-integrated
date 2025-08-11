import React from "react";
import { Line } from "react-chartjs-2";
import "./SalesAnalyticsChart.css";

const SalesAnalyticsChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 10, 25, 32, 28, 40],
        borderColor: "#A855F7",
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { beginAtZero: true },
      },
    },
  };

  return (
    <div className="sales-analytics card">
      <h3>Sales Analytics</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesAnalyticsChart;

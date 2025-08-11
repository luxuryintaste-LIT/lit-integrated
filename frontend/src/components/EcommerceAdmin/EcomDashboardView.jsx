import React from "react";
import { FaDollarSign, FaShoppingCart, FaUsers, FaChartLine } from "react-icons/fa";
import { Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./EcomDashboardView.css";

const EcomDashboardView = () => {
  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 2500, 3200, 4000, 3700],
        borderColor: "#9b5cff",
        backgroundColor: "rgba(155, 92, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const targetData = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        data: [78, 22],
        backgroundColor: ["#9b5cff", "#2e1a47"],
        borderWidth: 0,
      },
    ],
  };

  const topProducts = [
    { id: 1, name: "Graphic T-shirt", sales: 320, image: "https://via.placeholder.com/80?text=T-shirt" },
    { id: 2, name: "Leather Handbag", sales: 275, image: "https://via.placeholder.com/80?text=Handbag" },
    { id: 3, name: "Sporty Smartwatch", sales: 150, image: "https://via.placeholder.com/80?text=Watch" },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title"></h2>
      <div className="cards-grid">
        <div className="card">
          <FaDollarSign className="card-icon" />
          <h3>$445,230</h3>
          <p>Total Sales</p>
        </div>
        <div className="card">
          <FaShoppingCart className="card-icon" />
          <h3>1,280</h3>
          <p>Orders</p>
        </div>
        <div className="card">
          <FaUsers className="card-icon" />
          <h3>865</h3>
          <p>Customers</p>
        </div>
        <div className="card">
          <FaChartLine className="card-icon" />
          <h3>78%</h3>
          <p>Growth</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Sales Analytics</h3>
          <Line data={salesData} />
        </div>
        <div className="chart-card">
          <h3>Sales Target</h3>
          <Doughnut data={targetData} />
          <p className="target-text">Goal reached this month!</p>
        </div>
      </div>

      <div className="top-products">
        <h3>Top Selling Products</h3>
        <div className="products-grid">
          {topProducts.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              <p>{p.name}</p>
              <span>{p.sales} sold</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcomDashboardView;

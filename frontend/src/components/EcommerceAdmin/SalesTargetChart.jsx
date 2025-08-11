import React from "react";
import "./SalesTargetChart.css";

const SalesTargetChart = () => {
  return (
    <div className="sales-target card-glass">
      <h3>Sales Target</h3>
      <div className="progress-ring">
        <div className="progress-text">78%</div>
      </div>
      <p>Goal reached this month!</p>
    </div>
  );
};

export default SalesTargetChart;

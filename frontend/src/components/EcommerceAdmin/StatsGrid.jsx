import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';
import './StatsGrid.css';

const statsData = [
  { id: 1, label: 'Total Sales', value: 445230, icon: <FaDollarSign /> },
  { id: 2, label: 'Orders', value: 1280, icon: <FaShoppingCart /> },
  { id: 3, label: 'Customers', value: 865, icon: <FaUsers /> },
  { id: 4, label: 'Growth', value: '78%', icon: <FaChartLine /> }
];

const StatsGrid = () => {
  const [animatedValues, setAnimatedValues] = useState(statsData.map(() => 0));

  useEffect(() => {
    const duration = 1500;
    const start = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);

      setAnimatedValues(statsData.map(stat => {
        if (typeof stat.value === 'number') {
          return Math.floor(stat.value * progress);
        }
        return stat.value;
      }));

      if (progress < 1) requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="stats-grid">
      {statsData.map((stat, idx) => (
        <div key={stat.id} className="stat-card">
          <div className="icon">{stat.icon}</div>
          <div className="stat-info">
            <h3>
              {typeof animatedValues[idx] === 'number'
                ? animatedValues[idx].toLocaleString()
                : animatedValues[idx]}
            </h3>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;

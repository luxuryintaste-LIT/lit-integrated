// C:\lit-integrated\frontend\src\components\EcommerceAdmin\EcomDashboardView.jsx

import React from 'react';
import { FaDollarSign, FaShoppingCart, FaUsers, FaBox } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './EcomDashboardView.css';

// --- Child Component Contents ---
const StatCardContent = ({ icon, label, value, growth }) => {
  return (
    <>
      <div className="stat-card-header">
        <div className="stat-icon-wrapper">{icon}</div>
        <p className="stat-label">{label}</p>
      </div>
      <div className="stat-card-body">
        <h3>{value}</h3>
        <span className={`stat-growth ${growth.startsWith('+') ? 'positive' : 'negative'}`}>{growth}</span>
      </div>
    </>
  );
};

const SalesAnalyticContent = () => {
  const data = { labels: ["21 Jul", "22 Jul", "23 Jul", "24 Jul", "25 Jul", "26 Jul", "27 Jul"], datasets: [{ data: [12000, 19000, 15000, 25000, 22000, 32000, 28000], borderColor: "#a78bfa", backgroundColor: "rgba(167, 139, 250, 0.2)", fill: true, tension: 0.4, pointBackgroundColor: '#a78bfa', pointBorderColor: '#fff', pointHoverRadius: 7 }] };
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#b0a0ca' }, grid: { display: false } }, y: { ticks: { color: '#b0a0ca' }, grid: { color: 'rgba(255, 255, 250, 0.1)' } } } };
  return (<><div className="card-header"><h4>Sales Analytic</h4><select className="date-filter"><option>Jul 2023</option></select></div><div className="analytic-metrics"><div className="metric-item"><span>Total Income</span><p>$23,262.00</p></div><div className="metric-item"><span>Total Expense</span><p>$11,135.00</p></div><div className="metric-item"><span>Total Profit</span><p>$48,135.00</p></div></div><div className="chart-container"><Line data={data} options={options} /></div></>);
};

const SalesTargetContent = () => {
    const percentage = 78;
    const centerTextPlugin = { id: 'centerText', afterDraw: (chart) => { const ctx = chart.ctx; const { width, height } = chart.chartArea; ctx.restore(); ctx.font = "bold 2rem sans-serif"; ctx.fillStyle = "#e2b3ff"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(`${percentage}%`, width / 2, height / 2 - 10); ctx.font = "500 0.9rem sans-serif"; ctx.fillStyle = "#b0a0ca"; ctx.fillText("Achieved", width / 2, height / 2 + 20); ctx.save(); } };
    const data = { labels: ["Achieved", "Remaining"], datasets: [{ data: [percentage, 100 - percentage], backgroundColor: ["#8b5cf6", "transparent"], borderColor: "transparent", cutout: '80%', borderRadius: 20 }, { data: [100], backgroundColor: ["rgba(139, 92, 246, 0.1)"], borderColor: "transparent", cutout: '80%' }] };
    const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } };
    return (<><div className="card-header"><h4>Sales Target</h4></div><div className="doughnut-container"><Doughnut data={data} options={options} plugins={[centerTextPlugin]} /></div><div className="target-labels"><div className="target-label-item"><span className="dot daily"></span><div><p>Daily Target</p><span>$850</span></div></div><div className="target-label-item"><span className="dot monthly"></span><div><p>Monthly Target</p><span>$145,00</span></div></div></div></>);
};

const TopSellingProductsContent = () => {
  const products = [{ name: "Air Jordan 8", sales: "752 Pcs", img: "https://picsum.photos/id/211/100" }, { name: "Air Jordan 5", sales: "680 Pcs", img: "https://picsum.photos/id/101/100" }, { name: "Air Jordan 13", sales: "512 Pcs", img: "https://picsum.photos/id/122/100" }];
  return (
    <>
      <div className="card-header">
        <h4>Top Selling Products</h4>
      </div>
      <div className="top-products-grid">
        {products.map(p => (
          <div className="top-product-card" key={p.name}>
            <div className="img-wrapper">
              <img src={p.img} alt={p.name} />
            </div>
            <p className="name">{p.name}</p>
            <p className="sales">{p.sales}</p>
          </div>
        ))}
      </div>
    </>
  );
};

const CurrentOfferContent = () => (
    <><div className="card-header"><h4>Current Offer</h4></div><div className="offer-list"><div className="offer-item"><p>40% Discount Offer</p><span>Expires in: 05:45 h</span></div><div className="offer-item"><p>100 Take Coupon</p><span>Expires in: 10:45 h</span></div><div className="offer-item disabled"><p>Stock Out Set</p><span>Upcoming on: 15-08-25</span></div></div></>
);

// --- Main Dashboard Component ---
const EcomDashboardView = () => {
  return (
    <div className="dashboard-view-container">
      <div className="dashboard-header">
        <h3>Overview</h3>
      </div>
      <div className="dashboard-layout-grid">
        <div className="dashboard-card stat-card revenue"><StatCardContent icon={<FaDollarSign />} label="Total Revenue" value="$82,650" growth="+2.5%" /></div>
        <div className="dashboard-card stat-card order"><StatCardContent icon={<FaShoppingCart />} label="Total Order" value="1,645" growth="+5.2%" /></div>
        <div className="dashboard-card stat-card customer"><StatCardContent icon={<FaUsers />} label="Total Customer" value="1,462" growth="+0.5%" /></div>
        <div className="dashboard-card stat-card delivery"><StatCardContent icon={<FaBox />} label="Pending Delivery" value="117" growth="-1.2%" /></div>

        <div className="dashboard-card" id="sales-analytic"><SalesAnalyticContent /></div>
        <div className="dashboard-card" id="sales-target"><SalesTargetContent /></div>
        <div className="dashboard-card" id="top-products"><TopSellingProductsContent /></div>
        <div className="dashboard-card" id="current-offer"><CurrentOfferContent /></div>
      </div>
    </div>
  );
};

export default EcomDashboardView;
import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

// Example usage: <Breadcrumbs crumbs={[{ name: 'Home', link: '/' }, { name: 'Shirts', link: '/products/shirts' }, { name: 'Cool T-Shirt' }]} />
const Breadcrumbs = ({ crumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb-list">
        {crumbs.map((crumb, index) => (
          <li key={index} className="breadcrumb-item">
            {crumb.link && index < crumbs.length - 1 ? (
              <Link to={crumb.link}>{crumb.name}</Link>
            ) : (
              <span>{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
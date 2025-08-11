import React, { useState, useEffect, useLayoutEffect } from 'react';
import './ProductInfoTabs.css';

// --- A helper hook to get the window size ---
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize(); // Call on initial load
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return { width: size[0] };
};

// --- Your Helper Components (No changes needed) ---
const SizeGuideModal = ({ onClose }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="size-guide-overlay" onClick={onClose}>
            <div className="size-guide-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Close size guide">×</button>
                <h2>Size Guide</h2>
                <p>Unsure what your size is? Check here.</p>
                <div className="size-chart-container">
                    <div className="size-chart">
                        <div className="size-column selected"><h4>A. XS is equivalent to a IT 38</h4><p><span>DE</span><span>32</span></p><p><span>RU</span><span>40</span></p><p><span>JP</span><span>7</span></p></div>
                        <div className="size-column"><h4>A. S is equivalent to a IT 40</h4><p><span>DE</span><span>34</span></p><p><span>RU</span><span>42</span></p><p><span>JP</span><span>9</span></p></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailsContent = ({ description, features = [] }) => (
    <div className="details-content-container">
        <p className="details-description">{description}</p>
        {features.length > 0 && <ul className="details-features-list">{features.map((feature, index) => <li key={index}>{feature}</li>)}</ul>}
    </div>
);

const SizeAndFitInfo = ({ sizeAndFit = {}, onOpenSizeGuide }) => (
    <div className="size-fit-content">
        <ul>
            {sizeAndFit.modelInfo && <li>{sizeAndFit.modelInfo}</li>}
            {sizeAndFit.fitType && <li>{sizeAndFit.fitType}</li>}
            {sizeAndFit.fitDescription && <li>{sizeAndFit.fitDescription}</li>}
        </ul>
        <button onClick={onOpenSizeGuide} className="size-guide-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 10V17" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7V17" stroke="currentColor" strokeWidth="1.5"/><path d="M12 4V17" stroke="currentColor" strokeWidth="1.5"/><path d="M16 7V17" stroke="currentColor" strokeWidth="1.5"/><path d="M20 10V17" stroke="currentColor" strokeWidth="1.5"/></svg>
            Size Guide
        </button>
    </div>
);

// ✅ --- FINAL MAIN COMPONENT ---
const ProductInfoTabs = ({ product }) => {
  const [activeSection, setActiveSection] = useState('details');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { width } = useWindowSize();
  const isDesktop = width >= 1024;

  const toggleAccordion = (sectionId) => {
    setActiveSection(prev => (prev === sectionId ? null : sectionId));
  };

  const handleTabClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const sections = [
    {
      id: 'details',
      title: 'Details',
      content: <DetailsContent description={product?.description} features={product?.features} />
    },
    {
      id: 'size',
      title: 'Size & Fit',
      content: <SizeAndFitInfo sizeAndFit={product?.sizeAndFit} onOpenSizeGuide={() => setIsModalOpen(true)} />
    }
  ];

  return (
    <>
      <div className="info-tabs-container">
        {isDesktop ? (
          // --- DESKTOP LAYOUT (Your Original Structure) ---
          <>
            <div className="tab-headers">
              {sections.map(section => (
                <button
                  key={section.id}
                  className={`tab-header-btn ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(section.id)}
                >
                  {section.title}
                </button>
              ))}
            </div>
            <div className="tab-content-panel">
              {sections.find(section => section.id === activeSection)?.content}
            </div>
          </>
        ) : (
          // --- MOBILE/TABLET LAYOUT (New Accordion Structure) ---
          <div className="accordion-layout">
            {sections.map(section => (
              <div key={section.id} className="accordion-item">
                <button
                  className={`tab-header-btn ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => toggleAccordion(section.id)}
                  aria-expanded={activeSection === section.id}
                >
                  {section.title}
                  <span className="tab-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </button>
                <div className={`accordion-content ${activeSection === section.id ? 'active' : ''}`}>
                  <div className="accordion-content-inner">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && <SizeGuideModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ProductInfoTabs;
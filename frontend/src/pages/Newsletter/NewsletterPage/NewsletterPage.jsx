import React, { useState, useMemo, useCallback, useContext, useEffect, useRef } from 'react';
import './NewsletterPage.css';

import NewsletterHeader from '../NewsletterHeader/NewsletterHeader';
import SustainableFashion from '../SustainableFashion/SustainableFashion';
import LuxuryFashion from '../LuxuryFashion/LuxuryFashion';
import FastFashion from '../FastFashion/FastFashion';
import SneakersWorld from '../SneakersWorld/SneakersWorld';
import { ArticleContext } from '../../../context/ArticleContext';

const NewsletterPage = () => {
  const { articles: allArticles, loading, error } = useContext(ArticleContext);

  const [activeFilter, setActiveFilter] = useState('default');
  const [showBack, setShowBack] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [containerHeight, setContainerHeight] = useState('100vh');

  const frontContentRef = useRef(null);
  const backContentRef = useRef(null);

  // ✅ Helper to measure & update height
  const recalcHeight = useCallback(() => {
    requestAnimationFrame(() => {
      const activeRef = showBack ? backContentRef : frontContentRef;
      if (activeRef.current) {
        const newHeight = `${activeRef.current.scrollHeight}px`;
        setContainerHeight(newHeight);
      }
    });
  }, [showBack]);

  const handleFilterChange = useCallback(
    (newFilter) => {
      if (isFlipping || newFilter === activeFilter) return;

      const isFlippingToBack = newFilter === 'domestic';
      const isFlippingToFront = activeFilter === 'domestic' && newFilter !== 'domestic';
      const needsPhysicalFlip = isFlippingToBack || isFlippingToFront;

      if (needsPhysicalFlip) {
        setIsFlipping(true);
        setShowBack(isFlippingToBack);
      }

      setTimeout(() => {
        setActiveFilter(newFilter);
        setIsFlipping(false);
        recalcHeight(); // ✅ recalc after flip completes
      }, needsPhysicalFlip ? 600 : 50);
    },
    [activeFilter, isFlipping, recalcHeight]
  );

  // ✅ Recalc on load, resize, or when articles change
  useEffect(() => {
    recalcHeight();
    window.addEventListener('resize', recalcHeight);
    return () => window.removeEventListener('resize', recalcHeight);
  }, [recalcHeight, activeFilter, allArticles.length, loading]);

  // ✅ Pass this callback to child sections
  const handleSectionContentChange = useCallback(() => {
    recalcHeight(); // ✅ recalc whenever a child expands/collapses content
  }, [recalcHeight]);

  // ✅ Filter content
  const domesticContent = useMemo(
    () => allArticles.filter((a) => a.location?.toLowerCase() === 'domestic'),
    [allArticles]
  );

  const internationalContent = useMemo(
    () => allArticles.filter((a) => a.location?.toLowerCase() === 'international'),
    [allArticles]
  );

  const articlesForFrontFace = useMemo(() => {
    return activeFilter === 'international' ? internationalContent : allArticles;
  }, [activeFilter, internationalContent, allArticles]);

  // ✅ Render sections & inject onContentChange
  const renderSections = (articles) => {
    if (loading || !articles) return null;

    const sections = [
      {
        id: 'sustainable',
        Component: SustainableFashion,
        posts: articles.filter((p) => p.category === 'SustainableFashion'),
      },
      {
        id: 'luxury',
        Component: LuxuryFashion,
        posts: articles.filter((p) => p.category === 'LuxuryFashion'),
      },
      {
        id: 'fast',
        Component: FastFashion,
        posts: articles.filter((p) => p.category === 'FastFashion'),
      },
      {
        id: 'sneakers',
        Component: SneakersWorld,
        posts: articles.filter((p) => p.category === 'SneakerWorld'),
      },
    ];

    return sections.map((section) => {
      if (!section.posts || section.posts.length === 0) return null;
      return (
        <section.Component
          key={section.id}
          posts={section.posts}
          onContentChange={handleSectionContentChange} // ✅ notify parent when Read More toggles
        />
      );
    });
  };

  // ✅ Loading & error display
  if (loading) return <h2 style={{ color: 'white', textAlign: 'center', marginTop: '150px' }}>Loading...</h2>;
  if (error) return <h2 style={{ color: 'red', textAlign: 'center', marginTop: '150px' }}>Error: {error}</h2>;

  return (
    <div className="page-flip-container" style={{ height: containerHeight }}>
      <div className={`flip-card-inner ${showBack ? 'is-flipped' : ''}`}>
        {/* FRONT FACE */}
        <div className="flip-card-face flip-card-front">
          <div ref={frontContentRef} className="content-wrapper">
            <NewsletterHeader
              activeFilter={showBack ? '' : activeFilter}
              onFilterChange={handleFilterChange}
              isFlipping={isFlipping}
            />
            <div className="page-container">{renderSections(articlesForFrontFace)}</div>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="flip-card-face flip-card-back">
          <div ref={backContentRef} className="content-wrapper">
            <NewsletterHeader
              activeFilter={showBack ? 'domestic' : ''}
              onFilterChange={handleFilterChange}
              isFlipping={isFlipping}
            />
            <div className="page-container">{renderSections(domesticContent)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;

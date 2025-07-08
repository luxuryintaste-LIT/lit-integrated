import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import './NewsletterPage.css';

import NewsletterHeader from '../NewsletterHeader/NewsletterHeader';
import Footer from '../../../components/Newsletter-components/Footer/Footer';
import SustainableFashion from '../SustainableFashion/SustainableFashion';
import LuxuryFashion from '../LuxuryFashion/LuxuryFashion';
import FastFashion from '../FastFashion/FastFashion';
import FashionSection from '../FashionSection/FashionSection';
import SneakersWorld from '../SneakersWorld/SneakersWorld';
import Background from '../../../components/Background/Background';

import { getArticles } from '../../../services/api'; 

const NewsletterPage = () => {
  const frontContentRef = useRef(null);
  const backContentRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState('100vh');

  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilter, setActiveFilter] = useState('default');
  const [showBack, setShowBack] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // ✅ Fetch from your backend API
 useEffect(() => {
    const fetchArticles = async () => {
      setError(null);
      setLoading(true);
      try {
        const data = await getArticles();
        setAllArticles(data || []);
      } catch (err) {
        setError(err.message || 'Error fetching articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const measureHeight = () => {
      requestAnimationFrame(() => {
        const activeRef = showBack ? backContentRef : frontContentRef;
        if (activeRef.current) {
          setContainerHeight(`${activeRef.current.offsetHeight}px`);
        }
      });
    };

    measureHeight();
    window.addEventListener('resize', measureHeight);
    return () => window.removeEventListener('resize', measureHeight);
  }, [loading, activeFilter, showBack]);

  const handleFilterChange = useCallback((newFilter) => {
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
    }, needsPhysicalFlip ? 600 : 50);
  }, [activeFilter, isFlipping]);

  // ✅ Categorized filtering
  const domesticContent = useMemo(
    () => allArticles.filter(a => a.location?.toLowerCase() === 'domestic'),
    [allArticles]
  );
  const internationalContent = useMemo(
    () => allArticles.filter(a => a.location?.toLowerCase() === 'international'),
    [allArticles]
  );

  const articlesForFrontFace = useMemo(() => {
    return activeFilter === 'international' ? internationalContent : allArticles;
  }, [activeFilter, internationalContent, allArticles]);

  // ✅ Organize into sections
  const renderSections = (articles) => {
    if (loading || !articles) return null;

    const sections = [
      { id: 'sustainable', Component: SustainableFashion, posts: articles.filter(p => p.category === 'SustainableFashion') },
      { id: 'luxury', Component: LuxuryFashion, posts: articles.filter(p => p.category === 'LuxuryFashion') },
      { id: 'fashion-feature', Component: FashionSection, post: articles.find(p => p.category === 'FashionFeature') },
      { id: 'fast', Component: FastFashion, posts: articles.filter(p => p.category === 'FastFashion') },
      { id: 'sneakers', Component: SneakersWorld, posts: articles.filter(p => p.category === 'SneakerWorld') },
    ];

    return sections.map(section => {
      if (section.id === 'fashion-feature') {
        return section.post ? <section.Component key={section.id} post={section.post} /> : null;
      }
      if (!section.posts || section.posts.length === 0) return null;
      return <section.Component key={section.id} posts={section.posts} />;
    });
  };

  if (loading) return <h2 style={{ color: 'white', textAlign: 'center', marginTop: '150px' }}>Loading...</h2>;
  if (error) return <h2 style={{ color: 'red', textAlign: 'center', marginTop: '150px' }}>Error: {error}</h2>;

  return (
    // <Background 
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
            <div className="page-container">
              {renderSections(articlesForFrontFace)}
            </div>
            {/* <Footer /> */}
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
            <div className="page-container">
              {renderSections(domesticContent)}
            </div>
            {/* <Footer /> */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsletterPage;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getArticlesByCategory } from '../services/api';

const ArticleContext = createContext();

export const useArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sustainable, luxury, fast, sneakers] = await Promise.all([
        getArticlesByCategory('SustainableFashion'),
        getArticlesByCategory('LuxuryFashion'),
        getArticlesByCategory('FastFashion'),
        getArticlesByCategory('SneakerWorld'),
      ]);

      const all = [
        ...(Array.isArray(sustainable) ? sustainable : []),
        ...(Array.isArray(luxury) ? luxury : []),
        ...(Array.isArray(fast) ? fast : []),
        ...(Array.isArray(sneakers) ? sneakers : [])
      ];

      setArticles(all);
    } catch (err) {
      setError(err.message || 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (articles.length === 0) {
      fetchAllArticles();
    }
  }, []);

  return (
    <ArticleContext.Provider value={{ articles, loading, error }}>
      {children}
    </ArticleContext.Provider>
  );
};
export { ArticleContext };
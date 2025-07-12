import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ArticlePage.css';

// Components
import ArticleHero from './ArticleHero/ArticleHero';
import ArticleBody from './ArticleBody/ArticleBody';
import ShareButtons from "../../../components/Newsletter-components/ShareButtons/ShareButtons";


import RelatedArticles from './RelatedArticles/RelatedArticles';
import Footer from "../../../components/Newsletter-components/Footer/Footer";

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch the main article by slug
        const res = await fetch(`https://lit-backend-azajexa8e2a9g4az.canadacentral-01.azurewebsites.net/api/articles/slug/${slug}`);
        if (!res.ok) throw new Error('Article not found');
        const data = await res.json();
        setArticle(data);

        // Fetch all articles to pick related ones
        const allRes = await fetch('https://lit-backend-azajexa8e2a9g4az.canadacentral-01.azurewebsites.net/api/articles');
        const allData = await allRes.json();
        const filtered = allData.filter(p => p.slug !== slug).slice(0, 3);
        setRelatedArticles(filtered);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <h2 style={{ color: 'white', textAlign: 'center', marginTop: '150px' }}>Loading...</h2>;
  if (error) return <h2 style={{ color: 'red', textAlign: 'center', marginTop: '150px' }}>Error: {error}</h2>;
  if (!article) return <h2 style={{ color: 'gray', textAlign: 'center', marginTop: '150px' }}>Article could not be loaded.</h2>;

  return (
    <div className="article-page-wrapper">
      <div className="article-content-main">
        <ArticleHero
          headline={article.title}
          description={article.description}
          imageUrl={article.imageUrl}
        />
        <ArticleBody content={article.bodyContent || '<p>No content available.</p>'} />
        <ShareButtons articleTitle={article.title} />
        <RelatedArticles articles={relatedArticles} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ArticlePage;

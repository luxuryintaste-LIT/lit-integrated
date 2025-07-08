import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from "../../context/context-admin/DataContext";
import { FaArrowLeft } from 'react-icons/fa';

import './ArticlePage.css';

const ArticlePage = () => {
    const { slug } = useParams(); // Used as slug (for website) or ID (for mail)
    const navigate = useNavigate();
    const { articles, newsletterContent } = useData();

    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticle = async () => {
            // 1. Check if it's a website article (via context)
            const websiteArticle = articles.find(a => a.slug === slug);
            if (websiteArticle) {
                setArticleData({
                    title: websiteArticle.title,
                    image: websiteArticle.heroImage || websiteArticle.imageUrl,
                    description: websiteArticle.description,
                    body: websiteArticle.bodyContent,
                    category: websiteArticle.category?.replace(/([A-Z])/g, ' $1').trim(),
                });
                setLoading(false);
                return;
            }

            // 2. Try fetching from website backend
            try {
                const res = await fetch(`http://localhost:5000/api/articles/slug/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setArticleData({
                        title: data.title,
                        image: data.heroImage || data.imageUrl,
                        description: data.description,
                        body: data.bodyContent,
                        category: data.category?.replace(/([A-Z])/g, ' $1').trim(),
                    });
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.error('Error checking website article:', err);
            }

            // 3. If not a website article, check in mail articles (by ID)
            try {
                const mailCategories = Object.keys(newsletterContent?.categories || {});
                for (const category of mailCategories) {
                    const match = newsletterContent.categories[category].find(item => item._id === slug || item.id === slug);
                    if (match) {
                        const articleLink = match.url || match.articleUrl || '';
                        setArticleData({
                            title: match.caption || '(No Title)',
                            image: match.image || match.imageUrl,
                            description: null,
                            body: articleLink
                                ? `<p>You can read the full article at: <a href="${articleLink}" target="_blank" rel="noopener noreferrer">${articleLink}</a></p>`
                                : `<p><em>No article link available.</em></p>`,
                            category: category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                        });
                        setLoading(false);
                        return;
                    }
                }
            } catch (error) {
                console.error('Error checking mail article:', error);
            }

            setArticleData(null);
            setLoading(false);
        };

        loadArticle();
    }, [slug, articles, newsletterContent]);

    console.log('Rendering article body:', articleData?.body);

    return (
        <div className="view-page-wrapper">
            <header className="view-page-fixed-header">
                <button onClick={() => navigate(-1)} className="view-page-back-button">
                    <FaArrowLeft />
                    <span>Back</span>
                </button>
            </header>

            {loading ? (
                <div className="view-page-container"><p>Loading...</p></div>
            ) : !articleData ? (
                <div className="view-page-container">
                    <h1 className="view-title">Content Not Found</h1>
                </div>
            ) : (
                <div className="view-page-container">
                    <div className="view-card">
                        <div className="view-text-content-top">
                            {articleData.category && <p className="view-category">{articleData.category}</p>}
                            <h1 className="view-title">{articleData.title}</h1>
                            {articleData.description && (
                                <p className="view-description">{articleData.description}</p>
                            )}
                        </div>

                        {articleData.image && (
                            <div className="view-image-wrapper">
                                <img src={articleData.image} alt={articleData.title} />
                            </div>
                        )}

                        <div
                            className="view-body"
                            dangerouslySetInnerHTML={{ __html: articleData.body }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticlePage;

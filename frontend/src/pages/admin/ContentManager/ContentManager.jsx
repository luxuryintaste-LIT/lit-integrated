import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../../context/context-admin/DataContext';
import { FaEye, FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import './ContentManager.css';

const ContentManager = ({ section }) => {
    return section === 'mail' ? <MailContentManager /> : <WebsiteArticleList />;
};

const MailContentManager = () => {
    const navigate = useNavigate();
    const { newsletterContent, updateNewsletterContent, showConfirmation, showNotification } = useData();
    const [categoryFilter, setCategoryFilter] = useState('All');

    const ALL_MAIL_CATEGORIES = useMemo(() => {
        if (!newsletterContent || !newsletterContent.categories) return ['All'];
        const categoryNames = Object.keys(newsletterContent.categories).map(key =>
            key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        );
        return ['All', ...new Set(categoryNames)];
    }, [newsletterContent]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const urls = {
                    'fast-fashion': 'http://localhost:5000/api/fast-fashion',
                    'luxury-fashion': 'http://localhost:5000/api/luxury-fashion',
                    'sustainable-fashion': 'http://localhost:5000/api/sustainable-fashion',
                    'sneaker-world': 'http://localhost:5000/api/sneaker-world'
                };

                const responses = await Promise.all(
                    Object.entries(urls).map(async ([key, url]) => {
                        const res = await fetch(url);
                        const data = await res.json();
                        return { key, items: data };
                    })
                );

                const categories = {};
                for (const { key, items } of responses) {
                    categories[key] = items.map(item => ({
                        ...item,
                        categoryId: key,
                        categoryName: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                    }));
                }

                updateNewsletterContent({ categories });
            } catch (err) {
                console.error('Failed to fetch mail content:', err);
            }
        };

        fetchAll();
    }, []);

    const flattenedItems = useMemo(() => {
        if (!newsletterContent || !newsletterContent.categories) return [];
        const allItems = Object.entries(newsletterContent.categories).flatMap(([categoryId, items]) =>
            items.map(item => ({
                ...item,
                categoryId,
                categoryName: item.categoryName
            }))
        );
        return categoryFilter === 'All'
            ? allItems
            : allItems.filter(item => item.categoryName === categoryFilter);
    }, [newsletterContent, categoryFilter]);

    const handleView = (item) => navigate(`/admin/article/${item._id}`);
    const handleEdit = (item) => navigate(`/admin/mail/edit/${item._id}`);
    const handleDelete = (itemToDelete) => {
        showConfirmation(`Delete "${itemToDelete.caption || itemToDelete.data}" permanently?`, async () => {
            const updatedContent = JSON.parse(JSON.stringify(newsletterContent));
            const filtered = updatedContent.categories[itemToDelete.categoryId].filter(i => i._id !== itemToDelete._id);
            updatedContent.categories[itemToDelete.categoryId] = filtered;
            updateNewsletterContent(updatedContent);
            showNotification("Item deleted successfully.");
        });
    };

    return (
        <div className="list-page-container">
            <header className="list-page-header">
                <h1>Mail Content Manager</h1>
                <Link to="/admin/mail/add" className="create-btn"><FaPlus /> Add New Content</Link>
            </header>

            <div className="filter-bar">
                <div className="filter-group">
                    <label>Filter by Category</label>
                    <div className="radio-toggle">
                        {ALL_MAIL_CATEGORIES.map(cat => (
                            <label key={cat} className={categoryFilter === cat ? 'active' : ''}>
                                <input
                                    type="radio"
                                    name="mailCategoryFilter"
                                    value={cat}
                                    checked={categoryFilter === cat}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                />
                                <span>{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="list-table-container">
                {flattenedItems.length > 0 ? (
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>Caption / Data</th>
                                <th>Category</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flattenedItems.map((item) => (
                                <tr key={item._id}>
                                    <td className="title-cell">{item.caption || item.data || '(No Caption)'}</td>
                                    <td>{item.categoryName}</td>
                                    <td className="action-cell">
                                        <button onClick={() => handleView(item)} className="action-icon view" title="View"><FaEye /></button>
                                        <button onClick={() => handleEdit(item)} className="action-icon edit" title="Edit"><FaPen /></button>
                                        <button onClick={() => handleDelete(item)} className="action-icon delete" title="Delete"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <h3>No Mail Content Found</h3>
                        <p>Get started by adding new content.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const WebsiteArticleList = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [locationFilter, setLocationFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const section = 'website';
    const CATEGORIES = ['All', 'SustainableFashion', 'LuxuryFashion', 'FastFashion', 'SneakerWorld'];
    const LOCATIONS = ['All', 'Domestic', 'International'];

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/articles');
                if (!response.ok) throw new Error('Failed to fetch articles');
                const data = await response.json();
                setArticles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const locationMatch = locationFilter === 'All' || article.location === locationFilter;
            const categoryMatch = categoryFilter === 'All' || article.category === categoryFilter;
            return locationMatch && categoryMatch;
        });
    }, [articles, locationFilter, categoryFilter]);

    const handleDelete = async (slug, title) => {
        const confirmDelete = window.confirm(`Delete "${title}" permanently?`);
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/api/articles/slug/${slug}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete article');
            setArticles(prev => prev.filter(article => article.slug !== slug));
            alert('Article deleted successfully');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="list-page-container">
            <header className="list-page-header">
                <h1>Website Content Manager</h1>
                <Link to={`/admin/editor/${section}`} className="create-btn"><FaPlus /> Create New Article</Link>
            </header>

            <div className="filter-bar">
                <div className="filter-group">
                    <label>Filter by Location</label>
                    <div className="radio-toggle">
                        {LOCATIONS.map(loc => (
                            <label key={loc} className={locationFilter === loc ? 'active' : ''}>
                                <input type="radio" name="locationFilter" value={loc} checked={locationFilter === loc} onChange={(e) => setLocationFilter(e.target.value)} />
                                <span>{loc}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <label>Filter by Category</label>
                    <div className="radio-toggle">
                        {CATEGORIES.map(cat => (
                            <label key={cat} className={categoryFilter === cat ? 'active' : ''}>
                                <input type="radio" name="categoryFilter" value={cat} checked={categoryFilter === cat} onChange={(e) => setCategoryFilter(e.target.value)} />
                                <span>{cat === 'All' ? 'All' : cat.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="list-table-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : filteredArticles.length > 0 ? (
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Publish Date</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArticles.map((article) => (
                                <tr key={article._id}>
                                    <td className="title-cell">{article.title}</td>
                                    <td>{article.location || '-'}</td>
                                    <td>{article.category || '-'}</td>
                                    <td>
                                          {console.log('article.status:', article.status, typeof article.status)}
                                            <span className={`status-pill ${typeof article.status === 'string' ? article.status.toLowerCase() : 'published'}`}>
                                            {article.status || 'Published'}
                                        </span>
                                    </td>
                                    <td>{article.publishDate ? new Date(article.publishDate).toLocaleDateString() : '-'}</td>
                                    <td className="action-cell">
                                        <button onClick={() => navigate(`/admin/article/${article.slug}`)} className="action-icon view" title="View"><FaEye /></button>
                                        <button onClick={() => navigate(`/admin/editor/${section}/${article.slug}`)} className="action-icon edit" title="Edit"><FaPen /></button>
                                        <button onClick={() => handleDelete(article.slug, article.title)} className="action-icon delete" title="Delete"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <h3>No Results Match Your Filters</h3>
                        <p>Try adjusting the filters or create new content.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManager;

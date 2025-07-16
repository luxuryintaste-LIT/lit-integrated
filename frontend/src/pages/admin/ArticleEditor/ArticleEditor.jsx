import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useData } from '../../../context/context-admin/DataContext';
import '../../../styles/styles-admin/Editor.css';

const CATEGORIES = ['SustainableFashion', 'LuxuryFashion', 'FastFashion', 'SneakerWorld'];
const LOCATIONS = ['Domestic', 'International'];
const BASE_URL = 'http://localhost:5000';

const ArticleEditor = () => {
  const { section, slug } = useParams();
  const navigate = useNavigate();
  const { getArticleBySlug, showNotification } = useData();
  const isEditing = Boolean(slug);
  const quillRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [articleData, setArticleData] = useState({
    title: '',
    slug: '',
    description: '',
    imageUrl: '',
    bodyContent: '',
    category: CATEGORIES[0],
    location: LOCATIONS[0],
    status: 'Published',
    section: section,
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (!isEditing) {
        setIsLoading(false);
        return;
      }

      let data = getArticleBySlug(slug);

      if (!data) {
        try {
          const res = await fetch(`${BASE_URL}/api/articles/slug/${slug}`);
          if (!res.ok) throw new Error('Article not found');
          data = await res.json();
        } catch (err) {
          showNotification(err.message || 'Failed to load article.');
          navigate('/admin/dashboard');
          return;
        }
      }

      setArticleData(data);
      setIsLoading(false);
    };

    fetchArticle();
  }, [isEditing, slug, getArticleBySlug, navigate, showNotification]);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    quill.getModule('toolbar').addHandler('image', () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
          const res = await fetch(`${BASE_URL}/api/upload`, {
            method: 'POST',
            body: formData,
          });

          const data = await res.json();
          if (data?.url) {
            const range = quill.getSelection();
            quill.insertEmbed(range?.index || 0, 'image', data.url);
          }
        } catch (err) {
          console.error('Image upload failed:', err);
          showNotification('Image upload failed');
        }
      };
    });
  }, [isLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setArticleData((prev) => ({
      ...prev,
      title: newTitle,
      slug: isEditing
        ? prev.slug
        : newTitle
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, ''),
    }));
  };

  const handleQuillChange = (value) => {
    setArticleData((prev) => ({ ...prev, bodyContent: value }));
  };

  const handleSave = async (status) => {
    if (!articleData.title || !articleData.slug) {
      showNotification('Title and Slug are required.');
      return;
    }

    const finalData = {
      ...articleData,
      status,
      heroImage: articleData.imageUrl,
    };

    const endpoint = isEditing
      ? `${BASE_URL}/api/articles/slug/${articleData.slug}`
      : `${BASE_URL}/api/articles`;

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to save article');
      }

      showNotification(`Article ${status.toLowerCase()} successfully!`);
      navigate('/admin/website');
    } catch (error) {
      showNotification(`Error saving article: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave('Published');
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  if (isLoading) {
    return (
      <div className="editor-container">
        <h1>Loading Editor...</h1>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <form onSubmit={handleSubmit} className="editor-form">
        <header className="editor-header purple-theme-header">
          <h1>{isEditing ? 'Edit Article' : 'Create New Website Article'}</h1>
          <div className="editor-actions">
            <button
              type="button"
              onClick={() => handleSave('Draft')}
              className="action-btn-secondary"
            >
              Save as Draft
            </button>
            <button type="submit" className="action-btn-primary">
              {isEditing ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </header>

        <div className="editor-meta-bar">
          <div className="sidebar-card">
            <h3>Category</h3>
            <div className="radio-group horizontal">
              {CATEGORIES.map((cat) => (
                <label key={cat} className={articleData.category === cat ? 'active' : ''}>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={articleData.category === cat}
                    onChange={handleInputChange}
                  />
                  <span>{cat.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="sidebar-card">
            <h3>Location</h3>
            <div className="radio-group horizontal">
              {LOCATIONS.map((loc) => (
                <label key={loc} className={articleData.location === loc ? 'active' : ''}>
                  <input
                    type="radio"
                    name="location"
                    value={loc}
                    checked={articleData.location === loc}
                    onChange={handleInputChange}
                  />
                  <span>{loc}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="editor-main-layout">
          <div className="editor-content-area">
            <div className="editor-input-group">
              <label htmlFor="title">Article Title</label>
              <input
                type="text"
                id="title"
                value={articleData.title}
                onChange={handleTitleChange}
                placeholder="e.g., The Future of Sustainable Fashion"
                required
              />
            </div>
            <div className="editor-input-group">
              <label htmlFor="description">Short Description</label>
              <textarea
                id="description"
                name="description"
                value={articleData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="A brief, catchy summary of the article..."
                required
              />
            </div>
            <div className="editor-input-group quill-wrapper">
              <label>Body Content</label>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={articleData.bodyContent || '<p><br></p>'}
                onChange={handleQuillChange}
                modules={quillModules}
              />
            </div>
            <div className="editor-input-group">
              <label htmlFor="publishDate">Publish Date</label>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                value={articleData.publishDate || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <aside className="editor-sidebar">
            <div className="sidebar-card">
              <h3>Details & SEO</h3>
              <div className="editor-input-group">
                <label htmlFor="slug">URL Slug</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={articleData.slug}
                  onChange={handleInputChange}
                  placeholder="auto-generated-from-title"
                  required
                />
              </div>
              <div className="editor-input-group">
                <label>Hero Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={articleData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
                {articleData.imageUrl && (
                  <img
                    src={articleData.imageUrl}
                    alt="preview"
                    className="image-preview"
                  />
                )}
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
};

export default ArticleEditor;

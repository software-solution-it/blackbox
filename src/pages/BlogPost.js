import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allBlogPosts } from '../data/blogPosts';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = allBlogPosts.find(post => post.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/');
    }
  }, [post, navigate]);

  const handleBack = () => {
    window.history.back();
  };

  if (!post) {
    return null;
  }

  return (
    <article className="blog-post">
      <button onClick={handleBack} className="back-button-fixed">
        <i className="fas fa-arrow-left"></i>
        Voltar para o Blog
      </button>
      
      <div className="blog-post-container">
        <aside className="blog-post-sidebar">
          <div className="blog-post-meta">
            <div className="blog-post-meta-item">
              <i className="far fa-calendar"></i>
              <span>{post.date}</span>
            </div>
            <div className="blog-post-meta-item">
              <i className="far fa-folder"></i>
              <span>{post.category}</span>
            </div>
          </div>
        </aside>
        
        <main className="blog-post-main">
          <header className="blog-post-header">
            <span className="blog-post-category">{post.category}</span>
            <h1 className="blog-post-title">{post.title}</h1>
          </header>

          <div 
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </main>
      </div>
    </article>
  );
};

export default BlogPost;
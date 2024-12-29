import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allBlogPosts } from '../data/blogPosts';
import './BlogSection.css';

const BlogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (allBlogPosts && allBlogPosts.length > 0) {
      const interval = setInterval(() => {
        if (!isTransitioning) {
          handleNext();
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isTransitioning]);

  const handleNext = () => {
    if (isTransitioning || !allBlogPosts || allBlogPosts.length === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allBlogPosts.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const getCardClassName = (index) => {
    const diff = index - currentIndex;
    const length = allBlogPosts.length;
    
    const normalizedDiff = ((diff % length) + length) % length;
    
    if (normalizedDiff === 0) return 'blog-card active';
    if (normalizedDiff === 1) return 'blog-card next';
    if (normalizedDiff === length - 1) return 'blog-card prev';
    return 'blog-card';
  };

  return (
    <section className="blog-section">
      {allBlogPosts && allBlogPosts.length > 0 ? (
        <div className="blog-content">
          <div className="section-header">
            <span className="section-badge">Blog</span>
            <h2 className="section-title">
              Últimas <span className="text-gradient">Novidades</span>
            </h2>
            <p className="section-description">
              Fique por dentro das últimas tendências e novidades do mercado de iGaming
            </p>
          </div>

          <div className="blog-cards-container">
            {allBlogPosts.map((post, index) => (
              <div 
                key={post.id} 
                className={getCardClassName(index)}
              >
                <div className="card-gradient-overlay"></div>
                <div className="blog-card-content">
                  <span className="blog-category">{post.category}</span>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-footer">
                    <span className="blog-date">{post.date}</span>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="read-more"
                    >
                      Ler mais
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-nav">
            <button 
              className="carousel-button"
              onClick={() => {
                setCurrentIndex((prev) => 
                  prev === 0 ? allBlogPosts.length - 1 : prev - 1
                );
              }}
            >
              ←
            </button>
            <button 
              className="carousel-button"
              onClick={() => {
                setCurrentIndex((prev) => 
                  (prev + 1) % allBlogPosts.length
                );
              }}
            >
              →
            </button>
          </div>
        </div>
      ) : (
        <div>Carregando posts...</div>
      )}
    </section>
  );
};

export default BlogSection;
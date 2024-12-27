import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allBlogPosts } from '../data/blogPosts';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const findPostBySlug = (slug) => {
    return allBlogPosts.find(post => post.slug === slug);
  };
  
  const post = findPostBySlug(slug);

  if (!post) {
    return (
      <div className="blog-post">
        <div className="blog-post-container blog-post-error">
          <h1>Post não encontrado</h1>
          <p>O artigo que você está procurando não existe ou foi removido.</p>
          <Link to="/" className="back-home">Voltar para Home</Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readTime = calculateReadTime(post.content);

  return (
    <article className="blog-post">
      <Link to="/" className="back-button-fixed">
        <i className="fas fa-arrow-left"></i>
        Voltar para o Blog
      </Link>
      
      <div className="blog-post-container">
        <aside className="blog-post-sidebar">
          <div className="blog-post-meta">
            <div className="blog-post-meta-item">
              <i className="far fa-calendar"></i>
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="blog-post-meta-item">
              <i className="far fa-clock"></i>
              <span>{readTime} min de leitura</span>
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
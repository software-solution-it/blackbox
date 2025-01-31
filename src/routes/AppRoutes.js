import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeNew from '../pages/HomeNew';
import BlogPost from '../pages/BlogPost'; // Precisamos criar este componente

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeNew />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes; 
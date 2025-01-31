import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeNew from '../pages/HomeNew';
import BlogPost from '../pages/BlogPost';
import ServiceDetails from '../components/ServiceDetails';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeNew />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/servicos/:id" element={<ServiceDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes; 
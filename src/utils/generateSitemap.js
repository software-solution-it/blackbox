const fs = require('fs');
const path = require('path');
const { allBlogPosts } = require('../data/blogPosts');

function generateSitemap() {
  const baseUrl = 'https://black-box.games';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${allBlogPosts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `).join('')}
</urlset>`;

  fs.writeFileSync(
    path.join(__dirname, '../../public/sitemap.xml'),
    sitemap
  );
  
  console.log('Sitemap generated successfully!');
}

generateSitemap();
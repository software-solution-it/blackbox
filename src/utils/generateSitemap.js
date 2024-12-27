const fs = require('fs');
const path = require('path');

const baseUrl = 'https://black-box.games';

// Array com os slugs e datas dos posts
const blogPosts = [
  {
    slug: 'regulamentacao-igaming-brasil-2024',
    date: '2024-03-19'
  },
  {
    slug: 'inteligencia-artificial-cassinos-online',
    date: '2024-03-18'
  },
  {
    slug: 'tendencias-pagamento-igaming',
    date: '2024-03-17'
  },
  {
    slug: 'marketing-afiliados-igaming',
    date: '2024-03-16'
  },
  {
    slug: 'gamificacao-cassinos-online',
    date: '2024-03-15'
  },
  {
    slug: 'seguranca-compliance-igaming',
    date: '2024-03-14'
  },
  {
    slug: 'live-casino-futuro-apostas-online',
    date: '2024-03-13'
  },
  {
    slug: 'analise-dados-igaming',
    date: '2024-03-12'
  },
  {
    slug: 'integracao-provedores-jogos',
    date: '2024-03-11'
  },
  {
    slug: 'responsible-gaming-2024',
    date: '2024-03-10'
  },
  {
    slug: 'mobile-first-igaming',
    date: '2024-03-09'
  },
  {
    slug: 'fidelizacao-jogadores',
    date: '2024-03-08'
  },
  {
    slug: 'tendencias-slots-online',
    date: '2024-03-07'
  },
  {
    slug: 'kyc-prevencao-fraude',
    date: '2024-03-06'
  }
];

function generateSitemap() {
  // Certifique-se de que não há espaços extras ou caracteres inválidos
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Página principal
  sitemap += `
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Posts do blog
  blogPosts.forEach(post => {
    sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += '\n</urlset>';

  // Escreve o arquivo com encoding UTF-8
  const outputPath = path.join(__dirname, '../../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap, 'utf8');
  console.log('Sitemap gerado com sucesso!');
}

try {
  generateSitemap();
} catch (error) {
  console.error('Erro ao gerar sitemap:', error);
}
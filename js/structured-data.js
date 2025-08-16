// ���ӽṹ������������SEO
(function() {
  'use strict';

  // ��վ������Ϣ�ṹ������
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "������Ĳ���",
    "alternateName": "LinQiuTian Blog",
    "url": "https://www.linqiutianovo.xyz/",
    "description": "רע��Ƕ��ʽ������Linuxϵͳ��C/C++��̵ļ�������",
    "author": {
      "@type": "Person",
      "name": "������",
      "url": "https://github.com/linqiutian"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.linqiutianovo.xyz/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // �������½ṹ������
  function addArticleSchema() {
    const article = document.querySelector('article.post-content');
    if (article) {
      const title = document.querySelector('h1.post-title')?.textContent || '';
      const datePublished = document.querySelector('.post-meta-date-created')?.getAttribute('datetime') || '';
      const dateModified = document.querySelector('.post-meta-date-updated')?.getAttribute('datetime') || datePublished;
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "author": {
          "@type": "Person",
          "name": "������",
          "url": "https://github.com/linqiutian"
        },
        "publisher": {
          "@type": "Organization",
          "name": "������Ĳ���",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.linqiutianovo.xyz/favicon.ico"
          }
        },
        "datePublished": datePublished,
        "dateModified": dateModified,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        }
      };

      addSchemaToHead(articleSchema);
    }
  }

  // ���ӽṹ�����ݵ�ҳ��ͷ��
  function addSchemaToHead(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // ҳ�������ɺ�ִ��
  document.addEventListener('DOMContentLoaded', function() {
    addSchemaToHead(websiteSchema);
    addArticleSchema();
  });
})();
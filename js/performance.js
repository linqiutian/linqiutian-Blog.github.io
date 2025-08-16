// ��վ�����Ż��ű�
(function() {
  'use strict';

  // Ԥ���عؼ���Դ
  function preloadCriticalResources() {
    const criticalResources = [
      '/css/index.css',
      '/js/main.js'
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });
  }

  // ͼƬ�������Ż�
  function optimizeImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // ��������
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // �Ż���������
  function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScrollPosition() {
      // ������ص�DOM����
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // ҳ�������ɺ�ִ���Ż�
  document.addEventListener('DOMContentLoaded', function() {
    preloadCriticalResources();
    optimizeImageLoading();
    optimizeScrollPerformance();
  });

  // Service Worker ע�ᣨ�����Ҫ��
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('SW registered: ', registration);
        })
        .catch(function(registrationError) {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
})();
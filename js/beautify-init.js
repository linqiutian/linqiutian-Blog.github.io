// ��վ����Ч����ʼ���ű�
(function() {
  'use strict';

  // ҳ�������ɺ���������Ч��
  function initBeautifyEffects() {
    // Ϊ���¿�Ƭ���Ӷ�����
    const postItems = document.querySelectorAll('.recent-post-item');
    postItems.forEach((item, index) => {
      item.classList.add('animate-fadeInUp');
      item.classList.add(`animate-delay-${Math.min(index + 1, 5)}`);
      item.classList.add('hover-float');
    });

    // Ϊ�������Ƭ���Ӷ���
    const cardWidgets = document.querySelectorAll('.card-widget');
    cardWidgets.forEach((card, index) => {
      card.classList.add('animate-fadeInRight');
      card.classList.add(`animate-delay-${Math.min(index + 1, 5)}`);
      card.classList.add('hover-scale');
    });

    // Ϊ���������Ӷ���
    const nav = document.querySelector('#nav');
    if (nav) {
      nav.classList.add('animate-fadeInDown');
    }

    // Ϊ�������ӽ�������Ч��
    const siteTitle = document.querySelector('#site-title');
    if (siteTitle) {
      siteTitle.classList.add('gradient-text');
    }

    // Ϊ��ť������ͣЧ��
    const buttons = document.querySelectorAll('.btn, button, .card-info-btn');
    buttons.forEach(btn => {
      btn.classList.add('hover-scale');
    });

    // Ϊͷ����������Ч��
    const avatar = document.querySelector('.card-info-avatar img');
    if (avatar) {
      avatar.classList.add('pulse');
    }

    // Ϊ��ǩ���Ӳ���Ч��
    const tags = document.querySelectorAll('.article-meta__tags a');
    tags.forEach((tag, index) => {
      tag.classList.add('wave');
      tag.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // ����ʱ���Ӳ�Ч��
  function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.2;
      
      // �����Ӳ�Ч��
      const background = document.body;
      if (background) {
        background.style.backgroundPosition = `center ${rate}px`;
      }
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // �����л�ʱ��ƽ������
  function initThemeTransition() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          document.body.style.transition = 'all 0.3s ease';
          setTimeout(() => {
            document.body.style.transition = '';
          }, 300);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  // �����Զ�����Ч��
  function initCustomCursor() {
    if (window.innerWidth > 768) { // �������������
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(108, 122, 137, 0.8), rgba(95, 184, 178, 0.4));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(cursor);

      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });

      // ��ͣ��������ʱ�Ŵ���
      document.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'A' || e.target.closest('a')) {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      });
    }
  }

  // ����ҳ����ؽ�����
  function initLoadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #6C7A89, #5FB8B2, #D99E6A);
      z-index: 10000;
      transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 90) {
        progress = 90;
        clearInterval(interval);
      }
      progressBar.style.width = progress + '%';
    }, 100);

    window.addEventListener('load', () => {
      progressBar.style.width = '100%';
      setTimeout(() => {
        progressBar.style.opacity = '0';
        setTimeout(() => {
          progressBar.remove();
        }, 300);
      }, 200);
    });
  }

  // ���ӽ��ղʵ�Ч��
  function initHolidayEffects() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // �����ڼ������̻�Ч��
    if ((month === 1 || month === 2) && day <= 15) {
      document.body.classList.add('spring-festival');
    }
    
    // ʥ�����ڼ�����ѩ��Ч��
    if (month === 12 && day >= 20) {
      createSnowflakes();
    }
  }

  // ����ѩ��Ч��
  function createSnowflakes() {
    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement('div');
      snowflake.innerHTML = '?';
      snowflake.style.cssText = `
        position: fixed;
        top: -10px;
        color: rgba(255, 255, 255, 0.8);
        font-size: ${Math.random() * 10 + 10}px;
        left: ${Math.random() * 100}%;
        animation: snowfall ${Math.random() * 3 + 2}s linear infinite;
        z-index: -1;
        pointer-events: none;
      `;
      document.body.appendChild(snowflake);
    }

    // ����ѩ������CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes snowfall {
        to {
          transform: translateY(100vh);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ��ʼ����������Ч��
  function init() {
    initLoadingProgress();
    
    // ҳ�������ɺ��ʼ������Ч��
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          initBeautifyEffects();
          initScrollEffects();
          initThemeTransition();
          initCustomCursor();
          initHolidayEffects();
        }, 100);
      });
    } else {
      setTimeout(() => {
        initBeautifyEffects();
        initScrollEffects();
        initThemeTransition();
        initCustomCursor();
        initHolidayEffects();
      }, 100);
    }
  }

  // ��������Ч��
  init();

  // ������ȫ�֣��������ű�ʹ��
  window.BeautifyEffects = {
    initBeautifyEffects,
    initScrollEffects,
    initThemeTransition,
    initCustomCursor,
    initHolidayEffects
  };
})();
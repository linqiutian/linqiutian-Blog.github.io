// ��̬���ӱ���Ч��
(function() {
  'use strict';

  // ��������Ԫ��
  function createFloatingElements() {
    const container = document.createElement('div');
    container.className = 'floating-elements';
    
    for (let i = 0; i < 6; i++) {
      const element = document.createElement('div');
      element.className = 'floating-element';
      container.appendChild(element);
    }
    
    document.body.appendChild(container);
  }

  // �����ǿ�Ч��
  function createStars() {
    const container = document.createElement('div');
    container.className = 'stars';
    
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      container.appendChild(star);
    }
    
    document.body.appendChild(container);
  }

  // ������Ч��
  function createMouseFollower() {
    const follower = document.createElement('div');
    follower.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(95, 184, 178, 0.3), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    });

    // ���������Ч��
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(95, 184, 178, 0.3), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
      `;
      
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // ���Ӳ��ƶ���CSS
  function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          width: 100px;
          height: 100px;
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // �����Ӳ�Ч��
  function initParallax() {
    const elements = document.querySelectorAll('.card-widget, .recent-post-item');
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      elements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        element.style.transform = `translateY(${rate * speed}px)`;
      });
    }
    
    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  // ҳ����ض���
  function initPageLoadAnimation() {
    const elements = document.querySelectorAll('.card-widget, .recent-post-item, .post-content');
    
    elements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // �����л�����
  function initThemeTransition() {
    const themeButton = document.querySelector('#darkmode');
    if (themeButton) {
      themeButton.addEventListener('click', () => {
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
          document.body.style.transition = '';
        }, 300);
      });
    }
  }

  // ��ʼ������Ч��
  function init() {
    // ����Ƿ�Ϊ�ƶ��豸
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
      createFloatingElements();
      createStars();
      createMouseFollower();
      initParallax();
    }
    
    addRippleAnimation();
    initPageLoadAnimation();
    initThemeTransition();
  }

  // ҳ�������ɺ��ʼ��
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ���ڴ�С�ı�ʱ���³�ʼ��
  window.addEventListener('resize', () => {
    const floatingElements = document.querySelector('.floating-elements');
    const stars = document.querySelector('.stars');
    
    if (window.innerWidth <= 768) {
      if (floatingElements) floatingElements.style.display = 'none';
      if (stars) stars.style.display = 'none';
    } else {
      if (floatingElements) floatingElements.style.display = 'block';
      if (stars) stars.style.display = 'block';
    }
  });
})();
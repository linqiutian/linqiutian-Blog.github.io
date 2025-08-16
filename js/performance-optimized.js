// �����������Ż��ű�
(function() {
    'use strict';
    
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
    
    // Ԥ���عؼ���Դ
    function preloadCriticalResources() {
        const criticalResources = [
            { href: '/css/index.css', as: 'style' },
            { href: '/js/main.js', as: 'script' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = function() {
                    this.onload = null;
                    this.rel = 'stylesheet';
                };
            }
            document.head.appendChild(link);
        });
    }
    
    // �Ż�ͼƬ����
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
            if (!img.decoding) {
                img.decoding = 'async';
            }
        });
    }
    
    // �Ż��������ű�����
    function optimizeThirdPartyScripts() {
        // �ӳټ��طǹؼ��ű�
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (script.src.includes('aplayer') || 
                script.src.includes('meting') ||
                script.src.includes('live2d')) {
                script.loading = 'lazy';
            }
        });
    }
    
    // ����ҳ��ɼ��Ա仯����ͣ����Ҫ�Ķ���
    function handleVisibilityChange() {
        if (document.hidden) {
            // ҳ�治�ɼ�ʱ��ͣ����
            document.body.classList.add('page-hidden');
        } else {
            // ҳ��ɼ�ʱ�ָ�����
            document.body.classList.remove('page-hidden');
        }
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
    
    // ����δʹ�õ�CSS
    function cleanupUnusedCSS() {
        // �Ƴ�δʹ�õ�CSS��
        const unusedClasses = ['.unused-class'];
        unusedClasses.forEach(className => {
            const elements = document.querySelectorAll(className);
            elements.forEach(el => el.classList.remove(className.substring(1)));
        });
    }
    
    // ��ʼ�������Ż�
    function init() {
        // ����Ƿ�Ϊ�ƶ��豸
        const isMobile = window.innerWidth <= 768;
        
        preloadCriticalResources();
        optimizeImages();
        optimizeThirdPartyScripts();
        optimizeScrollPerformance();
        
        // ����ҳ��ɼ��Ա仯
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // ҳ�������ɺ���Ż�
        window.addEventListener('load', () => {
            cleanupUnusedCSS();
            
            // �ӳ�ִ�зǹؼ�����
            setTimeout(() => {
                // Ԥ���ӵ��ⲿ����
                const domains = ['s2.loli.net', 'i.loli.net', 'www.fomal.cc'];
                domains.forEach(domain => {
                    const link = document.createElement('link');
                    link.rel = 'preconnect';
                    link.href = `https://${domain}`;
                    document.head.appendChild(link);
                });
            }, 2000);
        });
        
        // ���ڴ�С�仯ʱ���Ż�
        window.addEventListener('resize', debounce(() => {
            optimizeImages();
        }, 250));
    }
    
    // ҳ�������ɺ��ʼ��
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
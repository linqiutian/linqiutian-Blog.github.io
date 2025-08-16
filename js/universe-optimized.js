// �Ż��汾��Universe���� - ������������
(function() {
    'use strict';
    
    // ����Ƿ�Ϊ�ƶ��豸���ƶ��豸�����ض���
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        return; // �ƶ��豸ֱ���˳�
    }
    
    // ����û��Ƿ�ƫ�ü��ٶ���
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // �û�ƫ�ü��ٶ�����ֱ���˳�
    }
    
    let canvas, ctx, width, height, stars = [];
    let animationId;
    let isVisible = true;
    
    // ����������������������
    const STAR_COUNT = Math.min(50, Math.floor(window.innerWidth * 0.05));
    
    function initCanvas() {
        canvas = document.getElementById('universe');
        if (!canvas) return false;
        
        ctx = canvas.getContext('2d');
        resizeCanvas();
        return true;
    }
    
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    function createStar() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.8 + 0.2,
            twinkle: Math.random() * 0.02 + 0.01
        };
    }
    
    function updateStar(star) {
        star.x -= star.speed;
        star.opacity += Math.sin(Date.now() * star.twinkle) * 0.1;
        
        if (star.x < 0) {
            star.x = width;
            star.y = Math.random() * height;
        }
        
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
    }
    
    function drawStar(star) {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    function animate() {
        // ֻ����ɫģʽ������
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (!isDark || !isVisible) {
            animationId = requestAnimationFrame(animate);
            return;
        }
        
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < stars.length; i++) {
            updateStar(stars[i]);
            drawStar(stars[i]);
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    function init() {
        if (!initCanvas()) return;
        
        // ��������
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(createStar());
        }
        
        // �������ڴ�С�仯
        window.addEventListener('resize', () => {
            resizeCanvas();
            // ���·ֲ�����
            stars.forEach(star => {
                if (star.x > width) star.x = Math.random() * width;
                if (star.y > height) star.y = Math.random() * height;
            });
        });
        
        // ҳ��ɼ���API - ҳ�治�ɼ�ʱ��ͣ����
        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
        });
        
        animate();
    }
    
    // ҳ�������ɺ��ʼ��
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // ��������
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
})();
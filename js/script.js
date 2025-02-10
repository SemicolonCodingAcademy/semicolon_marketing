// 스크롤 기반 애니메이션
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-fade-up');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            element.classList.add('active');
        }
    });
}

// 스크롤 진행바
function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    document.querySelector('.scroll-progress').style.width = `${scrolled}%`;
}

// 숫자 카운터 애니메이션
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / duration * 10;
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 10);
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // 스크롤 진행바 추가
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // 초기 애니메이션 실행
    handleScrollAnimations();
    
    // 스크롤 이벤트
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        updateScrollProgress();
        
        // 카운터 애니메이션
        document.querySelectorAll('.counter:not(.animated)').forEach(counter => {
            const elementTop = counter.getBoundingClientRect().top;
            if (elementTop < window.innerHeight) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    });

    // 부드러운 요소 등장 효과
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => fadeObserver.observe(element));

    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Intersection Observer로 화면에 보일 때 애니메이션 시작
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const counter = card.querySelector('.counter');
            const target = parseInt(card.dataset.value);
            animateCounter(counter, target);
            observer.unobserve(card);
        }
    });
}, {
    threshold: 0.5
});

// 모든 메트릭 카드에 observer 적용
document.querySelectorAll('.metric-card').forEach(card => {
    observer.observe(card);
});

// 차트 바 애니메이션 개선
document.querySelectorAll('.bar').forEach(bar => {
    const height = bar.style.height;
    bar.style.height = '0';
    
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    bar.style.height = height;
                }, 100);
            }
        });
    }).observe(bar);
}); 
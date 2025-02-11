// DOM 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollNavigation();
    initSmoothScroll();
    initCounters();
    initCharts();
    initCasesFilter();
    initStats();
});

// 모바일 메뉴 초기화
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// 스크롤 네비게이션 초기화
function initScrollNavigation() {
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// 부드러운 스크롤 초기화
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // 모바일 메뉴가 열려있으면 닫기
                document.querySelector('.nav-menu').classList.remove('active');
                document.querySelector('.mobile-menu-btn').classList.remove('active');
            }
        });
    });
}

// 숫자 카운터 애니메이션 초기화
function initCounters() {
    const counters = document.querySelectorAll('.counter, .stat-number');
    let hasStarted = new Set(); // 이미 시작된 카운터를 추적
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted.has(entry.target)) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000; // 2초
                const start = 0;
                const increment = target / (duration / 16); // 60fps 기준
                
                hasStarted.add(counter); // 카운터 시작 표시
                
                let current = start;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.round(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }, {
        threshold: 0.2, // 20% 정도만 보여도 시작
        rootMargin: '50px' // 약간의 여유를 둠
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// 차트 애니메이션 초기화
function initCharts() {
    const bars = document.querySelectorAll('.bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.height = entry.target.dataset.height;
            }
        });
    });

    bars.forEach(bar => {
        const height = bar.style.height;
        bar.dataset.height = height;
        bar.style.height = '0';
        observer.observe(bar);
    });
}

// 성공사례 필터 기능
function initCasesFilter() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const caseCards = document.querySelectorAll('.case-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성 버튼 스타일 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 필터링 로직
            const category = button.textContent.trim();
            
            caseCards.forEach(card => {
                const cardCategory = card.querySelector('.industry-tag').textContent;
                
                if (category === '전체' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
}

// 통계 숫자 초기화 및 애니메이션
function initStats() {
    const stats = [
        { element: document.querySelector('.stats-grid .stat-card:nth-child(1) .stat-value'), value: 72 },
        { element: document.querySelector('.stats-grid .stat-card:nth-child(2) .stat-value'), value: "24/7" },
        { element: document.querySelector('.stats-grid .stat-card:nth-child(3) .stat-value'), value: 100 }
    ];

    stats.forEach(stat => {
        if (stat.element) {
            stat.element.textContent = stat.value;
        }
    });
}

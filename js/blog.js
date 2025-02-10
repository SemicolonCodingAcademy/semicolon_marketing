document.addEventListener('DOMContentLoaded', function() {
    // 실제 포스트 데이터 (예시)
    const posts = [
        { id: 1, title: "2024 디지털 마케팅 트렌드 전망", category: "trend", date: "2024.03.15", readTime: "5분" },
        { id: 2, title: "2024년 서비스 개편 안내", category: "notice", date: "2024.03.14", readTime: "2분" },
        { id: 3, title: "AI 마케팅 전략 가이드", category: "tech", date: "2024.03.13", readTime: "8분" },
        // ... 추가 포스트
    ];

    // 카테고리별 포스트 수 계산 및 표시
    function updateCategoryCounts() {
        const categories = {
            all: posts.length,
            notice: posts.filter(post => post.category === 'notice').length,
            trend: posts.filter(post => post.category === 'trend').length,
            tech: posts.filter(post => post.category === 'tech').length,
            case: posts.filter(post => post.category === 'case').length
        };

        // 카테고리 카운트 업데이트
        Object.keys(categories).forEach(category => {
            const countElement = document.querySelector(`[data-category="${category}"] .count`);
            if (countElement) {
                countElement.textContent = categories[category];
            }
        });
    }

    // 페이지네이션 설정
    const postsPerPage = 6;
    let currentPage = 1;
    const totalPages = Math.ceil(posts.length / postsPerPage);

    function updatePagination() {
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        const pageNumbers = document.querySelector('.page-numbers');
        pageNumbers.innerHTML = '';

        // 실제 페이지 수만큼만 버튼 생성
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i === currentPage) button.classList.add('active');
            button.addEventListener('click', () => loadPage(i));
            pageNumbers.appendChild(button);
        }

        // Prev/Next 버튼 상태 업데이트
        const prevBtn = document.querySelector('.prev-page');
        const nextBtn = document.querySelector('.next-page');
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    }

    // 페이지 로드
    function loadPage(page) {
        currentPage = page;
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const pageItems = posts.slice(start, end);

        // 포스트 표시 로직
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            blogGrid.style.opacity = '0';
            setTimeout(() => {
                // 포스트 HTML 생성 및 표시
                blogGrid.innerHTML = pageItems.map(post => `
                    <article class="blog-card" data-category="${post.category}">
                        <div class="card-icon">
                            <i class="fas ${getCategoryIcon(post.category)}"></i>
                        </div>
                        <div class="card-content">
                            <div class="category-tag">${getCategoryName(post.category)}</div>
                            <div class="meta">
                                <span><i class="far fa-calendar"></i> ${post.date}</span>
                                <span><i class="far fa-clock"></i> ${post.readTime}</span>
                            </div>
                            <h3>${post.title}</h3>
                            <a href="posts/${post.id}.html" class="read-more">
                                자세히 보기 <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </article>
                `).join('');
                blogGrid.style.opacity = '1';
            }, 300);
        }

        updatePagination();
    }

    // 카테고리 필터링
    function filterPosts(category) {
        const filteredPosts = category === 'all' 
            ? posts 
            : posts.filter(post => post.category === category);
        
        currentPage = 1;
        loadPage(1);
    }

    // 카테고리 아이콘 매핑
    function getCategoryIcon(category) {
        const icons = {
            notice: 'fa-bullhorn',
            trend: 'fa-chart-line',
            tech: 'fa-microchip',
            case: 'fa-lightbulb'
        };
        return icons[category] || 'fa-file-alt';
    }

    // 카테고리 이름 매핑
    function getCategoryName(category) {
        const names = {
            notice: '공지사항',
            trend: '트렌드',
            tech: '기술',
            case: '사례연구'
        };
        return names[category] || '기타';
    }

    // 이벤트 리스너 설정
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterPosts(button.dataset.category);
        });
    });

    // 초기화
    updateCategoryCounts();
    loadPage(1);
});

// 검색 함수
function searchPosts(query) {
    if (query.length < 2) return;
    
    // 검색 결과 표시 애니메이션
    document.querySelector('.blog-grid').style.opacity = '0.5';
    
    // 실제 검색 로직은 백엔드와 연동 필요
    setTimeout(() => {
        document.querySelector('.blog-grid').style.opacity = '1';
        // 검색 결과 표시 로직
    }, 500);
}

// 스크롤 이벤트 처리
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}); 
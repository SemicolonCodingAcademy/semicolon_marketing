document.addEventListener('DOMContentLoaded', function() {
    // 필터 기능 구현
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');
    const loadMoreBtn = document.querySelector('.load-more .btn');
    let currentItems = 3;

    // 초기 상태 설정 (처음 3개만 표시)
    function initializeCards() {
        caseCards.forEach((card, index) => {
            if (index < 3) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
        currentItems = 3;
        loadMoreBtn.style.display = 'block';
    }

    // 필터링 함수
    function filterCards(filter) {
        let visibleCount = 0;
        
        caseCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                if (visibleCount < 3) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                }
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });

        currentItems = 3;
        loadMoreBtn.style.display = visibleCount > 3 ? 'block' : 'none';
    }

    // 필터 버튼 이벤트
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCards(button.dataset.filter);
        });
    });

    // 더보기 버튼 이벤트
    loadMoreBtn.addEventListener('click', () => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        let visibleCount = 0;
        let shownCount = 0;

        caseCards.forEach(card => {
            if (activeFilter === 'all' || card.dataset.category === activeFilter) {
                visibleCount++;
                if (visibleCount > currentItems && shownCount < 3) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                    shownCount++;
                }
            }
        });

        currentItems += 3;
        
        // 더 보여줄 카드가 없으면 버튼 숨기기
        const totalVisible = Array.from(caseCards).filter(card => 
            activeFilter === 'all' || card.dataset.category === activeFilter
        ).length;
        
        if (currentItems >= totalVisible) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // 초기 상태 설정
    initializeCards();
}); 
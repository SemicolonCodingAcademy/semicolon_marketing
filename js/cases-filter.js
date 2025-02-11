document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const caseCards = document.querySelectorAll('.case-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const cardsPerView = 3;
    
    // 초기 카드 표시 설정
    function initializeCards() {
        caseCards.forEach((card, index) => {
            if (index < cardsPerView) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 필터링 함수
    function filterCards(category) {
        let visibleCount = 0;
        caseCards.forEach(card => {
            if (category === '전체' || card.dataset.category === category) {
                if (visibleCount < cardsPerView) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // 더보기 버튼 표시 여부 설정
        if (visibleCount <= cardsPerView) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // 더보기 버튼 클릭 이벤트
    loadMoreBtn.addEventListener('click', () => {
        const currentCategory = document.querySelector('.filter-button.active').textContent.toLowerCase();
        const hiddenCards = Array.from(caseCards).filter(card => {
            return card.style.display === 'none' && 
                   (currentCategory === '전체' || card.dataset.category === currentCategory);
        });

        hiddenCards.forEach((card, index) => {
            if (index < cardsPerView) {
                card.style.display = 'block';
            }
        });

        // 모든 카드가 표시되었는지 확인
        if (hiddenCards.length <= cardsPerView) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // 필터 버튼 클릭 이벤트
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCards(button.textContent.toLowerCase());
        });
    });

    // 초기 실행
    initializeCards();
}); 
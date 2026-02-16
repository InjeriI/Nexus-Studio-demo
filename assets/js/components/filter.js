// === ФИЛЬТРАЦИЯ ПОРТФОЛИО ===
        export function initPortfolioFilters() {
            const filterButtons = document.querySelectorAll('[data-filter]');
            const portfolioCards = document.querySelectorAll('.portfolio-card');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Обновление активной кнопки
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const filterValue = button.getAttribute('data-filter');
                    
                    // Фильтрация карточек
                    portfolioCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }
        
        
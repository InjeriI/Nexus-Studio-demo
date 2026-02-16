// === КАРУСЕЛЬ ОТЗЫВОВ ===
        export function initReviewsCarousel() {
            const reviewDots = document.querySelectorAll('[data-review]');
            const reviewCards = document.querySelectorAll('.review-card');
            
            // Создаем дополнительные отзывы для демо
            if (reviewCards.length === 1) {
                const originalReview = reviewCards[0].cloneNode(true);
                
                // Второй отзыв
                const review2 = originalReview.cloneNode(true);
                review2.querySelector('.review-content').textContent = 'Работа с Nexus Studio стала переломным моментом для нашего стартапа. Их подход к разработке мобильного приложения позволил нам выйти на рынок на 2 месяца раньше запланированного срока. Приложение получило 4.9 звезд в магазинах и помогло привлечь первые 10 000 пользователей.';
                review2.querySelector('.author-avatar').textContent = 'МС';
                review2.querySelector('.author-info h4').textContent = 'Михаил Соколов';
                review2.querySelector('.author-info p').textContent = 'Основатель, FitLife';
                review2.querySelector('.review-footer span:last-child').textContent = 'Проект: Мобильное приложение для фитнеса';
                
                // Третий отзыв
                const review3 = originalReview.cloneNode(true);
                review3.querySelector('.review-content').textContent = 'Nexus Studio полностью изменили наше представление о цифровом маркетинге. Благодаря их работе над сайтом и SEO-стратегией, мы увеличили органический трафик на 300% за полгода и значительно повысили конверсию. Команда всегда на связи и готова предложить нестандартные решения.';
                review3.querySelector('.author-avatar').textContent = 'ЕВ';
                review3.querySelector('.author-info h4').textContent = 'Елена Васильева';
                review3.querySelector('.author-info p').textContent = 'Руководитель отдела маркетинга, Bean Coffee';
                review3.querySelector('.review-footer span:last-child').textContent = 'Проект: Ребрендинг и сайт кофейни';
                
                // Добавляем на страницу
                const reviewsContainer = document.querySelector('.reviews-container');
                reviewsContainer.insertBefore(review2, reviewDots[0].parentNode);
                reviewsContainer.insertBefore(review3, reviewDots[0].parentNode);
                
                // Обновляем массив карточек
                const newReviewCards = document.querySelectorAll('.review-card');
                newReviewCards.forEach((card, index) => {
                    if (index > 0) card.style.display = 'none';
                });
            }
            
            let currentReview = 0;
            const totalReviews = document.querySelectorAll('.review-card').length;
            
            reviewDots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const reviewIndex = parseInt(dot.getAttribute('data-review'));
                    showReview(reviewIndex);
                });
            });
            
            // Автоматическое переключение
            setInterval(() => {
                currentReview = (currentReview + 1) % totalReviews;
                showReview(currentReview);
            }, 8000);
            
            function showReview(index) {
                // Скрываем все отзывы
                document.querySelectorAll('.review-card').forEach(card => {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                });
                
                // Показываем выбранный
                const reviewToShow = document.querySelectorAll('.review-card')[index];
                reviewToShow.style.display = 'block';
                setTimeout(() => {
                    reviewToShow.style.opacity = '1';
                }, 50);
                
                // Обновляем активные точки
                reviewDots.forEach(dot => dot.classList.remove('active'));
                reviewDots[index].classList.add('active');
                
                currentReview = index;
            }
        }
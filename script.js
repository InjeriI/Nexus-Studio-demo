// === ИНИЦИАЛИЗАЦИЯ СКРИПТОВ ===
        document.addEventListener('DOMContentLoaded', () => {
            // Переключение темы
            initThemeToggle();
            
            // Мобильное меню
            initMobileMenu();
            
            // Sticky header
            initStickyHeader();

            if (document.body.classList.contains('page-home')) {
            // Анимации при скролле
            initScrollAnimations();
            
            // Счетчики статистики
            initCounters();
            
            // Фильтрация портфолио
            initPortfolioFilters();
            
            // Карусель отзывов (упрощенная)
            initReviewsCarousel();
            }

            if (document.body.classList.contains('page-service')) {
            //Модальное окно улуг
            initServiceModals();

            //Калькулятор услуг
            initCalculator();
            }

            if (document.body.classList.contains('page-portfolio')) {
            //Фильтр карточек портфолио
            initPortfolioFilters();

            //Инициализцаия модальных окон карточек
            initProjectDetailsModal();
            }

            if (document.body.classList.contains('page-blog')) {
            //Поиск по блогу
            initBlogSearch();

            //Подписка на блог
            initBlogSubscription();
            }

            if (document.body.classList.contains('page-contact')) {
            //Инициализация контактной формы
            initContactForm();

            //Инициализация карты
            initMap();

            //Инициализация анимаци иконок соцсетей
            initSocialHover();
            }

        });
        
        // === ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ===
function initThemeToggle() {
    // Сначала получаем тему из localStorage или предпочитаемую системную
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Устанавливаем тему на <html> немедленно
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Находим все кнопки
    const themeToggles = document.querySelectorAll('[data-theme-toggle]');

    // Устанавливаем иконки на всех кнопках
    themeToggles.forEach(toggle => {
        updateThemeIcon(toggle, currentTheme);
    });

    // Добавляем обработчики на все кнопки
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Обновляем иконки ВСЕХ кнопок
            themeToggles.forEach(btn => updateThemeIcon(btn, newTheme));
        });
    });

    function updateThemeIcon(toggle, theme) {
        const icon = toggle.querySelector('svg');
        if (!icon) return;
        if (theme === 'dark') {
            icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />`;
        } else {
            icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />`;
        }
    }
}
        
        // === МОБИЛЬНОЕ МЕНЮ ===
        function initMobileMenu() {
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const burgerButtons = document.querySelectorAll('[data-burger-menu]');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileMenu || burgerButtons.length === 0) return;

    // Обработчик для всех кнопок бургера
    burgerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Переключаем состояние меню
            const isOpen = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = isOpen ? '' : 'hidden';

            // Синхронизируем все кнопки: все должны быть active, если меню открыто
            burgerButtons.forEach(b => {
                if (isOpen) {
                    b.classList.remove('active');
                } else {
                    b.classList.add('active');
                }
            });
        });
    });

    // Закрытие при клике по ссылке
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            burgerButtons.forEach(btn => btn.classList.remove('active'));
            document.body.style.overflow = '';
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        if (
            mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !Array.from(burgerButtons).some(btn => btn.contains(e.target))
        ) {
            mobileMenu.classList.remove('active');
            burgerButtons.forEach(btn => btn.classList.remove('active'));
            document.body.style.overflow = '';
        }
    });
}
        
        // === АНИМАЦИИ ПРИ СКРОЛЛЕ ===
        function initScrollAnimations() {
            const animateElements = document.querySelectorAll('.animate');
            
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = 1;
                            entry.target.style.transform = 'translateY(0)';
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1
                });
                
                animateElements.forEach(el => {
                    el.style.opacity = 0;
                    el.style.transform = 'translateY(20px)';
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(el);
                });
            } else {
                // Fallback для старых браузеров
                animateElements.forEach(el => {
                    el.style.opacity = 1;
                    el.style.transform = 'translateY(0)';
                });
            }
        }
        
        // === СЧЕТЧИКИ СТАТИСТИКИ ===
        function initCounters() {
            const counterElements = document.querySelectorAll('[data-count]');
            
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const target = entry.target;
                            const countTo = parseInt(target.getAttribute('data-count'));
                            const isDecimal = countTo < 10 && countTo > 1;
                            
                            let count = 0;
                            const increment = isDecimal ? 0.1 : Math.max(1, Math.floor(countTo / 50));
                            const duration = 2000; // ms
                            const steps = Math.ceil(duration / 16); // примерно 60 кадров в секунду
                            const stepValue = countTo / steps;
                            
                            const counter = setInterval(() => {
                                count += stepValue;
                                if (count >= countTo) {
                                    count = countTo;
                                    clearInterval(counter);
                                }
                                
                                if (isDecimal) {
                                    target.textContent = count.toFixed(1);
                                } else {
                                    target.textContent = Math.floor(count).toLocaleString('ru-RU');
                                }
                            }, 16);
                            
                            observer.unobserve(target);
                        }
                    });
                }, {
                    threshold: 0.5
                });
                
                counterElements.forEach(el => {
                    observer.observe(el);
                });
            }
        }
        
        // === ФИЛЬТРАЦИЯ ПОРТФОЛИО ===
        function initPortfolioFilters() {
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
        
        // === КАРУСЕЛЬ ОТЗЫВОВ ===
        function initReviewsCarousel() {
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
        
        // === STICKY HEADER ===
        function initStickyHeader() {
            const header = document.querySelector('[data-header]');
            
            if (!header) return;
            
            let lastScrollTop = 0;
            const headerHeight = header.offsetHeight;
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Добавляем класс при скролле вниз больше чем на высоту хедера
                if (scrollTop > headerHeight) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
                
                // Скрываем хедер при скролле вниз, показываем при скролле вверх
                if (scrollTop > lastScrollTop && scrollTop > headerHeight * 2) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            });
        }

        // === СВОЙСТВА УСЛУГ (для модального окна) ===
const serviceData = {
    web: {
        title: "Веб-разработка",
        price: "От $3000",
        description: "Создание современных сайтов и веб-приложений на React, Vue и Next.js. Мы обеспечиваем адаптивный дизайн, высокую производительность и масштабируемую архитектуру.",
        steps: [
            "Анализ и планирование",
            "Проектирование архитектуры",
            "Frontend & Backend разработка",
            "Тестирование и QA",
            "Запуск и поддержка"
        ],
        examples: ["🌐", "🛒", "💼", "📚"]
    },
    mobile: {
        title: "Мобильные приложения",
        price: "От $5000",
        description: "Разработка кроссплатформенных и нативных приложений для iOS и Android с использованием React Native и Flutter. Интуитивный интерфейс и надежная архитектура.",
        steps: [
            "Анализ рынка и пользователей",
            "Прототипирование и дизайн",
            "Разработка под платформы",
            "Тестирование на устройствах",
            "Публикация и поддержка"
        ],
        examples: ["📱", "🔔", "👤", "💳"]
    },
    design: {
        title: "UI/UX дизайн",
        price: "От $2000",
        description: "Продуманные интерфейсы и удобные пользовательские сценарии, созданные на основе исследований и прототипирования. Увеличиваем конверсию и удовлетворенность пользователей.",
        steps: [
            "UX-исследования",
            "Создание карт пользователей",
            "Прототипирование",
            "UI-дизайн",
            "Тестирование интерфейса"
        ],
        examples: ["🎨", "📋", "👥", "💡"]
    },
    branding: {
        title: "Брендинг и айдентика",
        price: "От $1500",
        description: "Разработка уникального визуального стиля, логотипов, фирменных цветов и шрифтов для вашего бренда. Создаем узнаваемый и запоминающийся образ.",
        steps: [
            "Анализ конкурентов",
            "Разработка стратегии бренда",
            "Создание логотипа",
            "Разработка гайдлайнов",
            "Визуализация бренд-буклета"
        ],
        examples: ["🏷️", "🎨", "📄", "✏️"]
    },
    marketing: {
        title: "SEO и цифровой маркетинг",
        price: "От $1000/мес",
        description: "Продвижение сайтов в поисковых системах и настройка систем аналитики для отслеживания эффективности. Привлекаем целевую аудиторию и увеличиваем продажи.",
        steps: [
            "Анализ текущего состояния",
            "Оптимизация сайта",
            "Продвижение в поиске",
            "Контекстная реклама",
            "Отчетность и аналитика"
        ],
        examples: ["🔍", "📈", "📢", "📊"]
    },
    support: {
        title: "Поддержка и аудит",
        price: "От $500/мес",
        description: "Техническая поддержка, мониторинг, оптимизация и аудит существующих цифровых продуктов. Обеспечиваем стабильную и безопасную работу ваших сервисов.",
        steps: [
            "Технический аудит",
            "Оптимизация производительности",
            "Мониторинг и логирование",
            "Регулярные обновления",
            "Резервное копирование"
        ],
        examples: ["🔧", "🛡️", "⚙️", "📈"]
    }
};

// === МОДАЛЬНОЕ ОКНО ===
function initServiceModals() {
    const serviceCards = document.querySelectorAll('.service-card');
    const modalOverlay = document.getElementById('service-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalStepsList = document.getElementById('modal-steps-list');
    const modalExamplesList = document.getElementById('modal-examples-list');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
            const serviceInfo = serviceData[serviceKey];

            if (serviceInfo) {
                modalTitle.textContent = serviceInfo.title;
                modalPrice.textContent = serviceInfo.price;
                modalDescription.textContent = serviceInfo.description;

                // Обновляем список этапов
                modalStepsList.innerHTML = '';
                serviceInfo.steps.forEach(step => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    modalStepsList.appendChild(li);
                });

                // Обновляем примеры
                modalExamplesList.innerHTML = '';
                serviceInfo.examples.forEach(example => {
                    const exampleCard = document.createElement('div');
                    exampleCard.className = 'example-card';
                    exampleCard.textContent = example;
                    modalExamplesList.appendChild(exampleCard);
                });

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// === КАЛЬКУЛЯТОР СТОИМОСТИ ===
function initCalculator() {
    const baseSelect = document.getElementById('base-service');
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    const totalCostElement = document.getElementById('total-cost');

    // Цены для базовых услуг
    const basePrices = {
        web: 3000,
        mobile: 5000,
        design: 2000
    };

    function calculateTotal() {
        let total = basePrices[baseSelect.value] || 3000;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseInt(checkbox.getAttribute('data-price')) || 0;
            }
        });

        totalCostElement.textContent = `$${total.toLocaleString()}`;
    }

    baseSelect.addEventListener('change', calculateTotal);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    // Инициализация
    calculateTotal();
}

// === ФИЛЬТРАЦИЯ ПОРТФОЛИО ===
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
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

// === ДАННЫЕ ПРОЕКТОВ === //
const projectData = {
    'eco-market': {
        title: "Эко-Маркет",
        hero: "🌐",
        task: "Создать платформу для продажи экологичных товаров с возможностью регистрации пользователей, личного кабинета и системы лояльности.",
        solution: "Разработали современный веб-сайт и мобильное приложение с интуитивным интерфейсом. Интегрировали систему оплаты, учёт остатков и push-уведомления.",
        result: "+200% конверсии после запуска. Пользователи отметили удобство и высокое качество обслуживания.",
        tech: ["React", "Node.js", "MongoDB", "React Native", "Firebase"],
        gallery: ["🖼️", "📱", "🛒", "📊"],
        quote: "Nexus Studio превзошли все наши ожидания. Они не просто создали сайт, а полностью пересмотрели наш подход к цифровому присутствию.",
        author: "Анна Козлова, Маркетинговый директор",
        demoUrl: "#"
    },
    'bean-coffee': {
        title: "Кофейня Bean",
        hero: "☕",
        task: "Провести полный ребрендинг сети кофеен: создать новую айдентику, упаковку, сайт и мобильное приложение для заказа.",
        solution: "Разработали уникальный визуальный стиль, логотип, упаковку. Создали сайт с интеграцией онлайн-заказа и приложение для iOS и Android.",
        result: "+150% узнаваемости бренда. Награда за лучший дизайн упаковки на международном конкурсе.",
        tech: ["Figma", "UI/UX", "React", "Express", "PostgreSQL", "Flutter"],
        gallery: ["🎨", "🏷️", "🛒", "📱"],
        quote: "Nexus Studio полностью изменили наше представление о брендинге. Работа была выполнена на высшем уровне.",
        author: "Петр Иванов, Основатель Bean Coffee",
        demoUrl: "#"
    },
    'fitlife-app': {
        title: "FitLife",
        hero: "💪",
        task: "Разработать мобильное приложение для трекинга фитнес-активности и составления персонализированных программ тренировок.",
        solution: "Создали приложение с возможностью выбора целей, отслеживания прогресса, интеграцией с фитнес-устройствами и социальной сетью.",
        result: "4.9/5 в App Store и Google Play. Более 100 000 скачиваний за первые 3 месяца.",
        tech: ["React Native", "Node.js", "Redux", "MongoDB", "Apple HealthKit", "Google Fit"],
        gallery: ["📱", "📊", "💪", "👥"],
        quote: "Приложение стало настоящим прорывом для нашего стартапа. Пользователи в восторге от функционала и дизайна.",
        author: "Михаил Соколов, CEO FitLife",
        demoUrl: "#"
    },
    'marketpro': {
        title: "MarketPro",
        hero: "🛒",
        task: "Создать современный интернет-магазин с интеграцией CRM и системой аналитики.",
        solution: "Разработали e-commerce платформу с адаптивным дизайном, системой управления товарами и аналитикой поведения пользователей.",
        result: "+120% заказов за первый квартал. Улучшенная конверсия и снижение отказов.",
        tech: ["Vue.js", "Vuex", "Laravel", "MySQL", "Chart.js", "Stripe"],
        gallery: ["🛒", "📊", "📦", "📈"],
        quote: "MarketPro стал флагманским проектом нашей компании. Спасибо команде Nexus за профессиональный подход.",
        author: "Елена Васильева, Руководитель отдела продаж",
        demoUrl: "#"
    },
    'techstart-brand': {
        title: "TechStart",
        hero: "🚀",
        task: "Разработать уникальный визуальный стиль для стартапа в сфере IT.",
        solution: "Создали логотип, фирменные цвета, шрифты, гайдлайн, презентации, визитки и упаковку для оборудования.",
        result: "Награда за лучший бренд на международном конкурсе стартапов. Узнаваемость бренда выросла на 250%.",
        tech: ["Adobe Creative Suite", "Branding", "Print Design", "Figma"],
        gallery: ["🎨", "🏷️", "📄", "📦"],
        quote: "TechStart стал известен благодаря нашему уникальному бренду. Это стало возможным благодаря Nexus Studio.",
        author: "Алексей Петров, Основатель TechStart",
        demoUrl: "#"
    },
    'businesshub': {
        title: "BusinessHub",
        hero: "💼",
        task: "Разработать корпоративную платформу для управления проектами и командами.",
        solution: "Создали веб-платформу с календарем, задачами, чатом, документооборотом и аналитикой производительности.",
        result: "+300% эффективности работы команд. Сокращение сроков реализации проектов на 40%.",
        tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Socket.io"],
        gallery: ["💼", "📅", "💬", "📊"],
        quote: "BusinessHub изменил наш подход к управлению. Это лучший инструмент, который мы когда-либо использовали.",
        author: "Ирина Смирнова, COO Корпорации X",
        demoUrl: "#"
    }
};

// === МОДАЛЬНОЕ ОКНО ДЕТАЛЕЙ ПРОЕКТА ===
function initProjectDetailsModal() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const modalOverlay = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalHero = document.getElementById('modal-hero');
    const modalTask = document.getElementById('modal-task');
    const modalSolution = document.getElementById('modal-solution');
    const modalResult = document.getElementById('modal-result');
    const modalTechStack = document.getElementById('modal-tech-stack');
    const modalGallery = document.getElementById('modal-gallery');
    const modalQuote = document.getElementById('modal-quote');
    const viewProjectBtn = document.getElementById('view-project-btn');

    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const projectInfo = projectData[projectId];

            if (projectInfo) {
                modalTitle.textContent = projectInfo.title;
                modalHero.textContent = projectInfo.hero;
                modalTask.textContent = projectInfo.task;
                modalSolution.textContent = projectInfo.solution;
                modalResult.textContent = projectInfo.result;

                // Обновляем стек технологий
                modalTechStack.innerHTML = '';
                projectInfo.tech.forEach(tech => {
                    const item = document.createElement('span');
                    item.className = 'tech-item';
                    item.textContent = tech;
                    modalTechStack.appendChild(item);
                });

                // Обновляем галерею
                modalGallery.innerHTML = '';
                projectInfo.gallery.forEach(item => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.textContent = item;
                    modalGallery.appendChild(galleryItem);
                });

                // Обновляем цитату
                modalQuote.innerHTML = `<p>"${projectInfo.quote}"</p><cite>- ${projectInfo.author}</cite>`;

                // Обновляем кнопку
                viewProjectBtn.href = projectInfo.demoUrl;

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// === ПОИСК В БЛОГЕ ===
function initBlogSearch() {
    const searchInput = document.querySelector('[data-search-input]');
    const searchResults = document.querySelector('[data-search-results]');

    if (!searchInput) return;

    // Фиктивные данные для автодополнения
    const blogPosts = [
        { title: "Как создать производительный React-проект с нуля", url: "blog-post.html?id=1" },
        { title: "UX-исследования: как понять, чего хочет пользователь", url: "blog-post.html?id=2" },
        { title: "Flutter vs. React Native: сравнение в 2026 году", url: "blog-post.html?id=3" },
        { title: "Как поднять сайт в поисковой выдаче без бюджета", url: "blog-post.html?id=4" },
        { title: "Как настроить Google Analytics 4 для e-commerce", url: "blog-post.html?id=5" },
        { title: "Как создать узнаваемый бренд с нуля", url: "blog-post.html?id=6" }
    ];

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        searchResults.innerHTML = '';

        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        const results = blogPosts.filter(post =>
            post.title.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            results.forEach(result => {
                const item = document.createElement('a');
                item.href = result.url;
                item.className = 'search-result-item';
                item.textContent = result.title;
                searchResults.appendChild(item);
            });
            searchResults.classList.add('active');
        } else {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.textContent = 'Ничего не найдено';
            item.style.cursor = 'default';
            searchResults.appendChild(item);
            searchResults.classList.add('active');
        }
    });

    // Закрытие результатов при клике вне поля
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

// === ПОДПИСКА НА БЛОГ ===
function initBlogSubscription() {
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (!subscribeForm) return;

    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = subscribeForm.querySelector('input[type="email"]').value;
        
        // В реальном проекте здесь был бы запрос на сервер
        alert(`Спасибо за подписку!\nНа ${email} будут приходить новые статьи.`);
        subscribeForm.reset();
    });
}

// === ВАЛИДАЦИЯ ФОРМЫ КОНТАКТОВ ===
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Проверка валидности
        let isValid = true;
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });

        if (isValid) {
            // Анимация отправки
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            // Имитация отправки (в реальном проекте здесь был бы fetch)
            setTimeout(() => {
                alert('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        }
    });

    // Валидация в реальном времени
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.checkValidity()) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
    });
}

// === ИНИЦИАЛИЗАЦИЯ КАРТЫ (Leaflet) === //
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Создаем карту
    const map = L.map(mapContainer, {
        center: [55.7558, 37.6173], // Москва
        zoom: 15,
        scrollWheelZoom: false,
        dragging: true,
        touchZoom: true
    });

    // Добавляем темный слой (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Добавляем неоновый маркер
    const neonIcon = L.divIcon({
        className: 'neon-marker',
        html: `<div style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: radial-gradient(circle, #7e3af2 0%, #0ea5e9 70%);
            box-shadow: 0 0 15px rgba(126, 58, 242, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            color: white;
            font-weight: bold;
        ">📍</div>`,
        popupAnchor: [0, -20]
    });

    L.marker([55.7558, 37.6173], { icon: neonIcon })
        .addTo(map)
        .bindPopup('<h3>Nexus Studio</h3><p>Москва, ул. Тверская, 15</p>')
        .openPopup();

    // Адаптивность: обновляем размер при изменении окна
    window.addEventListener('resize', () => {
        map.invalidateSize();
    });
}

// === ИНИЦИАЛИЗАЦИЯ СОЦСЕТЕЙ ===
function initSocialHover() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
    });
}
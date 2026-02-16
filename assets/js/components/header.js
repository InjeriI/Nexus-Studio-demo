

// === МОБИЛЬНОЕ МЕНЮ ===
        export function initMobileMenu() {
            const burgerMenu = document.querySelector('[data-burger-menu]');
            const mobileMenu = document.querySelector('[data-mobile-menu]');
            const mobileLinks = document.querySelectorAll('.mobile-nav-link');
            
            if (!burgerMenu || !mobileMenu) return;
            
            // Переключение меню
            burgerMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                burgerMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Закрытие меню при клике на ссылку
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Закрытие меню при клике вне его
            document.addEventListener('click', (e) => {
                if (mobileMenu.classList.contains('active') && 
                    !mobileMenu.contains(e.target) && 
                    !burgerMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            
        }

        // === STICKY HEADER ===
        export function initStickyHeader() {
            const header = document.querySelector('[data-header]');
            
            //if (!header) return;
            if (!header) {
        console.error('❌ [initStickyHeader] Элемент [data-header] не найден!');
        return;
    }
    
    console.log('✅ [initStickyHeader] Хедер найден:', header);
            
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

export function initHeaderComponents() {
    initMobileMenu();
    initStickyHeader();
    }
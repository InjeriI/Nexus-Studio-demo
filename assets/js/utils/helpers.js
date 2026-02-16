 // === STICKY HEADER ===
        export function initStickyHeader() {
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
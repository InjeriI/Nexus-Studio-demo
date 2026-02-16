// === АНИМАЦИИ ПРИ СКРОЛЛЕ ===
        export function initScrollAnimations() {
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
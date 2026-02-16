          // === СЧЕТЧИКИ СТАТИСТИКИ ===
        export function initCounters() {
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
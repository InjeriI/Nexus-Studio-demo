// assets/js/utils/includeHTML.js
export function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const path = el.getAttribute('data-include');
    fetch(path)
      .then(response => response.text())
      .then(data => {
        el.innerHTML = data;
        // Инициализация скриптов после вставки (например, бургер-меню)
        if (path.includes('header')) {
        // Задержка, чтобы DOM обновился
          setTimeout(() => {
        if (typeof window.initHeaderComponents === 'function') {
            window.initHeaderComponents();
        }
    }, 0);
}
      })
      .catch(err => console.warn(`Ошибка загрузки ${path}:`, err));
  });
}

// Вызов после DOMContentLoaded в main.js
document.addEventListener('DOMContentLoaded', includeHTML);
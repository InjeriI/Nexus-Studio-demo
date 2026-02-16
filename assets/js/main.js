import { includeHTML } from './utils/includeHTML.js';
import { initThemeToggle } from './utils/theme.js';
import { initMobileMenu, initStickyHeader } from './components/header.js';
import { initScrollAnimations } from './utils/animations.js';
import { initReviewsCarousel } from './components/carousel.js';
import { initPortfolioFilters } from './components/filter.js';
import { initCounters } from './pages/home.js';

// === ИНИЦИАЛИЗАЦИЯ СКРИПТОВ ===
        document.addEventListener('DOMContentLoaded', () => {
    includeHTML();
    initThemeToggle();
    initMobileMenu();
    initStickyHeader();
    initScrollAnimations();
    initReviewsCarousel();
    initPortfolioFilters();

    if (document.body.classList.contains('page-home')) {
        initCounters();
        // другие инициализации для главной
    }
    });
    
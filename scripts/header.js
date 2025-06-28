document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const scrollThreshold = 10; // Количество пикселей прокрутки, после которого добавляется класс

    window.addEventListener('scroll', function () {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const burger = document.querySelector('.burger');
    const burgerMenu = document.querySelector('.menu_mobile');
    const burgerMenuClose = document.querySelector('.menu_mobile_close');

    burger.addEventListener('click', () => {
        burgerMenu.classList.add('is-open');
        isNoScrolled(true)

    });
    burgerMenuClose.addEventListener('click', () => {
        burgerMenu.classList.remove('is-open');
        isNoScrolled(false)
    });

    function isNoScrolled(bool) {
        const body = document.body;
        const html = document.documentElement;
        if (bool) {
            body.classList.add('no-scrolled');
            html.classList.add('no-scrolled');
        } else {
            body.classList.remove('no-scrolled');
            html.classList.remove('no-scrolled');
        }

    }
});
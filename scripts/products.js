document.addEventListener('DOMContentLoaded', function() {
  // Инициализируем все свайперы на странице
  const swipers = document.querySelectorAll('.product_swiper');
  
  swipers.forEach(swiperEl => {
    const swiper = new Swiper(swiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 48,
      pagination: {
        el: swiperEl.querySelector('.swiper-pagination'),
        clickable: true,
      },
      
      on: {
        init: function() {
          togglePagination(this);
        },
        resize: function() {
          togglePagination(this);
        }
      }
    });
  });
  
  function togglePagination(swiperInstance) {
    const pagination = swiperInstance.pagination.el;
    const slidesCount = swiperInstance.slides.length;
    const slidesPerView = swiperInstance.params.slidesPerView;
    
    // Для 'auto' вычисляем видимые слайды
    if (slidesPerView === 'auto') {
      const containerWidth = swiperInstance.width;
      let visibleSlides = 0;
      let totalWidth = 0;
      
      for (let i = 0; i < slidesCount; i++) {
        totalWidth += swiperInstance.slides[i].swiperSlideSize + swiperInstance.params.spaceBetween;
        if (totalWidth <= containerWidth) {
          visibleSlides++;
        } else {
          break;
        }
      }
      
      pagination.style.display = slidesCount > visibleSlides ? 'flex' : 'none';
    } else {
      pagination.style.display = slidesCount > slidesPerView ? 'flex' : 'none';
    }
  }
});
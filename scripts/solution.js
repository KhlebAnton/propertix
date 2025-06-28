document.addEventListener('DOMContentLoaded', function() {
  const solutionItems = document.querySelectorAll('.solutions__item');
  
  solutionItems.forEach(item => {
    // Обработчик для hover
    item.addEventListener('mouseenter', function() {
      // Удаляем класс open у всех элементов
      solutionItems.forEach(el => el.classList.remove('open'));
      // Добавляем класс open текущему элементу
      this.classList.add('open');
    });
    
    // Обработчик для клика (tap на мобильных устройствах)
    item.addEventListener('click', function() {
      // Удаляем класс open у всех элементов
      solutionItems.forEach(el => el.classList.remove('open'));
      // Добавляем класс open текущему элементу
      this.classList.add('open');
    });
  });
});
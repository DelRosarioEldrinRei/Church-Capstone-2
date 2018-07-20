window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('fadeOut');
  }, 300);
  $(document).ready(function(){
    $('#wrapper').fadeIn(600);
  });
});
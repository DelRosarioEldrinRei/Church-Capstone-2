window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('fadeOut');
  }, 300);
  $(document).ready(function(){
    $('#wrapper').fadeIn(700);  
  });
});

//for lifehack para sa document request dahil nagmamadali na
// window.addEventListener('load', () => {
//   setTimeout(() => {
//     $('#inquireModal').modal('show');
//   }, 700);  
// });
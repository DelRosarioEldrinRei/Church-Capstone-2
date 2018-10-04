window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('fadeOut');
  }, 100);
  $(document).ready(function(){
    $('#wrapper').fadeIn(500);  
  });
});

//for lifehack para sa document request dahil nagmamadali na
// window.addEventListener('load', () => {
//   setTimeout(() => {
//     $('#inquireModal').modal('show');
//   }, 700);  
// });
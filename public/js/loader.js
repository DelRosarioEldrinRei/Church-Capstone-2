window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('fadeOut');
  }, 100);
  $(document).ready(function(){
    $('#wrapper').fadeIn(500); 
    // setTimeout(() => {
    //   const Toast = Swal.mixin({
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     timer: 3000
    //   });
    //   Toast.fire({
    //     type: 'success',
    //     title: 'Signed in successfully'
    //   })
    // }, 500);
  });
});

//for lifehack para sa document request dahil nagmamadali na
// window.addEventListener('load', () => {
//   setTimeout(() => {
//     $('#inquireModal').modal('show');
//   }, 700);  
// });
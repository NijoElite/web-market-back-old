// ================
// REG FORM START
const regForm = $('#reg-form');

$('#reg-close').click(function() {
  regForm.removeClass('active');
});

$('#reg-link').click(function(e) {
  e.preventDefault();
  regForm.addClass('active');
});

$('#reg-submit').click(function(e) {
  e.preventDefault();
  $.ajax({
    url: '/api/reg',
    data: $(regForm).serialize(),
    type: 'POST',
  }).done((e) =>{
    console.log(e);
  });
});
// REG FORM END
// ================


// ================
// LOGIN FORM START
const loginForm = $('#login-form');

$('#login-close').click(function() {
  loginForm.removeClass('active');
});

$('#login-submit').click(function(e) {
  e.preventDefault();
  $.ajax({
    url: '/api/auth/login',
    data: $(loginForm).serialize(),
    type: 'POST',
  }).done((e) =>{
    console.log(e);
  });
});

$('#login-link').click(function(e) {
  e.preventDefault();
  loginForm.addClass('active');
});
// LOGIN FORM END
// ================

// ================
// OWL CAROUSEL START
$('.owl-carousel').owlCarousel({
  loop: true,
  nav: false,
  responsive: {
    0: {
      items: 1,
    },
  },
});
// OWL CAROUSEL END
// ================

const regForm = $('#reg-form');

$('#reg-close').click(function() {
  regForm.removeClass('active');
});

$('#reg-link').click(function(e) {
  e.preventDefault();
  regForm.addClass('active');
});

$('#reg-submit', function(e) {
  $.ajax({
    url: '/api/reg',
    data: $(regForm).serialize(),
    type: 'POST',
  }).done((e) =>{
    console.log(e);
  });
});

const loginForm = $('#login-form');

$('#login-close').click(function() {
  loginForm.removeClass('active');
});

$('#login-link').click(function(e) {
  e.preventDefault();
  loginForm.addClass('active');
});

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
    alert('Ваш аккаунт зарегистрирован\n' +
        'Письмо с подтверждением отправлено на почту ' + e.data.email);
  }).fail((e) => {
    alert('Проверьте введенные поля');
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
    location.reload();
  }).fail((e) => {
    alert('Неправильная комбинация логин/пароль');
  });
});

$('#login-link').click(function(e) {
  e.preventDefault();
  loginForm.addClass('active');
});
// LOGIN FORM END
// ================

// ================
// LOGOUT START
$('#logout-link').click(function(e) {
  e.preventDefault();
  $.ajax({
    url: 'api/auth/logout',
    type: 'GET',
  }).done( () => {
    location.reload();
  }
  );
});
// LOGOUT END
// ================

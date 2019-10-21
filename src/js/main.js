// #region FORM
const closeAllModalForms = () => {
  $('.modal-form').removeClass('modal-form--active');
};

const closeForm = (formId) => {
  $('#' + formId).removeClass('modal-form--active');
};

$('.modal-form__input-field').focus(function(e) {
  $(this).parent().addClass('modal-form__input--focus');
});

$('.modal-form__input-field').blur(function(e) {
  if (!$(this).val()) {
    $(this).parent().removeClass('modal-form__input--focus');
  }
});

$('.modal-form__close-button').click(function(e) {
  const formId = $(this).attr('data-form');
  closeForm(formId);
});

$('.modal-form').click(function(e) {
  const target = $(e.target);

  if (target.is('form')) {
    closeForm(target.attr('id'));
  }
});

$('.modal-form__input-field').each(function(index) {
  if ($(this).val()) {
    $(this).parent().addClass('modal-form__input--focus');
  }
});
// #endregion


// #region REG FORM
const regForm = $('#reg-form');

$('#reg-link').click(function(e) {
  e.preventDefault();
  closeAllModalForms();
  regForm.addClass('modal-form--active');
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
    console.log(e);
  });
});
// #endregion


// #region LOGIN FORM
const loginForm = $('#login-form');

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
  closeAllModalForms();
  loginForm.addClass('modal-form--active');
});
// #endregion


// #region OWL CAROUSEL
$('.owl-carousel').owlCarousel({
  loop: true,
  nav: false,
  mouseDrag: false,
  autoplay: true,
  autoplayTimeout: 5000,
  responsive: {
    0: {
      items: 1,
    },
  },
});
// #endregion


// #region LOGOUT
$('#logout-link').click(function(e) {
  e.preventDefault();
  $.ajax({
    url: '/api/auth/logout',
    type: 'GET',
  }).done( () => {
    location.reload();
  }
  );
});
// #endregion


// #region CART
const onAddCartClick = (button) => {
  const promise = new Promise(function(resolve, reject) {
    if (button.dataset.ordered) {
      return window.location='/cart';
    }

    $.ajax({
      url: '/api/cart/add',
      type: 'POST',
      data: {article: button.dataset.article},
    }).done((data) => {
      if (button.dataset.orderedText) {
        button.dataset.ordered = true;
        $(button).text(button.dataset.orderedText);
      }

      resolve(data);
    }).fail((err) => {
      reject(err);
    });
  });

  return promise;
};

const onRemoveCartClick = (button) => {
  const promise = new Promise(function(resolve, reject) {
    $.ajax({
      url: '/api/cart/remove',
      type: 'POST',
      data: {article: button.dataset.article, count: button.dataset.count},
    }).done((data) => {
      resolve(data);
    }).fail((err) => {
      reject(err);
    });
  });

  return promise;
};


// #endregion

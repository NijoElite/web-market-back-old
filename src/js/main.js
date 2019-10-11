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
const addToCart = (article) => {
  const stringCart = window.localStorage.getItem('cart');
  const cart = stringCart ? JSON.parse(stringCart) : {};

  if (cart[article]) {
    cart[article]++;
  } else {
    cart[article] = 1;
  }

  window.localStorage.setItem('cart', JSON.stringify(cart));
};

const removeFromCart = (article, deleteAll) => {
  const stringCart = window.localStorage.getItem('cart');
  const cart = stringCart ? JSON.parse(stringCart) : {};

  if (cart[article]) {
    cart[article] = Math.max(0, cart[article] - 1);
  }

  if (cart[article] === 0 || deleteAll) {
    delete cart[article];
  }

  window.localStorage.setItem('cart', JSON.stringify(cart));
};

const updateCartItems = () => {
  $.ajax({
    url: 'ajax/cart',
    type: 'POST',
    data: JSON.parse(window.localStorage.getItem('cart')),
  }).done((data) => {
    $('#cart').html(data);
    $('.cart-list-item__action-btn--add').click(function(e) {
      addToCart(this.dataset.article);
      updateCartItems();
    });

    $('.cart-list-item__action-btn--remove').click(function(e) {
      removeFromCart(this.dataset.article);
      updateCartItems();
    });

    $('.cart-list-item__action-btn--delete').click(function(e) {
      removeFromCart(this.dataset.article, true);
      updateCartItems();
    });
  });
};

$('#add-product-btn').click(function(e) {
  if (this.dataset.ordered) {
    return;
  }
  addToCart(this.dataset.article);

  this.dataset.ordered = true;

  $(this).text('Перейти в корзину');
  $(this).addClass('ordered');
  $(this).click(() => window.location='/cart');
});

// if it is cart page ajax request for items
if ($('#cart').length !== 0) {
  updateCartItems();
}
// #endregion

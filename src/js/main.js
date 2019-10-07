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

// ================
// CART START
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

// CART END
// ================


// ================

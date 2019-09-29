const regLink = document.getElementById('reg-link');
const regForm = document.getElementById('reg-form');
const regSubmit = document.getElementById('reg-submit');
const regClose = document.getElementById('reg-close');

regClose.addEventListener('click', (e) => {
  regForm.classList.remove('active');
});

regLink.addEventListener('click', (e) => {
  e.preventDefault();

  regForm.classList.add('active');
});

regSubmit.addEventListener('click', (e) => {
  $.ajax({
    url: '/api/reg',
    data: $(regForm).serialize(),
    type: 'POST',
  }).done((e) =>{
    console.log(e);
  });
});


const express = require('express');
const router = new express.Router();

// TODO: pass orders to render
router.get('/', function(req, res, next) {
  res.render('pages/cabinet/user');
});


router.post('/password', async function(req, res, next) {
  const user = req.user;
  user.password = req.body.password;
  try {
    await user.save();
    return res.render('pages/cabinet/user', {message:
      {text: 'Пароль изменен', type: 'success'}});
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.render('pages/cabinet/user', {message:
        {text: 'Не выполнены все условия для нового пароля', type: 'error'}});
    }
    next(e);
  }
});

module.exports = router;

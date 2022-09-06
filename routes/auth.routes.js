const router = require('express').Router();
const UserModel = require('../models/User.model');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});
router.get('/login', (req, res) => {
  res.render('auth/login');
});
/**
 *  POST
 */
router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  const newUser = new UserModel({ username, password });
  newUser
    .save()
    .then((user) => {
      // req.session.user = user;
      res.redirect('/auth/login');
    })
    .catch((err) => {
      console.log(err);
      res.render('auth/signup', { messageError: 'Ha ocurrido un error' });
    });
});
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username }).then((user) => {
    if (user) {
      if (user.comparePassword(password)) {
        req.session.user = user;
        res.redirect('/post');
      } else {
        res.render('/auth/login', {
          messageError: 'Username or password invalid',
        });
      }
    } else {
      res.render('/auth/login', {
        messageError: 'Username or password invalid',
      });
    }
  });
});

module.exports = router;

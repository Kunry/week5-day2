const router = require('express').Router();
const { ADMIN, COMPANY } = require('../const/user.const');
const { roleValidation } = require('../middleware/roles.middleware');

/**
 * roleValidation --> function(role) {
 *  return function (req, res, next {
 *      ....
 *    }
 * }
 * 
 * 
 * roleValidation('ADMIN') --> (req, res, next) => {}
 */


router.get('/', roleValidation([ADMIN, COMPANY]), (req, res, next) => {
  res.render('post/index');
})

module.exports = router;
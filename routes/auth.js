const router = require('express').Router();

const auth = require('../controllers/auth');

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/verify/:token', auth.verify);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset/', auth.resetPassword);

module.exports = router;
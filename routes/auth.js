const router = require('express').Router();

const auth = require('../controllers/auth');

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/verify/:token', auth.verify);

module.exports = router;
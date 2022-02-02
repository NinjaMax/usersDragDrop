const Router = require('express');
const authController = require('../controllers/authController');

const router = new Router();

router.get('/google/url', authController.getLoginUrl);
router.delete('/logout', authController.getLogOut);
router.get('/google', authController.getGoogleUser);
router.get('/user/google', authController.getCurrentUser);

module.exports = router;
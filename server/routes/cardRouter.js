const Router = require('express');
const cardsController = require('../controllers/cardController');

const router = new Router();

router.post('/',  cardsController.create);



module.exports = router;
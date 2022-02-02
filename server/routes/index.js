const Router = require('express');
const authRouter = require('./authRouter');
const cardRouter = require('./cardRouter');
const userRouter = require('./userRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/card', cardRouter);
router.use('/auth', authRouter);


module.exports = router;
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bubbleRoutes = require('./bubbleRoutes');
const commentRoutes = require('./commentRoutes')

router.use('/users', userRoutes);
router.use('/bubble', bubbleRoutes);
router.use('/comment', commentRoutes)

module.exports = router;

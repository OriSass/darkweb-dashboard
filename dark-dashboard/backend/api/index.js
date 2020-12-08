const { Router } = require('express');

const router = Router();

router.use('/posts', require('./routes/posts'));
router.use('/search', require('./routes/search'));

module.exports = router;
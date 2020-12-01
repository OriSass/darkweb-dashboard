const { Router } = require('express');

const router = Router();

router.use('/posts', require('./routes/posts'));

module.exports = router;
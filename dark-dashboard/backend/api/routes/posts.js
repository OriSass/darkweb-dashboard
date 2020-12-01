const { Router } = require('express');
const router = Router();
const { Posts } = require('../../models')

router.get('/', async(request, response) => {
    const allPosts = await Posts.findAll();
    response.json(allPosts);
});

module.exports = router;

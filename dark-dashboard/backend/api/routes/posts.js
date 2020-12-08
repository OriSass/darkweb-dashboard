const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { Posts } = require('../../models')


router.get('/all', async(request, response) => {
    try {
        const allPosts = await Posts.findAll();
        response.json(allPosts);
    } catch (error) {
        response.status(405).send(error.message);
    }
});
router.get('/scrape', async(request, response) => {
    try {
        const {data} = await axios("http://localhost:5000/scraping-init");
        response.json(data);
    } catch (error) {
        response.status(404).send(error.message);
    }
});

module.exports = router;

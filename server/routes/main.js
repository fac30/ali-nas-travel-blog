const express = require('express');
const router = express.Router();


// routes
router.get('/', (req, res) => {
    const locals = {
        title: "Travel Blog",
        description: "A blog for travellers to post about the places they are and have been."
    }

    res.render('index', locals);
})


module.exports = router;
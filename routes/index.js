// import router
const router = require('express').Router();

// import api
const apiRoutes = require('./api');

// prefix for all routes
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> 404 Error!</h1>');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const roadmaps = require('../Controllers/roadmaps');

router.post('/', roadmaps.fetchRoadmaps);

module.exports = router;

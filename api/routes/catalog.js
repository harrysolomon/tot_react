var express = require('express');
var router = express.Router();

// Require controller modules.
var tile_controller = require('../controllers/tileController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', tile_controller.tile_list);

module.exports = router;
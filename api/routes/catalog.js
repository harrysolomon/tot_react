var express = require('express');
var router = express.Router();

// Require controller modules.
var tile_controller = require('../controllers/tileController');
var form_input_controller = require('../controllers/tileFormInputController');
var line_chart_controller = require('../controllers/lineChartController')

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', tile_controller.tile_list);

router.get('/5fac52be03ff66099d9a8ef4', form_input_controller.form_input);

router.get('/line_chart', line_chart_controller.lineChart);

module.exports = router;
var express = require('express');
var router = express.Router();

// Require controller modules.
var tile_controller = require('../controllers/tileController');
var form_input_controller = require('../controllers/tileFormInputController');
var line_chart_controller = require('../controllers/lineChartController');
//var testing_controller = require('../controllers/testingController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', tile_controller.tile_list);

router.get('/:id', form_input_controller.form_input);

router.post('/:id/line_chart', line_chart_controller.lineChart);

//router.get('/:id/test', testing_controller.testing);

module.exports = router;
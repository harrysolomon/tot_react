var express = require('express');
var router = express.Router();

// Require controller modules.
var tile_controller = require('../controllers/tileController');
var form_input_controller = require('../controllers/tileFormInputController');
var line_chart_controller = require('../controllers/lineChartController');
var cost_controller = require('../controllers/costController')
var search_detail_controller = require('../controllers/searchDetailController')
var form_input_test_controller = require('../controllers/tileFormInputTestController')
var time_saver_controller = require('../controllers/timeSaverController');
var time_save_controller = require('../controllers/timeSaver')

//var testing_controller = require('../controllers/testingController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', tile_controller.tile_list);

router.get('/:id', form_input_controller.form_input);

router.post('/:id/line_chart', line_chart_controller.lineChart);

router.get('/:id/cost', cost_controller.cost);

router.get('/:id/search_detail', search_detail_controller.searchDetail);

router.get('/:id/test_input', form_input_test_controller.form_input_test);

router.post('/automate/testing', time_save_controller.timeSaver);

router.post('/time_saver', time_saver_controller.createData);

router.put('/time_saver/edit/:id', time_saver_controller.updateData);

router.get('/time_saver/:id', time_saver_controller.getData);

//router.get('/:id/test', testing_controller.testing);

module.exports = router;
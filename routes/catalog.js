var express = require('express');
var router = express.Router();

// Require controller modules.
var tile_controller = require('../controllers/tileController');
var form_input_controller = require('../controllers/tileFormInputController');
var line_chart_controller = require('../controllers/lineChartController');
var cost_controller = require('../controllers/costController');
var search_detail_controller = require('../controllers/searchDetailController');
var form_input_test_controller = require('../controllers/tileFormInputTestController');
var time_saver_controller = require('../controllers/timeSaverController');
var time_save_controller = require('../controllers/timeSaver');
var cadence_controller = require('../controllers/cadenceController')

// note to self, each route should be drastically different from the next. Similarities throw it off
router.get('/', tile_controller.tile_list);

router.get('/:id', form_input_controller.form_input);

router.post('/:id/linechart', line_chart_controller.lineChart);

router.get('/:id/cost', cost_controller.cost);

router.get('/:id/searchdetail', search_detail_controller.searchDetail);

router.get('/:id/testinput', form_input_test_controller.form_input_test);

router.post('/automate/testing', time_save_controller.timeSaver);

router.post('/timesaver', time_saver_controller.createData);

router.put('/timesaver/edit/:id', time_saver_controller.updateData);

router.get('/timesaver/:id', time_saver_controller.getData);

router.get('/timesaver/calculator/list', time_saver_controller.timeSaverList);

router.get('/timesaver/product/list', time_saver_controller.productList);

router.get('/timesaver/product/:id', time_saver_controller.product);

router.get('/timesaver/employee/list', time_saver_controller.employeeList);

router.get('/timesaver/employee/:id', time_saver_controller.employee);

router.get('/cadences/list', cadence_controller.cadences);

module.exports = router;
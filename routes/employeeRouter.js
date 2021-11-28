const router = require('express').Router();
const employeeCtrl = require('../controllers/employeeCtrl');

router.route('/employee').get(employeeCtrl.getEmployes).post(employeeCtrl.createEmployee);

router.route('/employee/:id').delete(employeeCtrl.deleteEmployee).put(employeeCtrl.updateCategory);

module.exports = router;

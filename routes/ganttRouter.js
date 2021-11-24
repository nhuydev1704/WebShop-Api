const router = require('express').Router();
const ganttCtrl = require('../controllers/GanttCtrl');

router.route('/gantt').get(ganttCtrl.getGantts).post(ganttCtrl.createGantt);

router.route('/gantt/:id').delete(ganttCtrl.deleteGantt).put(ganttCtrl.updateGantt);

module.exports = router;

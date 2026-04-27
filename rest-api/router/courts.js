const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../utils');
const { courtController } = require('../controllers');

router.get('/', courtController.getCourts);
router.get('/:courtId', courtController.getCourt);
router.post('/', auth(), isAdmin(), courtController.createCourt);
router.put('/:courtId', auth(), isAdmin(), courtController.updateCourt);
router.delete('/:courtId', auth(), isAdmin(), courtController.deleteCourt);

module.exports = router;

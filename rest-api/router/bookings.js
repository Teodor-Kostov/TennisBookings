const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../utils');
const { bookingController } = require('../controllers');

router.get('/busy', bookingController.getBusySlots);
router.get('/admin', auth(), isAdmin(), bookingController.getBookingsAdmin);
router.get('/my', auth(), bookingController.getUserBookings);
router.get('/:bookingId', bookingController.getBooking);
router.post('/', auth(), bookingController.createBooking);
router.put('/:bookingId', auth(), bookingController.updateBooking);
router.delete('/:bookingId', auth(), bookingController.deleteBooking);

module.exports = router;

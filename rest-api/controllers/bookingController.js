const { bookingModel } = require('../models');

function getBookings(req, res, next) {
    const { date } = req.query;
    const filter = { deleted: false };

    if (date) {
        filter.date = date;
    }

    bookingModel.find(filter)
        .populate('court')
        .populate('user', '-password -__v')
        .then(bookings => res.json(bookings))
        .catch(next);
}

function getBooking(req, res, next) {
    const { bookingId } = req.params;

    bookingModel.findById(bookingId)
        .populate('court')
        .populate('user')
        .then(booking => res.json(booking))
        .catch(next);
}

function getUserBookings(req, res, next) {
    const { _id: userId } = req.user;

    bookingModel.find({ user: userId, deleted: false })
        .populate('court')
        .then(bookings => res.json(bookings))
        .catch(next);
}

function createBooking(req, res, next) {
    const { court, date, startTime, endTime } = req.body;
    const { _id: userId } = req.user;

    bookingModel.findOne({
        court,
        date,
        deleted: false,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
        ]
    })
        .then(existingBooking => {
            if (existingBooking) {
                return res.status(409).json({
                    message: 'This court is already booked for the selected time slot'
                });
            }
            return bookingModel.create({ court, user: userId, date, startTime, endTime })
                .then(booking => res.status(201).json(booking));
        })
        .catch(next);
}

function updateBooking(req, res, next) {
    const { bookingId } = req.params;
    const { court, date, startTime, endTime } = req.body;

    bookingModel.findOne({
        _id: { $ne: bookingId },
        court,
        date,
        deleted: false,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
        ]
    })
        .then(existingBooking => {
            if (existingBooking) {
                return res.status(409).json({
                    message: 'This court is already booked for the selected time slot'
                });
            }
            return bookingModel.findByIdAndUpdate(bookingId, { court, date, startTime, endTime }, { new: true })
                .then(booking => res.json(booking));
        })
        .catch(next);
}

function deleteBooking(req, res, next) {
    const { bookingId } = req.params;

    bookingModel.findByIdAndUpdate(bookingId, { deleted: true }, { new: true })
        .then(booking => res.json(booking))
        .catch(next);
}

function getBusySlots(req, res, next) {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Date query parameter is required' });
    }

    bookingModel.find({ date, deleted: false })
        .select('court user startTime endTime -_id')
        .populate('court', 'number type -_id')
        .populate('user', '_id username')
        .then(slots => res.json(slots))
        .catch(next);
}

function getBookingsAdmin(req, res, next) {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Date query parameter is required' });
    }

    bookingModel.find({ date, deleted: false })
        .populate('court')
        .populate('user', '-password -__v')
        .then(bookings => res.json(bookings))
        .catch(next);
}

module.exports = {
    getBookings,
    getBooking,
    getUserBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    getBusySlots,
    getBookingsAdmin,
}

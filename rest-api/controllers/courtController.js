const { courtModel } = require('../models');

function getCourts(req, res, next) {
    courtModel.find()
        .then(courts => res.json(courts))
        .catch(next);
}

function getCourt(req, res, next) {
    const { courtId } = req.params;

    courtModel.findById(courtId)
        .then(court => res.json(court))
        .catch(next);
}

function createCourt(req, res, next) {
    const { number, type, isActive } = req.body;

    courtModel.create({ number, type, isActive })
        .then(court => res.status(201).json(court))
        .catch(next);
}

function updateCourt(req, res, next) {
    const { courtId } = req.params;
    const { number, type, isActive } = req.body;

    courtModel.findByIdAndUpdate(courtId, { number, type, isActive }, { new: true })
        .then(court => res.json(court))
        .catch(next);
}

function deleteCourt(req, res, next) {
    const { courtId } = req.params;

    courtModel.findByIdAndDelete(courtId)
        .then(court => res.json(court))
        .catch(next);
}

module.exports = {
    getCourts,
    getCourt,
    createCourt,
    updateCourt,
    deleteCourt,
}

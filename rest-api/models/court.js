const mongoose = require('mongoose');


const courtSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Clay', 'Hard', 'Grass'],
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Court', courtSchema);

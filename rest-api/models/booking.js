const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const bookingSchema = new mongoose.Schema({
    court: {
        type: ObjectId,
        ref: 'Court',
        required: true 
    },
    user:  {
        type: ObjectId,
        ref: 'User',
        required: true 
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Booking', bookingSchema);



 
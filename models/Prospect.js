const mongoose = require('mongoose');
const dateFormatter = require('../utils/dateFormatter');

const ProspectSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please provide a name!'],
        minlength:[3,'Must have at least 3 characters.'],
        maxlength:[25,'Cannot exceed 25 characters!'],
        trim: true,
    },
    portfolioValue: {
        type: Number,
        required:[true, 'Please provide portfolio value!'],
        min: [100000, 'Portfolio must be greater than 100000']
    },
    netWorth: {
        type: String,
        required:[true, "Please provide netWorth value or enter 'unknown'!"],
        default: portfolioValue.min,
    },
    status: {
        type: String,
        enum: ['appointment scheduled', 'meeting held', 'contract sent'],
        default: 'appointment scheduled',

    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormatter(createdAtVal),
    }
    
},
{
    toJSON: {
        getters: true,
    }
})
const Prospect = mongoose.model('Prospect', ProspectSchema);
module.exports = Prospect;

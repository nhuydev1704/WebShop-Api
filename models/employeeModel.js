const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    date_of_birth: {
        type: Date,
    },
    address: {
        type: String,
        trim: true
    },
    shift: {
        type: String,
        trim: true
    },
    salary: {
        type: Number,
        trim: true
    },
    level: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Employee", employeeSchema)
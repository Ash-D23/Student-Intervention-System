const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let student = new Schema({
    name: {
        type: String
    },
    roll: {
        type: Number
    },
    failures: {
        type: Number
    },
    absences: {
        type: Number
    },
    Gender: {
        type: String
    },
    internships: {
        type: Number
    },
    average: {
        type: Number
    },
    inter: {
        type: String
    }
});

module.exports = mongoose.model('student', student);

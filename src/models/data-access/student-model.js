const mongoose = require('mongoose');

const openSchema = new mongoose.Schema(
    { any: {} },
    {
        strict: false,
        versionKey: false,
        bufferCommands: false,
        validateBeforeSave: false,
        timestamps: true,
    },
);

module.exports = mongoose.model('student', openSchema, 'student');

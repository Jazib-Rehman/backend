const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const common = {
    type: String,
    required: true,
    trim: true
};
const defaults = {
    type: String,
    default: ""
}

const ClassSchema = new Schema({
    name: { ...common },
}, { timestamps: true });

const TeacherSchema = new Schema({
    name: { ...common },
    email: { ...common },
    password: { ...common },
}, { timestamps: true });

const SubjectSchema = new Schema({
    name: { ...common },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    day: { ...common },
    period: { ...common },
    // startTime: { ...common },
    // endTime: { ...common },
}, { timestamps: true });


const Class = mongoose.model('Class', ClassSchema);
const Teacher = mongoose.model('Teacher', TeacherSchema);
const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = {
    Class,
    Teacher,
    Subject
}
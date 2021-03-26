const { Service, Class, Teacher, Subject } = require('../models');
const bcrypt = require("bcryptjs");


class ScheduleController {
    // =====================> CREATE <===================== //
    async createClass(req, res) {
        try {
            const data = new Class(req.body);
            await data.save();
            if (!data) {
                return res.status(400).json({ msg: 'No Class added.' });
            }
            res.json({ status: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createTeacher(req, res) {
        try {
            const data = new Teacher(req.body);
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(req.body.password, salt);
            await data.save();
            if (!data) {
                return res.status(400).json({ msg: 'No Teacher added.' });
            }
            res.json({ status: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createSubject(req, res) {
        try {
            const { classId, teacher, startTime, endTime } = req.body
            const allSubjects = await Subject.find({ classId: classId }).exec();
            let clashes = []
            allSubjects.forEach(element => {
                if ((startTime >= element.startTime && startTime < element.endTime) || (endTime > element.startTime && endTime <= element.endTime)) {
                    clashes.push(element)
                }
            });
            if (clashes.length) {
                res.json({ error: { clashType: "timing", clashes: clashes[0] } });
            } else {
                const data = new Subject(req.body);
                await data.save();
                if (!data) {
                    return res.status(400).json({ msg: 'No Subject added.' });
                }
                res.json({ status: "success" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // =====================> FETCH <===================== //
    async fetchAllClasses(req, res) {
        try {
            const data = await Class.find().exec();
            // if (!data.length > 0) {
            //     throw new Error('No Class Found')
            // }
            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async fetchAllSubjects(req, res) {
        try {
            const data = await Subject.find()
                .populate("classId")
                .populate("teacher")
                .exec();
            // if (!data.length > 0) {
            //     throw new Error('No Class Found')
            // }
            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async fetchAllTeachers(req, res) {
        try {
            const data = await Teacher.find().exec();
            // if (!data.length > 0) {
            //     throw new Error('No Class Found')
            // }
            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async fetchClassById(req, res) {
        try {
            const data = await Class.findById(req.params.id).exec();
            if (!data) {
                throw new Error('No Class Found, Kindly Check Id.')
            }
            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // =====================> UPDATE <===================== //
    async updateClass(req, res) {
        try {
            const data = await Class.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            if (!data) {
                throw new Error("Class Update Failed.")
            }
            res.json({ status: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // =====================> REMOVE <===================== //
    async removeClass(req, res) {
        try {
            const done = await Class.deleteOne({ _id: req.params.id });
            if (!done) {
                throw new Error("Class deletion failed, please provide correct id")
            }
            res.json({ status: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async removeSubject(req, res) {
        try {
            const done = await Subject.deleteOne({ _id: req.params.id });
            if (!done) {
                throw new Error("Subject deletion failed, please provide correct id")
            }
            res.json({ status: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async removeTeacher(req, res) {
        try {
            const done = await Teacher.deleteOne({ _id: req.params.id });
            if (!done) {
                throw new Error("Teacher deletion failed, please provide correct id")
            }
            res.json({ status: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = {
    scheduleController: new ScheduleController()
};

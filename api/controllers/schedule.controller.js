const { Service, Class, Teacher, Subject, Student, UserTable, User } = require('../models');
const bcrypt = require("bcryptjs");

const firebase = require("./../../config/firebase")
const moment = require("moment")

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

    async createUserTable(req, res) {
        try {
            const subject = await Subject.findById(req.body.subject).exec()

            const allSubjects = await UserTable.find({ user: req.body.user })
                .populate("subject")
                .exec();

            var myClashes = []

            allSubjects.forEach(element => {
                console.log(element.subject.day === subject.day && element.subject.period === subject.period)
                if (element.subject.day === subject.day && element.subject.period === subject.period) {
                    myClashes.push(element)
                }
            });

            if (myClashes.length) {
                res.json({ error: { clashType: "timing", clashes: subject } });
            } else {
                const data = new UserTable(req.body);
                await data.save();
                if (!data) {
                    return res.status(400).json({ msg: 'Not added to Table.' });
                }
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

    async createStudent(req, res) {
        try {
            const data = new Student(req.body);
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
            // const { classId, teacher, startTime, endTime, day } = req.body
            const { classId, teacher, period, day } = req.body
            const allSubjects = await Subject.find({ classId: classId, day: day, period: period }).exec();
            const allTeacheSubjects = await Subject.find({ day: day, period: period, teacher: teacher }).exec();

            if (allSubjects.length) {
                res.json({ error: { clashType: "timing", clashes: allSubjects[0] } });
            } else if (allTeacheSubjects.length) {
                res.json({ error: { clashType: "teacher", clashes: allTeacheSubjects[0] } });
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

    async fetchSubjectsByClass(req, res) {
        try {
            let data = []
            // const Sunday = await Subject.find({ classId: req.params.id, day: "Sunday" })
            //     .populate("classId")
            //     .populate("teacher")
            //     .exec();
            // data.push({ title: "Sunday", times: Sunday })
            const Monday = await Subject.find({ classId: req.params.id, day: "Monday" })
                .populate("classId")
                .populate("teacher")
                .exec();
            data.push({ title: "Monday", times: Monday })
            const Tuesday = await Subject.find({ classId: req.params.id, day: "Tuesday" })
                .populate("classId")
                .populate("teacher")
                .exec();
            data.push({ title: "Tuesday", times: Tuesday })
            const Wednesday = await Subject.find({ classId: req.params.id, day: "Wednesday" })
                .populate("classId")
                .populate("teacher")
                .exec();
            data.push({ title: "Wednesday", times: Wednesday })
            const Thursday = await Subject.find({ classId: req.params.id, day: "Thursday" })
                .populate("classId")
                .populate("teacher")
                .exec();
            data.push({ title: "Thursday", times: Thursday })
            const Friday = await Subject.find({ classId: req.params.id, day: "Friday" })
                .populate("classId")
                .populate("teacher")
                .exec();
            data.push({ title: "Friday", times: Friday })
            // const Saturday = await Subject.find({ classId: req.params.id, day: "Saturday" })
            //     .populate("classId")
            //     .populate("teacher")
            //     .exec();
            // data.push({ title: "Saturday", times: Saturday })

            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async fetchTeacherTimeTable(req, res) {
        try {
            let data = []
            // const Sunday = await Subject.find({ teacher: req.params.id, day: "Sunday" })
            //     .populate("classId")
            //     .populate("teacher")
            //     .exec();
            // data.push({ title: "Sunday", times: Sunday })
            const Monday = await Subject.find({ teacher: req.params.id, day: "Monday" })
                .populate("classId")
                .populate("teacher")
                .exec();
            data.push({ title: "Monday", times: Monday })
            const Tuesday = await Subject.find({ teacher: req.params.id, day: "Tuesday" })
                .populate("classId")
                .populate("teacher")
                .exec();
            data.push({ title: "Tuesday", times: Tuesday })
            const Wednesday = await Subject.find({ teacher: req.params.id, day: "Wednesday" })
                .populate("classId")
                .populate("teacher")
                .exec();
            data.push({ title: "Wednesday", times: Wednesday })
            const Thursday = await Subject.find({ teacher: req.params.id, day: "Thursday" })
                .populate("classId")
                .populate("teacher")
                .exec();
            data.push({ title: "Thursday", times: Thursday })
            const Friday = await Subject.find({ teacher: req.params.id, day: "Friday" })
                .populate("classId")
                .populate("teacher")
                .exec();
            data.push({ title: "Friday", times: Friday })
            // const Saturday = await Subject.find({ teacher: req.params.id, day: "Saturday" })
            //     .populate("classId")
            //     .populate("teacher")
            //     .exec();
            // data.push({ title: "Saturday", times: Saturday })

            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async fetchMyTimeTable(req, res) {
        try {
            let data = []
            let Monday = []
            let Tuesday = []
            let Wednesday = []
            let Thursday = []
            let Friday = []
            let Saturday = []
            const allSubjects = await UserTable.find({ user: req.params.id })
                .populate("subject")
                .exec();

            allSubjects.forEach(element => {
                if (element.subject.day === "Monday") {
                    Monday.push(element.subject)
                }
                if (element.subject.day === "Tuesday") {
                    Tuesday.push(element.subject)
                }
                if (element.subject.day === "Wednesday") {
                    Wednesday.push(element.subject)
                }
                if (element.subject.day === "Thursday") {
                    Thursday.push(element.subject)
                }
                if (element.subject.day === "Friday") {
                    Friday.push(element.subject)
                }
                if (element.subject.day === "Saturday") {
                    Saturday.push(element.subject)
                }
            });

            data.push({ title: "Monday", times: Monday })
            data.push({ title: "Tuesday", times: Tuesday })
            data.push({ title: "Wednesday", times: Wednesday })
            data.push({ title: "Thursday", times: Thursday })
            data.push({ title: "Friday", times: Friday })
            data.push({ title: "Saturday", times: Saturday })

            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async fetchUserTableByUser(req, res) {
        try {
            const data = await UserTable.find({ user: req.params.id })
                .populate("subject")
                .exec();

            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async fetchAllTeachers(req, res) {
        try {
            const data = await Teacher.find().exec();
            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async checkTeachersOnLeave(req, res) {
        try {
            const chatItems = firebase.database().ref("teachers-leave");
            chatItems.on('value', (snapshot) => {
                let newItems = snapshot.val();
                let data = [];
                for (let newItem in newItems) {
                    data.push({
                        id: newItem,
                        _id: newItems[newItem]._id,
                        email: newItems[newItem].email,
                        name: newItems[newItem].name,
                        time: newItems[newItem].time
                    });
                    const afterTime = new Date(newItems[newItem].time)
                    const a = moment()
                    var b = moment(afterTime)
                    const diff = a.diff(b, 'hours')
                    if (diff > 12) {
                        const removeItems = firebase.database().ref(`/teachers-leave`).child(`/${newItem}`);
                        removeItems.remove();
                    }
                }
            });
            res.json({ data: "Succes" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async fetchAllStudents(req, res) {
        try {
            const data = await Student.find().exec();
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
    async removeUserTable(req, res) {
        try {
            const done = await UserTable.deleteOne({ _id: req.params.id });
            if (!done) {
                throw new Error("Table deletion failed, please provide correct id")
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
    async removeStudent(req, res) {
        try {
            const done = await Student.deleteOne({ _id: req.params.id });
            if (!done) {
                throw new Error("Student deletion failed, please provide correct id")
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

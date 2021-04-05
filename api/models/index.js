const { User } = require('./user.model');
const { Class, Teacher, Subject, Student, UserTable } = require('./schedule.modle');

module.exports = {
  User,
  Class,
  UserTable,
  Teacher,
  Student,
  Subject
}
const { User } = require('./user.model');
const { Service } = require('./service.model');
const { Class, Teacher, Subject, Student, UserTable } = require('./schedule.modle');

module.exports = {
  User,
  Service,
  Class,
  UserTable,
  Teacher,
  Student,
  Subject
}
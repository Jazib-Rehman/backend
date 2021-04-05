const express = require('express');
const auth = require('../middleware/auth');

const {
  adminController,
  serviceController,
  scheduleController
} = require('./../controllers');

const adminRoutes = express.Router();
adminRoutes.post('/login', adminController.login);
adminRoutes.post('/login-teacher', adminController.loginTeacher);
adminRoutes.post('/login-student', adminController.loginStudent);
adminRoutes.post('/create', adminController.signUp);

const scheduleRoutes = express.Router();
scheduleRoutes.get('/fetch-classes', scheduleController.fetchAllClasses)
scheduleRoutes.get('/fetch-subjects', scheduleController.fetchAllSubjects)
scheduleRoutes.get('/fetch-subjects-by-class/:id', scheduleController.fetchSubjectsByClass)
scheduleRoutes.get('/fetch-my-table/:id', scheduleController.fetchMyTimeTable)
scheduleRoutes.get('/fetch-teacher-table/:id', scheduleController.fetchTeacherTimeTable)
scheduleRoutes.get('/fetch-user-table/:id', scheduleController.fetchUserTableByUser)
scheduleRoutes.get('/fetch-teachers', scheduleController.fetchAllTeachers)
scheduleRoutes.get('/check-teachers-on-leave', scheduleController.checkTeachersOnLeave)
scheduleRoutes.get('/fetch-students', scheduleController.fetchAllStudents)
scheduleRoutes.post('/create-class', scheduleController.createClass)
scheduleRoutes.post('/create-teacher', scheduleController.createTeacher)
scheduleRoutes.post('/create-student', scheduleController.createStudent)
scheduleRoutes.post('/create-subject', scheduleController.createSubject)
scheduleRoutes.post('/create-user-table', scheduleController.createUserTable)
scheduleRoutes.delete('/remove-subject/:id', scheduleController.removeSubject)
scheduleRoutes.delete('/remove-teacher/:id', scheduleController.removeTeacher)
scheduleRoutes.delete('/remove-student/:id', scheduleController.removeStudent)
scheduleRoutes.delete('/remove-class/:id', scheduleController.removeClass)
scheduleRoutes.delete('/remove-user-table/:id', scheduleController.removeUserTable)

module.exports = {
  adminRoutes,
  scheduleRoutes
}
const express = require('express');
const router = express.Router();
const CourseCtrl = require('../controllers/couseController');

router.get("/", CourseCtrl.getCourses);
router.get("/:courseId", CourseCtrl.getCourseById);
router.get("/by-user/:userId", CourseCtrl.getCoursesByUser);
router.post("/enroll/:courseId", CourseCtrl.enrollCourse);

module.exports = router;
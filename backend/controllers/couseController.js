const express = require("express");
const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

/**
 * Fetch all courses
 * @route   GET /api/courses
 * @access  Public
 */
exports.getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find().select('-description'); // Leave description for faster loading time

    if (courses) {
        res.status(200).json(courses);
    } else {
        res.status(404).json({ message: "Courses not found" });
        throw new Error("Courses not found");
    }
});

/**
 * Fetch course details by its id
 * @route   GET /api/courses/:courseId
 * @access  Public
 */
exports.getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.courseId);

    if (course){
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: "Course not found" });
        throw new Error("Course not found");
    }
});

/**
 * Enroll course by user id
 * @route   POST /api/courses/enroll/:courseId
 * @access  Public
 */
exports.enrollCourse = asyncHandler(async (req, res) => {
    const course = mongoose.Types.ObjectId(req.params.courseId);
    const { userId } = req.body;

    const courseResult = await Course.findByIdAndUpdate(
        req.params.courseId,
        { $push: { students: mongoose.Types.ObjectId(userId) } });

    const userResult = await User.findByIdAndUpdate(
        userId, 
        { $push: { enrolledCourses: course } });
    
    if (userResult && courseResult){
        res.status(200);
    } else {
        res.status(400).json( { message: "Fail to save" });
        throw new Error("Fail to save");
    }
});

/**
 * Get courses enrolled by user
 * @route   GET /api/courses/by-user/:userId
 * @access  Public
 */
exports.getCoursesByUser = asyncHandler(async (req, res) => {
    const courseIds = (await User.findById(req.params.userId).select("enrolledCourses -_id")).enrolledCourses;

    if (courseIds){
        const courses = await Course.find({ '_id': { $in: courseIds } });
        if (courses){
            res.status(200).json(courses);
        } else {
            res.status(404).json( { message: "Courses not found" });
            throw new Error("Courses not found");
        }
    } else {
        res.status(404).json( { message: "User not found" });
        throw new Error("User not found");
    }
})
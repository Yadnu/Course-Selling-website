const express = require('express');
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const Course = require('../models/courseModel'); // Assuming you have a Course model

const router = express.Router();

// Controller functions (you'll need to create these)

// Route to get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Route to get a single course by ID
const getCourseById = async (req, res) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
router.get('/', getAllCourses);

// Route to get a single course by ID
router.get('/:id', getCourseById);

// Route to create a new course
router.post('/', createCourse);

// Route to purchase a course
router.post('/:id/purchase', (req, res) => {
    // Logic to handle course purchase
});
router.put('/:id', updateCourse);

// Route to delete a course
router.delete('/:id', deleteCourse);

module.exports = router;
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
router.post('/:id/purchase', async (req, res) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        // Logic to handle course purchase
        // For example, you can update the course to mark it as purchased
        course.purchased = true;
        await course.save();
        res.status(200).json({ message: 'Course purchased successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route to update a course
const updateCourse = async (req, res) => {
    const courseId = req.params.id;
    const updates = req.body;
    try {
        const course = await Course.findByIdAndUpdate(courseId, updates, { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

router.put('/:id', updateCourse);

// Route to delete a course
const deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

router.delete('/:id', deleteCourse);

module.exports = router;
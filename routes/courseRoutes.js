const express = require('express');
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');

const router = express.Router();

// Controller functions (you'll need to create these)

// Route to get all courses
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
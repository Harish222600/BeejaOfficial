const express = require('express');
const router = express.Router();

// Import controllers
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getAllCourses,
    approveCourse,
    deleteCourse,
    getAnalytics,
    toggleUserStatus,
    toggleCourseVisibility
} = require('../controllers/admin');

// Import middleware
const { auth, isAdmin } = require('../middleware/auth');

// ================ USER MANAGEMENT ROUTES ================
router.get('/users', auth, isAdmin, getAllUsers);
router.post('/users', auth, isAdmin, createUser);
router.put('/users/:userId', auth, isAdmin, updateUser);
router.delete('/users/:userId', auth, isAdmin, deleteUser);
router.put('/users/:userId/toggle-status', auth, isAdmin, toggleUserStatus);

// ================ COURSE MANAGEMENT ROUTES ================
router.get('/courses', auth, isAdmin, getAllCourses);
router.put('/courses/:courseId/approve', auth, isAdmin, approveCourse);
router.delete('/courses/:courseId', auth, isAdmin, deleteCourse);
router.put('/courses/:courseId/toggle-visibility', auth, isAdmin, toggleCourseVisibility);

// ================ ANALYTICS ROUTES ================
router.get('/analytics', auth, isAdmin, getAnalytics);

module.exports = router;

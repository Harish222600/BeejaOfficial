const User = require('../models/user');
const Course = require('../models/course');
const Profile = require('../models/profile');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

// ================ TOGGLE USER STATUS ================
exports.toggleUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        user.active = !user.active;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `User ${user.active ? 'activated' : 'deactivated'} successfully`,
            user
        });
    } catch (error) {
        console.error('Error toggling user status:', error);
        return res.status(500).json({
            success: false,
            message: 'Error toggling user status',
            error: error.message
        });
    }
};

// ================ GET ALL USERS ================
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .populate('additionalDetails')
            .select('-password')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            users,
            message: 'Users fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

// ================ CREATE USER ================
exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, accountType, contactNumber } = req.body;

        if (!firstName || !lastName || !email || !password || !accountType) {
            return res.status(400).json({ success: false, message: 'All required fields must be provided' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: contactNumber || null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            approved: true,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        user.password = undefined;

        return res.status(201).json({
            success: true,
            user,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
};

// ================ UPDATE USER ================
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, email, accountType, contactNumber } = req.body;

        const user = await User.findById(userId).populate('additionalDetails');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (accountType) user.accountType = accountType;

        if (contactNumber && user.additionalDetails) {
            await Profile.findByIdAndUpdate(user.additionalDetails._id, { contactNumber }, { new: true });
        }

        await user.save();

        const updatedUser = await User.findById(userId).populate('additionalDetails').select('-password');

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

// ================ TOGGLE COURSE VISIBILITY ================
exports.toggleCourseVisibility = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: 'Invalid course ID' });
        }

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

        course.isVisible = !course.isVisible;
        course.status = course.isVisible ? 'Published' : 'Draft';

        await course.save();

        return res.status(200).json({
            success: true,
            message: `Course ${course.isVisible ? 'visible' : 'hidden'} successfully`,
            course
        });
    } catch (error) {
        console.error('Error toggling course visibility:', error);
        return res.status(500).json({
            success: false,
            message: 'Error toggling course visibility',
            error: error.message
        });
    }
};

// ================ DELETE USER ================
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const user = await User.findById(userId).populate('additionalDetails');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        if (user._id.toString() === req.user.id) {
            return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
        }

        if (user.additionalDetails) {
            await Profile.findByIdAndDelete(user.additionalDetails._id);
        }

        await User.findByIdAndDelete(user._id);

        return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user failed:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Error deleting user'
        });
    }
};

// ================ GET ALL COURSES ================
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
            .populate('instructor', 'firstName lastName email')
            .populate('category', 'name')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            courses,
            message: 'Courses fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
};

// ================ APPROVE COURSE ================
exports.approveCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findByIdAndUpdate(
            courseId,
            { status: 'Published' },
            { new: true }
        ).populate('instructor', 'firstName lastName email');

        if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

        return res.status(200).json({
            success: true,
            course,
            message: 'Course approved successfully'
        });
    } catch (error) {
        console.error('Error approving course:', error);
        return res.status(500).json({
            success: false,
            message: 'Error approving course',
            error: error.message
        });
    }
};

// ================ DELETE COURSE ================
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({ success: false, message: 'Course ID is required' });
        }

        const course = await Course.findById(courseId)
            .populate('instructor', 'firstName lastName email');

        if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Delete course failed:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Error deleting course'
        });
    }
};

// ================ GET ANALYTICS DATA ================
exports.getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const studentCount = await User.countDocuments({ accountType: 'Student' });
        const instructorCount = await User.countDocuments({ accountType: 'Instructor' });
        const adminCount = await User.countDocuments({ accountType: 'Admin' });

        const totalCourses = await Course.countDocuments();
        const publishedCourses = await Course.countDocuments({ status: 'Published' });
        const draftCourses = await Course.countDocuments({ status: 'Draft' });

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentRegistrations = await User.countDocuments({
            createdAt: { $gte: thirtyDaysAgo }
        });

        return res.status(200).json({
            success: true,
            analytics: {
                users: {
                    total: totalUsers,
                    students: studentCount,
                    instructors: instructorCount,
                    admins: adminCount,
                    recentRegistrations
                },
                courses: {
                    total: totalCourses,
                    published: publishedCourses,
                    draft: draftCourses
                }
            },
            message: 'Analytics data fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching analytics',
            error: error.message
        });
    }
};

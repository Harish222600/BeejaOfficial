const mongoose = require('mongoose');
const Category = require('../models/category');
const Course = require('../models/course');
const User = require('../models/user');
const Profile = require('../models/profile');

// MongoDB connection
const MONGO_URI = "mongodb://127.0.0.1:27017/learnhub";

// Sample Categories
const categories = [
    {
        name: "Web Development",
        description: "Master web development from front-end to back-end"
    },
    {
        name: "Mobile Development",
        description: "Learn to build mobile apps for iOS and Android"
    },
    {
        name: "Data Science",
        description: "Explore data analysis, machine learning, and AI"
    },
    {
        name: "Cloud Computing",
        description: "Master cloud platforms and DevOps practices"
    },
    {
        name: "Cybersecurity",
        description: "Learn to protect systems and networks from cyber threats"
    }
];

// Sample instructor profile data
const instructorProfileData = {
    gender: "Male",
    dateOfBirth: "1990-01-01",
    about: "Experienced web development instructor with 10+ years of industry experience",
    contactNumber: 1234567890
};

// Sample instructor data
const instructorData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.instructor@example.com",
    password: "instructor123",
    accountType: "Instructor",
    active: true,
    approved: true,
    image: "https://example.com/instructor-image.jpg", // placeholder image URL
    courses: []
};

// Sample courses data
const coursesData = [
    {
        courseName: "Complete Web Development Bootcamp",
        courseDescription: "Learn full-stack web development from scratch",
        whatYouWillLearn: "HTML, CSS, JavaScript, React, Node.js, MongoDB",
        price: 499,
        tag: ["web development", "programming", "full-stack"],
        thumbnail: "https://example.com/web-dev-thumbnail.jpg",
        status: "Published",
        instructions: [
            "Basic computer knowledge required",
            "No prior programming experience needed",
            "Laptop/Desktop with internet connection"
        ]
    },
    {
        courseName: "Mobile App Development with React Native",
        courseDescription: "Build cross-platform mobile apps",
        whatYouWillLearn: "React Native, JavaScript, Mobile Development Principles",
        price: 599,
        tag: ["mobile development", "react native", "javascript"],
        thumbnail: "https://example.com/mobile-dev-thumbnail.jpg",
        status: "Published",
        instructions: [
            "Basic JavaScript knowledge required",
            "Understanding of React is helpful",
            "Mac/Windows computer required"
        ]
    },
    {
        courseName: "Data Science Fundamentals",
        courseDescription: "Introduction to data science and analytics",
        whatYouWillLearn: "Python, Data Analysis, Machine Learning Basics",
        price: 699,
        tag: ["data science", "python", "machine learning"],
        thumbnail: "https://example.com/data-science-thumbnail.jpg",
        status: "Published",
        instructions: [
            "Basic Python knowledge helpful",
            "Understanding of mathematics",
            "Computer with minimum 8GB RAM"
        ]
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        // Clear existing data
        await Category.deleteMany({});
        await Course.deleteMany({});
        await User.deleteMany({});
        await Profile.deleteMany({});
        console.log("Cleared existing data");

        // Create instructor profile
        const instructorProfile = await Profile.create(instructorProfileData);
        console.log("Created instructor profile");

        // Create instructor with profile reference
        const instructor = await User.create({
            ...instructorData,
            additionalDetails: instructorProfile._id
        });
        console.log("Created instructor:", instructor);

        // Insert categories
        const createdCategories = await Category.insertMany(categories);
        console.log("Added categories:", createdCategories);

        // Create courses with references
        const courses = coursesData.map((course, index) => ({
            ...course,
            instructor: instructor._id,
            category: createdCategories[index % createdCategories.length]._id,
            studentsEnrolled: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        const createdCourses = await Course.insertMany(courses);
        console.log("Added courses:", createdCourses);

        // Update instructor with course references
        await User.findByIdAndUpdate(
            instructor._id,
            { $push: { courses: { $each: createdCourses.map(course => course._id) } } }
        );

        // Update categories with course references
        for (const course of createdCourses) {
            await Category.findByIdAndUpdate(
                course.category,
                { $push: { courses: course._id } }
            );
        }
        console.log("Updated references");

        // Close connection
        await mongoose.connection.close();
        console.log("Database connection closed");

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();

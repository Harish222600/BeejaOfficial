const Category = require('../models/category')

// get Random Integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// ================ create Category ================
exports.createCategory = async (req, res) => {
    try {
        // extract data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const categoryDetails = await Category.create({
            name: name, description: description
        });

        res.status(200).json({
            success: true,
            message: 'Category created successfully'
        });
    }
    catch (error) {
        console.log('Error while creating Category');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while creating Category',
            error: error.message
        })
    }
}


// ================ get All Category ================
exports.showAllCategories = async (req, res) => {
    try {
        console.log('Fetching all categories from database...');
        
        // get all category from DB
        const allCategories = await Category.find({}, { name: true, description: true });
        
        console.log(`Found ${allCategories.length} categories`);

        if (!allCategories) {
            console.log('No categories found in database');
            return res.status(404).json({
                success: false,
                message: 'No categories found'
            });
        }

        // return response
        res.status(200).json({
            success: true,
            data: allCategories,
            message: 'Categories fetched successfully'
        });
    }
    catch (error) {
        console.error('Error while fetching categories:', {
            message: error.message,
            stack: error.stack
        });
        
        res.status(500).json({
            success: false,
            message: 'Error while fetching categories',
            error: error.message
        });
    }
}



exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body

        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec()

        if (!selectedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" })
        }

        if (selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "No courses found for the selected category.",
            })
        }

        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })

        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec()

        // Filter out courses from mostSellingCourses that are already in selectedCategory.courses
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()

        const allCourses = allCategories.flatMap((category) => category.courses)

        // Create a set of selectedCategory course IDs for filtering
        const selectedCourseIds = new Set(selectedCategory.courses.map(course => course._id.toString()))

        // Filter mostSellingCourses to exclude courses already in selectedCategory
        let mostSellingCourses = allCourses
            .filter(course => !selectedCourseIds.has(course._id.toString()))
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        // Add courses from differentCategory as additional related courses, excluding duplicates
        const differentCategoryCourseIds = new Set(differentCategory.courses.map(course => course._id.toString()))
        const additionalCourses = differentCategory.courses.filter(course => !selectedCourseIds.has(course._id.toString()))

        // Combine mostSellingCourses and additionalCourses, ensuring no duplicates
        const combinedCoursesMap = new Map()
        mostSellingCourses.forEach(course => combinedCoursesMap.set(course._id.toString(), course))
        additionalCourses.forEach(course => {
            if (!combinedCoursesMap.has(course._id.toString())) {
                combinedCoursesMap.set(course._id.toString(), course)
            }
        })

        mostSellingCourses = Array.from(combinedCoursesMap.values())

        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

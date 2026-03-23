import Course from "../models/course.model.js";

// @desc Create Course
// @route POST /api/courses
export const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;

        // validation
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }

        const course = await Course.create({
            title,
            description,
            teacherId: req.user._id,
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get all courses
// @route GET /api/courses
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("teacherId", "name email");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get single course
// @route GET /api/courses/:id
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate(
            "teacherId",
            "name email"
        );

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update Course
// @route PUT /api/courses/:id
export const updateCourse = async (req, res) => {
    try {
        const { title, description } = req.body;

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // optional: only creator can update
        if (course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        // update fields
        if (title) course.title = title;
        if (description) course.description = description;

        await course.save();

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete Course
// @route DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // only creator can delete
        if (course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await course.deleteOne();

        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
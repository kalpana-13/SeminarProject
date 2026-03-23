import express from "express";
import {
    createLecture,
    getLecturesByModule,
    updateLecture,
    deleteLecture,
} from "../controllers/lecture.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// create (teacher/admin)
router.post("/", protect, authorizeRoles("teacher", "admin"), createLecture);

// read (public)
router.get("/:moduleId", getLecturesByModule);

// update (teacher/admin)
router.put(
    "/:id",
    protect,
    authorizeRoles("teacher", "admin"),
    updateLecture
);

// delete (teacher/admin)
router.delete(
    "/:id",
    protect,
    authorizeRoles("teacher", "admin"),
    deleteLecture
);

export default router;
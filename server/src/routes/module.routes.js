import express from "express";
import {
    createModule,
    getModulesByCourse,
    updateModule,
    deleteModule,
} from "../controllers/module.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// create (teacher/admin)
router.post("/", protect, authorizeRoles("teacher", "admin"), createModule);

// read (public)
router.get("/:courseId", getModulesByCourse);

// update (teacher/admin)
router.put(
    "/:id",
    protect,
    authorizeRoles("teacher", "admin"),
    updateModule
);

// delete (teacher/admin)
router.delete(
    "/:id",
    protect,
    authorizeRoles("teacher", "admin"),
    deleteModule
);

export default router;
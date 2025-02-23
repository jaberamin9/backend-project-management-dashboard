import express from "express";
import { createProject, updateProject, getProjects, getProject, getProjectsByUser, submitProject, changeProjectStatus, deleteProject } from "../controllers/projectController.js";
import { isAdmin, isLogin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", isAdmin, createProject);
router.get("/", isAdmin, getProjects);
router.get("/:projectId", isLogin, getProject);
router.put("/:projectId", isAdmin, updateProject);
router.delete("/:projectId", isAdmin, deleteProject);
router.get("/user/:userId", isLogin, getProjectsByUser);
router.patch("/submit-project/:projectId", isLogin, submitProject);
router.patch("/change-project-status/:projectId", isAdmin, changeProjectStatus);

export default router;

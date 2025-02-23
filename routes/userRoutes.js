import express from "express";
import { getUsers, updateUserRole, deleteUser } from "../controllers/userController.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isAdmin, getUsers);
router.delete("/:id", isAdmin, deleteUser);
router.patch("/:id/role", isAdmin, updateUserRole);

export default router;

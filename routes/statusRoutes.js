import express from "express";
import { getStats, getStatsByUser } from "../controllers/statusController.js";
import { isAdmin, isLogin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isAdmin, getStats);
router.get("/:userId", isLogin, getStatsByUser);

export default router;

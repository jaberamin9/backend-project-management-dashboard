import express from "express";
import { signIn, signUp, getActiveUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/me", getActiveUser);

export default router;

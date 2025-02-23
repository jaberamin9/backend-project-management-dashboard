import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ error: "No token provided" });

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user || user.role !== "admin") {
            return res.status(403).json({ error: "Admin access required" });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

export const isLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ error: "No token provided" });

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) {
            return res.status(403).json({ error: "login required" });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

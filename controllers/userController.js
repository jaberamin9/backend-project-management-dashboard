import { PrismaClient } from "@prisma/client";
import { filter } from "../utils/filter.js";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
    try {
        const { filters, skip, sortBy, order, pageNumber, limitNumber } = filter(req, 'name');

        const users = await prisma.user.findMany({
            where: filters,
            select: { id: true, name: true, email: true, role: true, createdAt: true },
            orderBy: { [sortBy]: order === "desc" ? "desc" : "asc" },
            skip,
            take: limitNumber,
        });

        const totalUsers = await prisma.user.count({ where: filters });

        res.json({
            totalUsers,
            totalPages: Math.ceil(totalUsers / limitNumber),
            currentPage: pageNumber,
            users,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error fetching users" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ error: "User not found" });

        await prisma.userProject.deleteMany({
            where: { userId: id }
        });

        await prisma.user.delete({ where: { id } });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: "User not deleted" });
    }
}

export const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (role != "admin" && role != "user") {
        return res.status(400).json({ error: "Invalid role" });
    }

    try {
        await prisma.user.update({
            where: { id },
            data: { role },
        });

        res.json({ message: "User role updated successfully" });
    } catch (error) {
        res.status(404).json({ error: "User not found" });
    }
};
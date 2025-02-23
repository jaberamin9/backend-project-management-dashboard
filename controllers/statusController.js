import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStats = async (req, res) => {
    try {
        const totalProjects = await prisma.project.count();

        const activeProjects = await prisma.project.count({
            where: { status: "Active" }
        });
        const reviewProjects = await prisma.project.count({
            where: { status: "Review" }
        });
        const completedProjects = await prisma.project.count({
            where: { status: "Completed" }
        });


        res.json({
            total: totalProjects,
            active: activeProjects,
            review: reviewProjects,
            completed: completedProjects
        });
    } catch (error) {
        res.status(500).json({ error: "Error getting stats" });
    }
};

export const getStatsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const totalProjects = await prisma.project.count({ where: { assignedUsers: { some: { userId: userId } } } });

        const activeProjects = await prisma.project.count({
            where: {
                assignedUsers: { some: { userId: userId } },
                status: "Active"
            }
        });
        const reviewProjects = await prisma.project.count({
            where: {
                assignedUsers: { some: { userId: userId } },
                status: "Review"
            }
        });
        const completedProjects = await prisma.project.count({
            where: {
                assignedUsers: { some: { userId: userId } },
                status: "Completed"
            }
        });

        res.json({
            total: totalProjects,
            active: activeProjects,
            review: reviewProjects,
            completed: completedProjects
        });
    } catch (error) {
        res.status(500).json({ error: "Error getting stats" });
    }
};


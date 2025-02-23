import { PrismaClient } from "@prisma/client";
import { filter } from "../utils/filter.js";

const prisma = new PrismaClient();

export const createProject = async (req, res) => {
    const { title, description, dueDate, assignedUsers } = req.body;

    if (!title || !description || !dueDate || assignedUsers.length == 0) return res.status(400).json({ error: "All fields required" });

    try {
        const project = await prisma.project.create({
            data: {
                title,
                description,
                dueDate: new Date(dueDate),
                assignedUsers: {
                    create: assignedUsers.map(userId => ({ user: { connect: { id: userId } } }))
                },
            }
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: "Error creating project" });
    }
};

export const updateProject = async (req, res) => {
    const { projectId } = req.params;
    const { title, description, dueDate, assignedUsers } = req.body;

    if (!title || !description || !dueDate || assignedUsers.length === 0) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingProject = await prisma.project.findUnique({ where: { id: projectId } });
        if (!existingProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                title,
                description,
                dueDate: new Date(dueDate),
                assignedUsers: {
                    deleteMany: {},
                    create: assignedUsers.map(userId => ({ user: { connect: { id: userId } } }))
                },
            },
            include: { assignedUsers: true }
        });

        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: "Error updating project" });
    }
};

export const getProjects = async (req, res) => {
    try {
        const { filters, skip, sortBy, order, pageNumber, limitNumber } = filter(req, 'title');

        const projects = await prisma.project.findMany({
            where: filters,
            include: {
                assignedUsers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                role: true,
                                createdAt: true,
                            }
                        }
                    }
                }
            },
            orderBy: { [sortBy]: order === "desc" ? "desc" : "asc" },
            skip,
            take: limitNumber,
        });

        const totalProjects = await prisma.project.count({ where: filters });

        res.json({
            totalProjects,
            totalPages: Math.ceil(totalProjects / limitNumber),
            currentPage: pageNumber,
            projects,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching projects" });
    }
};

export const getProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                assignedUsers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                role: true,
                                createdAt: true,
                            }
                        }
                    }
                }
            }
        });
        if (!project) return res.status(404).json({ error: "Project not found" });

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: "Error fetching project" });
    }
};

export const getProjectsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const { filters, skip, sortBy, order, pageNumber, limitNumber } = filter(req, 'title');
        filters['assignedUsers'] = { some: { userId: userId } };

        const isUserExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!isUserExists) return res.status(401).json({ error: "This user is not exists" });

        const projects = await prisma.project.findMany({
            where: filters,
            orderBy: { [sortBy]: order === "desc" ? "desc" : "asc" },
            skip,
            take: limitNumber,
        });

        const totalProjects = await prisma.project.count({ where: filters });

        res.json({
            totalProjects,
            totalPages: Math.ceil(totalProjects / limitNumber),
            currentPage: pageNumber,
            projects,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching projects for user" });
    }
};

export const submitProject = async (req, res) => {
    const { projectId } = req.params;
    const { projectUrl } = req.body;
    if (!projectUrl) {
        return res.status(400).json({ error: "Project URL is required!" });
    }

    try {
        const project = await prisma.project.findFirst({
            where: { id: projectId }
        });

        if (!project) return res.status(400).json({ error: "Project not found!" });

        const updateProject = await prisma.project.update({
            where: { id: projectId },
            data: { projectUrl, status: 'Review' }
        })

        res.json(updateProject);
    } catch (error) {
        res.status(500).json({ error: "Error submit project" });
    }
};

export const changeProjectStatus = async (req, res) => {
    const { projectId } = req.params;
    const { status } = req.body;

    try {
        const project = await prisma.project.findFirst({
            where: { id: projectId }
        });

        if (!project) return res.status(400).json({ error: "Project not found!" });

        const updateProject = await prisma.project.update({
            where: { id: projectId },
            data: { status }
        })

        res.json(updateProject);
    } catch (error) {
        res.status(500).json({ error: "Error approve project" });
    }
};

export const deleteProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await prisma.project.findUnique({ where: { id: projectId } });
        if (!project) return res.status(404).json({ error: "Project not found" });

        await prisma.userProject.deleteMany({
            where: { projectId }
        });

        await prisma.project.delete({ where: { id: projectId } });
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: "Project not deleted" });
    }
}



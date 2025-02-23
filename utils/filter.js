export const filter = (req, searchField) => {
    const { search, page = 1, limit = 10, sortBy = "id", order = "asc", status, role } = req.query;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const filters = {};
    if (status) filters.status = status;
    if (role) filters.role = role;
    if (search) {
        filters[searchField] = { contains: search, mode: "insensitive" };
    }

    return { filters, skip, sortBy, order, pageNumber, limitNumber };
}
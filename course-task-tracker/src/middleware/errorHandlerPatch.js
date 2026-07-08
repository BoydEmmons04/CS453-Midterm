module.exports = (req, res, next) => {
    const { title, course, completed } = req.body;

    if (title !== undefined && typeof title !== "string") {
        return res.status(400).json({
            error: "title must be a string"
        });
    }

    if (course !== undefined && typeof course !== "string") {
        return res.status(400).json({
            error: "course must be a string"
        });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
        return res.status(400).json({
            error: "completed must be a boolean"
        });
    }

    next();
}
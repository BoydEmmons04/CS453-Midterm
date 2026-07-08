module.exports = (req, res, next) => {
    // extract the fields from the request body
    const { title, course, completed } = req.body;

    // validate the fields if they are provided
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

    // If all checks pass, call the next middleware
    next();
}
module.exports = (req, res, next) => {
    const { title, course, completed } = req.body;

    if ( title === undefined || course === undefined || completed === undefined ) {
        return res.status(400).json({
            error: "One or more required fields are missing"
        });
    }

    if ( typeof title !== "string" || typeof course !== "string" || typeof completed !== "boolean" ) {
        return res.status(400).json({
            error: "Invalid data types for one or more fields"
        });
    }

    next();
}

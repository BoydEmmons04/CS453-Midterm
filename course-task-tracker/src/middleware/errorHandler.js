module.exports = (req, res, next) => {
    // Extract the fields from the request body
    const { title, course, completed } = req.body;

    // If a field is missing return 400
    if ( title === undefined || course === undefined || completed === undefined ) {
        return res.status(400).json({
            error: "One or more required fields are missing"
        });
    }

    // If a field is the wrong type return 400
    if ( typeof title !== "string" || typeof course !== "string" || typeof completed !== "boolean" ) {
        return res.status(400).json({
            error: "Invalid data types for one or more fields"
        });
    }

    // If all checks pass, call the next middleware
    next();
}

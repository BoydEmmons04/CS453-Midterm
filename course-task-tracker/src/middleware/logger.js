
module.exports = (req, res, next) => {
    // Get current time
    const start = Date.now();

    res.on("finish", () => {
        // Calculate the duration of the request and get the method, url, and status code
        const duration = Date.now() - start;
        const method = req.method;
        const url = req.originalUrl;
        const status = res.statusCode;

        // Log the request details to the console
        console.log(`${method} ${url} - ${status} - ${duration}ms`);
    });

    // Call the next middleware in the stack
    next();
};
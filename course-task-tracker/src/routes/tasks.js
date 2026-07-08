const express = require("express");
const router = express.Router();
const errorHandler = require("../middleware/errorHandler");
const errorHandlerPatch = require("../middleware/errorHandlerPatch");

// In-memory task storage
let tasks = [
    {
        id: "1",
        title: "Watch Week 3 lecture",
        course: "CS453",
        completed: false
    }
];

let nextId = 2;

// GET /api/tasks
router.get("/", (req, res) => {
    res.json(tasks);
});

// GET /api/tasks/:id
router.get("/:id", (req, res) => {
    // finds the task to return
    const task = tasks.find(t => t.id === req.params.id);

    // If it doesnt exist return error 404
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    // return the task if it exists
    res.json(task);
});

// POST /api/tasks
router.post("/", errorHandler, (req, res) => {
    // validate the body
    const { title, course, completed } = req.body;

    // if a field is missing return an error
    if (title === undefined || course === undefined || completed === undefined) {
        return res.status(400).json({
            error: "title, course, and completed are required"
        });
    }

    // Create a new task object with a unique ID
    const newTask = {
        id: String(nextId++),
        title,
        course,
        completed
    };

    // push the new task to the array
    tasks.push(newTask);

    // return 201 success status
    res.status(201).json(newTask);
});

// PUT /api/tasks/:id
router.put("/:id", errorHandler, (req, res) => {
    // locate the task to replace
    const index = tasks.findIndex(t => t.id === req.params.id);

    // If it doesnt exist, error 404
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    // validate the body
    const { title, course, completed } = req.body;

    // error check if any fields are missing
    if (title === undefined || course === undefined || completed === undefined) {
        return res.status(400).json({
            error: "title, course, and completed are required"
        });
    }

    // create the updated task
    const updatedTask = {
        id: req.params.id,
        title,
        course,
        completed
    };

    // replace the old task with the new
    tasks[index] = updatedTask;

    // return the updated task
    res.json(updatedTask);
});

// PATCH /api/tasks/:id
router.patch("/:id", errorHandlerPatch, (req, res) => {
    // find the task to update
    const task = tasks.find(t => t.id === req.params.id);

    // return 404 if it doesnt exist
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    // validate the body
    const { title, course, completed } = req.body;

    // update the task if the field is provided
    if (title !== undefined) task.title = title;
    if (course !== undefined) task.course = course;
    if (completed !== undefined) task.completed = completed;

    // return the updated task
    res.json(task);
});

// DELETE /api/tasks/:id
router.delete("/:id", (req, res) => {
    // find the index of the task to delete
    const index = tasks.findIndex(t => t.id === req.params.id);

    // if it doesnt exist return 404
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    // remove the task using splice
    tasks.splice(index, 1);

    // return 204 success
    res.sendStatus(204);
});

module.exports = router;
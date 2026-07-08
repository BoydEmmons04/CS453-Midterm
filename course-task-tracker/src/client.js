const serverURL = "http://localhost:3000";

// The function ran when the script is executed
async function run() {
    // Calling health route
    let response = await fetch(`${serverURL}/health`);
    console.log("================== PART 1: Health Check ===================")
    console.log("Health check response: ", await response.json());

    // Create a task calling the POST /api/tasks route
    console.log("================== PART 2: Create Task ===================")
    response = await fetch(`${serverURL}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: "Complete assignment",
            course: "CS100",
            completed: false
        })
    });

    createdTask = await response.json();
    console.log("Created: ", createdTask);

    // List all tasks in the array
    console.log("================== PART 3: List All Tasks ===================")
    response = await fetch(`${serverURL}/api/tasks`);
    console.log("All tasks: ", await response.json());

    // Get one task by ID 
    console.log("================== PART 4: Get Single Task ===================")
    response = await fetch(`${serverURL}/api/tasks/${createdTask.id}`);
    console.log("Get single task: ", await response.json());

    // Update a task by ID
    console.log("================== PART 5: Update Task ===================")
    response = await fetch(`${serverURL}/api/tasks/${createdTask.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: "Complete assignment",
            course: "CS453",
            completed: true
        })
    });

    console.log("Updated: ", await response.json());

    // Delete a task by ID
    console.log("================== PART 6: Delete Task ===================")
    response = await fetch(`${serverURL}/api/tasks/${createdTask.id}`, {
        method: "DELETE"
    });
    
    console.log("Deleted: ", response.status);
}

// Run the function
run();
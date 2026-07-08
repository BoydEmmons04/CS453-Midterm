# Course Task Tracker API

A simple Node.js/Express REST API for managing course-related tasks. This project provides both a server implementation and a client for testing all CRUD operations.

## Features

- **Health Check**: Monitor server status
- **Create Tasks**: Add new tasks with title, course, and completion status
- **Read Tasks**: Retrieve all tasks or get a specific task by ID
- **Update Tasks**: Full replacement (PUT) or partial updates (PATCH) of existing tasks
- **Delete Tasks**: Remove tasks from the tracker
- **In-Memory Storage**: Tasks stored in memory during runtime
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes
- **Request Logging**: Middleware logs all incoming requests

## Project Structure

```
course-task-tracker/
├── package.json           # Project dependencies
├── src/
│   ├── server.js         # Express server setup and health check route
│   ├── client.js         # Test client that exercises all API endpoints
│   ├── middleware/
│   │   ├── logger.js     # Logs all incoming HTTP requests
│   │   ├── errorHandler.js      # Error handling for POST/PUT requests
│   │   └── errorHandlerPatch.js # Error handling for PATCH requests
│   └── routes/
│       └── tasks.js      # All task CRUD operations
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BoydEmmons04/CS453-Midterm.git
   cd course-task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This installs Express.js and its dependencies as defined in `package.json`.

## Running the Application

### Start the Server

From the `course-task-tracker` directory:

```bash
node src/server.js
```

The server will start on `http://localhost:3000` and log:
```
Server running on http://localhost:3000
```

### Run the Test Client

From the `course-task-tracker` directory (in a separate terminal):

```bash
node src/client.js
```

This executes all CRUD operations in sequence and logs the results to the console.

## API Endpoints

### Health Check
- **GET** `/health`
  - Returns server status
  - Response: `{ "status": "OK" }`

### Tasks - List & Create
- **GET** `/api/tasks`
  - Returns all tasks
  - Response: Array of Task objects

- **POST** `/api/tasks`
  - Create a new task
  - Request body:
    ```json
    {
      "title": "Task name",
      "course": "Course code",
      "completed": false
    }
    ```
  - Response (201): Created Task object with auto-generated ID

### Tasks - Get, Update, Delete
- **GET** `/api/tasks/{id}`
  - Retrieve a specific task
  - Response: Task object or 404 error

- **PUT** `/api/tasks/{id}`
  - Replace an entire task (all fields required)
  - Request body: Same as POST
  - Response: Updated Task object or error

- **PATCH** `/api/tasks/{id}`
  - Partially update a task (only provide fields to change)
  - Request body:
    ```json
    {
      "completed": true
    }
    ```
  - Response: Updated Task object or error

- **DELETE** `/api/tasks/{id}`
  - Delete a task
  - Response: 204 No Content or 404 error

## Task Schema

```json
{
  "id": "string",
  "title": "string",
  "course": "string",
  "completed": "boolean"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Missing or invalid fields in request body
- **404 Not Found**: Task ID doesn't exist
- **201 Created**: Task successfully created
- **204 No Content**: Task successfully deleted

Error response format:
```json
{
  "error": "Error message describing what went wrong"
}
```

## Example Usage

### Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete assignment",
    "course": "CS100",
    "completed": false
  }'
```

### Get All Tasks
```bash
curl http://localhost:3000/api/tasks
```

### Update Task (PATCH)
```bash
curl -X PATCH http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for routing and middleware
- **In-Memory Storage**: Simple array-based data storage

## Middleware

- **Logger**: Logs all incoming requests with method, URL, and status
- **Error Handlers**: Validates request bodies for POST/PUT/PATCH operations

## Notes

- Tasks are stored in memory and will be reset when the server restarts
- Task IDs are generated sequentially as strings
- All request/response bodies use JSON format
- See `openapi.yaml` for complete API specification
# PART 1

### 1. What is the difference between a TCP socket server and a HTTP server?
* What does a socket provide?
    * Sockets provide an endpoint to users of a server and provide basic functionality like write and read. TCP sockets can only understand byte streams since it only operates on layer 4
* What does HTTP add on top?
    * HTTP adds many other operations like GET, POST, PUT, and DELETE which basically define a structure for the bytes that travel through the TCP connection. HTTP is on the application layer which allows for many other features as well such as caching and cookies.
* Why do most web APIs not directly expose raw socket protocols?
    * Most web APIs do not directly expose raw socket protocols for security and scalability. The additions made by HTTP and other higher-level APIs have many features that are considered by many to be essential in modern web design.

### 2. Describe the request/response pattern. Then explain how it appears in a TCP command server, an HTTP API, and an Express route handler.
* Description
    * A client sends a request to a server asking for an action or data. The server then processes the request and sends a response
* TCP command server
    * The client sends a command string or raw bytes over a socket. The server has to parse the stream to identify what the requested command is and how to route it. The server then writes the result back directly to the same socket connection.
* HTTP API
    * The client sends a messgae containing an HTTP method such as GET or POST, a URL endpoint, headers, and a body. The server returns an HTTP response with a status code.
* Express route handler
    * The request marches a specific route definition. The route handler receives a req object which has data inside it. The route handler uses the res object to send data back.

### 3. Explain stateless APIs. Give one advantage and one disadvantage.
* A stateless API is where the server does not store any context or session data. Each request is self contained and has all necessary information packaged inside the request.
* One advantage of a stateless API is the scalability and fault tolerance because if a server crashes or has to be rerouted, the requests can simply be routed to another functional server.
* One disadvantage is the increased payload size. Since the server does not store any session data. All relevant data has to be packaged into the request which depending on the application can increase the size and thus decrease performance of individual requests.

### 4. Choose an appropriate HTTP status code and briefly justify it.
* A new resource was connected
    * 201 - This means that a new resource was successfully created. This would fit the scenario.
* The client requested an item that does not exist
    * 404 - This usually indicates that the resource was not found. This definition matches the scenario.
* The client sent JSON missing a required field
    * 400 - This usually indicates that the server cannot process the request due to client error. The client error in this case is the JSON being formatted wrong
* The server had an unexpected error
    * 500 - A generic error indicating that something failed on the server side. This would fit this scenario.
* A successful request returns JSON data
    * 200 - This usually means that the server succeeded with the request and it returned the expected data.
    
# PART 2

### 1. Resource URIs
* Getting all tasks
    * GET /api/tasks
* Getting one taks by ID
    * GET /api/tasks/:id
* Creating a task
    * POST /api/tasks
* Replacing a task
    * PUT /api/tasks/:id
* Partially updating a task
    * PATCH /api/tasks/:id
* Deleting a task
    * DELETE /api/tasks/:id

### 2. For each route specify the HTTP method and explain if it is safe, idempotent, or neither (in order of last question for efficiency so I dont have to type them all out again)

* GET - safe and idempotent because it does not modify the state of the server and just fetches tasks
* GET - safe and idempotent because it reads a single task without modifying
* POST - neither because it creates a new task which changes the state and repeated requests create tasks each time
* PUT - idempotent because it replaces a task which isn't safe but repeating does not continuously make changes
* PATCH - neither because it updates a task and is not garunteed to yield the same result after the first iteration
* DELETE - idempotent because after the first delete, repeating doesn't do anything

### 3. Example JSON representation
```json
{
    "title": "Do Homework",
    "course": "CS 453",
    "completed": false
}
```
# Projects Service Test Suite

This document provides a comprehensive set of test cases to verify the functionality of the Projects Microservice. All requests should be sent to the **API Gateway** at `http://localhost:8080`.

---

## 📋 Table of Contents
1. [Project Tests](#1-project-tests)
2. [Task Tests](#2-task-tests)
3. [Comment Tests](#3-comment-tests)
4. [Document Tests](#4-document-tests)
5. [Error Handling Tests](#5-error-handling-tests)

---

## 1. Project Tests

### Create a Project
**Endpoint:** `POST /api/projects`
```json
{
  "title": "Smart City IoT Platform",
  "description": "Building an intelligent system for urban data analysis.",
  "status": "APPROVED",
  "progress": 0,
  "supervisorId": "550e8400-e29b-41d4-a716-446655440000",
  "studentIds": ["a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"],
  "startDate": "2024-05-01T09:00:00",
  "endDate": "2024-12-01T17:00:00"
}
```

### Get All Projects
**Endpoint:** `GET /api/projects`

### Get Project by ID
**Endpoint:** `GET /api/projects/{id}`

### Update Project
**Endpoint:** `PUT /api/projects/{id}`
```json
{
  "title": "Updated Smart City IoT Platform",
  "description": "Revised description for the PFE project.",
  "status": "IN_PROGRESS",
  "progress": 25,
  "supervisorId": "550e8400-e29b-41d4-a716-446655440000",
  "studentIds": ["a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"]
}
```

### Update Progress (Partial)
**Endpoint:** `PATCH /api/projects/{id}/progress?progress=50`

### Get Projects by Supervisor
**Endpoint:** `GET /api/projects/supervisor/550e8400-e29b-41d4-a716-446655440000`

### Get Projects by Status
**Endpoint:** `GET /api/projects/status/IN_PROGRESS`

---

## 2. Task Tests

### Create a Task
**Endpoint:** `POST /api/tasks`
```json
{
  "title": "Database Schema Design",
  "description": "Design the SQL schema for sensor data.",
  "status": "TODO",
  "priority": "HIGH",
  "projectId": "{PROJECT_ID}",
  "assigneeId": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  "dueDate": "2024-06-15T12:00:00"
}
```

### Get Tasks by Project
**Endpoint:** `GET /api/tasks/project/{PROJECT_ID}`

### Update Task Status
**Endpoint:** `PATCH /api/tasks/{id}/status?status=DONE`

---

## 3. Comment Tests

### Add a Major Comment
**Endpoint:** `POST /api/comments`
```json
{
  "content": "Make sure to use PostgreSQL for the database.",
  "authorId": "550e8400-e29b-41d4-a716-446655440000",
  "projectId": "{PROJECT_ID}"
}
```

### Reply to a Comment (Threaded)
**Endpoint:** `POST /api/comments`
```json
{
  "content": "Agreed, I'll set up the migrations today.",
  "authorId": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  "projectId": "{PROJECT_ID}",
  "parentId": "{PARENT_COMMENT_ID}"
}
```

### List Project Discussion
**Endpoint:** `GET /api/comments/project/{PROJECT_ID}`

---

## 4. Document Tests

### Register Document Metadata
**Endpoint:** `POST /api/documents`
```json
{
  "name": "Design_Document.pdf",
  "uploadedBy": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  "size": 2048576,
  "contentType": "application/pdf",
  "fileUrl": "http://minio:9000/pfe/design.pdf",
  "projectId": "{PROJECT_ID}"
}
```

### Get Project Documents
**Endpoint:** `GET /api/documents/project/{PROJECT_ID}`

---

## 5. Error Handling Tests

### Create Project with Invalid Progress (>100)
**Expectation:** `400 Bad Request`

### Get Non-existent Project
**Expectation:** `404 Not Found`

### Missing Required Fields
**Expectation:** `400 Bad Request` with field error descriptions.

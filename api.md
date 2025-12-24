# Task API Documentation

Base URL:
http://localhost:5000/api/tasks

---

## 📌 Endpoints

### 1️⃣ Get All Tasks
GET /api/tasks
Response:
```
[
  {
    "id": "1",
    "title": "Demo Task",
    "status": "pending"
  }
]
```

---

### 2️⃣ Create Task
POST /api/tasks

Required:
- title (string)

Optional:
- description
- status

Request:
```
{
  "title": "New Task",
  "description": "Sample task"
}
```

Response:
```
{
  "message": "Task Created",
  "task": { }
}
```

Status Codes:
201 Created
400 Bad Request

---

### 3️⃣ Update Task
PUT /api/tasks/:id

Request:
```
{
  "title": "Updated Task",
  "status": "completed"
}
```

Status:
200 OK
404 Not Found

---

### 4️⃣ Delete Task
DELETE /api/tasks/:id

Status:
200 OK
404 Not Found

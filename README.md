# Basic Backend Application

A Node.js backend application for managing courses with two types of users: **Admins** and **Users**.

## Features

### Admin Features
- ✅ Admin signup
- ✅ Create new courses
- ✅ View all courses

### User Features
- ✅ User signup
- ✅ View all available courses
- ✅ Purchase courses
- ✅ View purchased courses

## User Types

### 1. Admins
- Can signup and authenticate
- Can create and manage courses
- Can view all courses in the system

### 2. Users
- Can signup and authenticate
- Can browse available courses
- Can purchase courses
- Can view their purchased courses

## API Endpoints

### Admin Routes

#### `POST /admin/signup`
Create a new admin account
```json
{
  "username": "admin123",
  "password": "password123",
  "name": "Admin Name"
}
```

#### `POST /admin/courses`
Create a new course (Admin only)
```json
{
  "title": "Course Title",
  "description": "Course description",
  "price": 299
}
```

#### `GET /admin/courses`
Get all courses (Admin only)

---

### User Routes

#### `POST /users/signup`
Create a new user account
```json
{
  "username": "user123",
  "password": "password123",
  "name": "User Name"
}
```

#### `GET /users/courses`
Get all available courses
```json
{
  "username": "user123"
}
```

#### `POST /users/courses/:courseId`
Purchase a specific course
```json
{
  "username": "user123"
}
```

#### `GET /users/purchasedCourses`
Get user's purchased courses
```json
{
  "username": "user123"
}
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd basic-backend-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

4. Start the server
```bash
npm start
```

The server will run on `http://localhost:3000`

## Usage Examples

### Admin Workflow
1. **Signup as Admin**: `POST /admin/signup`
2. **Create Course**: `POST /admin/courses`
3. **View All Courses**: `GET /admin/courses`

### User Workflow
1. **Signup as User**: `POST /users/signup`
2. **Browse Courses**: `GET /users/courses`
3. **Purchase Course**: `POST /users/courses/{courseId}`
4. **View Purchased**: `GET /users/purchasedCourses`

## Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict (Already exists) |
| 500 | Internal Server Error |

## Authentication

This application uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected routes.

```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

### Admin
- username (String, unique)
- password (String)
- name (String)

### User
- username (String, unique)
- password (String)
- name (String)
- purchasedCourses (Array of Course IDs)

### Course
- title (String)
- description (String)
- price (Number)

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
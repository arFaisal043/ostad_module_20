# Blog Management System (Backend API)

This is a backend project for a Blog Management System developed using Node.js, Express.js, and MongoDB.

## Features

### User Authentication
- **User Registration API**: Register with `name`, `email`, `password`, and `phoneNumber`.
- **User Login API**: Issues a JWT and stores it securely in an HTTP-only cookie.
- **Get Logged-in User Profile API**: Returns the currently authenticated user's details.
- **Update Profile API**: Update profile information (e.g. name, phoneNumber).

### Blog Management
- **Create Blog API**: Allows authenticated users to create a blog post (`title`, `content`, `authorName`, `tags`, `blogImage`).
- **Read All Blogs API**: Shows a list of all available blog posts.
- **Read Single Blog API**: Get details of a single blog post by its ID.
- **Update Blog API**: Allows the creator of the blog post to update its details.
- **Delete Blog API**: Allows the creator of the blog post to delete it.

### Security
- Blog routes are completely protected.
- Only users with a valid JWT token stored in cookies can access the blog routes.

## Directory Structure
```
.
├── src/
│   ├── config/
│   │   └── db.js               # Database connection
│   ├── controllers/
│   │   ├── blogController.js   # Logic for blog routes
│   │   └── userController.js   # Logic for user routes
│   ├── middlewares/
│   │   └── authMiddleware.js   # JWT authentication middleware
│   ├── models/
│   │   ├── Blog.js             # Mongoose schema for Blogs
│   │   └── User.js             # Mongoose schema for Users
│   ├── routes/
│   │   ├── blogRoutes.js       # Blog API definitions
│   │   └── userRoutes.js       # User API definitions
├── .env                        # Environment variables configuration
├── server.js                   # Application entry point
├── package.json                # Project dependencies and details
└── README.md
```

## Setup & Running the Server

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Verify `.env` has the correct settings. Example defaults included:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/blogDB
   JWT_SECRET=supersecret12345
   NODE_ENV=development
   ```

3. **Start the server**:
   ```bash
   npm run dev    # with nodemon
   # OR
   npm start      # with node
   ```

## Available Endpoints

### User Routes (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Authenticate user & get token cookie | No |
| POST | `/logout` | Logout user & clear cookie | No |
| GET | `/profile` | Get logged-in user profile | Yes |
| PUT | `/profile` | Update user profile | Yes |

### Blog Routes (`/api/blogs`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Fetch all blogs | Yes |
| POST | `/` | Create a new blog | Yes |
| GET | `/:id` | Fetch single blog | Yes |
| PUT | `/:id` | Update a blog | Yes (Creator only) |
| DELETE | `/:id` | Delete a blog | Yes (Creator only) |

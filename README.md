# Blog App

A full-stack blog application built with React and Node.js, featuring user authentication, rich text editing, and image uploads.

![Blog App](./screenshots/blog.png)

## Features

- 🔐 **User Authentication** - Secure authentication using Clerk
- ✍️ **Rich Text Editor** - Create and edit blog posts with React Quill
- 📝 **Blog Posts** - Create, read, update, and delete blog posts
- 🏷️ **Categories** - Organize posts by categories (general, web-design, development, databases, search-engines, marketing)
- ⭐ **Featured Posts** - Highlight important posts
- 💬 **Comments** - Comment on blog posts
- 🔍 **Search** - Search for posts
- 💾 **Save Posts** - Save favorite posts for later
- 📸 **Image Uploads** - Upload cover images using ImageKit
- 📱 **Responsive Design** - Mobile-friendly UI built with Tailwind CSS

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Clerk React** - Authentication
- **React Quill** - Rich text editor
- **ImageKit React** - Image upload and management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Clerk Express** - Authentication middleware
- **ImageKit** - Image storage and CDN
- **Svix** - Webhook handling

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Clerk Account** - For authentication ([sign up here](https://clerk.com))
- **ImageKit Account** - For image storage ([sign up here](https://imagekit.io))

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

## Environment Variables

### Backend (.env)

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

Create a `.env` file in the `client/` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000
VITE_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
VITE_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

## Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:3000
   ```

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   # Frontend runs on http://localhost:5173
   ```

3. **Build for production**
   ```bash
   cd client
   npm run build
   npm run preview
   ```

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Posts
- `GET /posts` - Get all posts
- `GET /posts/:slug` - Get post by slug
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

### Comments
- `GET /comments` - Get all comments
- `GET /comments/:id` - Get comment by ID
- `POST /comments` - Create a new comment
- `PUT /comments/:id` - Update a comment
- `DELETE /comments/:id` - Delete a comment

### Webhooks
- `POST /webhooks` - Handle Clerk webhooks

## Development

### Backend Scripts
- `npm start` - Start the server

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

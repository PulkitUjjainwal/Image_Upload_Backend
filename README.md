SF - Full Stack Developer
Development of a Basic Image Upload Platform
Overview:
Develop a basic version of an image Upload platform where users can upload, view their images. Utilize Node.js, Express, Prisma ORM, and Next.js for the frontend.

Technologies:
Backend: Node.js, Express, Prisma ORM
Frontend: Next.js, Tailwind CSS, ShadcnUI
Features:
User Authentication: Implement user authentication using JWT-based tokens for secure access to the platform.

Image Upload: Allow users to upload images to the platform.

Image Processing: Implement basic image processing to resize images to 400 x 400 pixels and convert them to PNG format. Use Jobs and Queues (Bull) to handle image processing with a limit of 2 images concurrently.

Image Storage: Store image metadata and file paths in a MySQL database using Prisma ORM for efficient data management.

Scheduled Image Publication: Enable users to schedule the publication of their uploaded images at specific times in the future. Utilize Cron Jobs to automate the process of publishing scheduled images at the specified times.

Image Retrieval: Provide endpoints to retrieve and display images to users efficiently.

API Security: Apply appropriate security measures such as rate-limiting (express-rate-limit), CSRF protection (csurf), and input validation (express-validator) to safeguard the API endpoints.

User Profile: Allow users to view their uploaded images and manage their profile settings, providing a personalized experience.

UI Screens:
Figma: Design Mockups
Register
Login
Upload Image with publishing date/time
View Uploaded Images with publishing status
Installation and Setup:
Clone the repository

bash
Copy code
git clone https://github.com/your-username/sf-full-stack-developer.git
cd sf-full-stack-developer
Install dependencies

bash
Copy code
npm install
Set up environment variables

Create a .env file in the root directory and add the following environment variables:

env
Copy code
PORT=3003
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Run the server

bash
Copy code
npm start
The server should now be running on http://localhost:3003.

API Endpoints:
/api/auth/register: POST - Register a new user
/api/auth/login: POST - Authenticate and login a user
/api/images/upload: POST - Upload an image
/api/images/images/:userId: GET - Fetch images uploaded by a user
/api/images/images/: GET - Fetch all images
/api/images/delete/:userId: DELETE - Delete images uploaded by a user
/api/users/:userId: GET - Fetch user profile details
/api/users/:userId: PUT - Update user profile details

Dependencies:
Express.js - Web framework for Node.js
Prisma - Database ORM
Cloudinary - Cloud storage and image management
Bull - Queue library for handling asynchronous jobs
JWT - JSON Web Token for authentication
bcryptjs - Password hashing library
dotenv - Environment variables management
express-rate-limit - Rate limiting middleware for Express
csurf - CSRF protection middleware
express-validator - Input validation and sanitization middleware
and more...

Authors:
Your Name - Pulkit Ujjainwal

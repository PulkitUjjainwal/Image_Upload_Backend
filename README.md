Image Upload Platform
Overview
This repository contains the code for an Image Upload Platform, allowing users to upload, view, and manage their images. The platform is built using Node.js, Express, Prisma ORM for database operations, and Next.js for the frontend.

Setup
To set up the project locally, follow these steps:

1. Clone the repository:
bash
Copy code
git clone https://github.com/your-username/image-upload-platform.git
cd image-upload-platform
2. Install dependencies:
bash
Copy code
npm install
3. Set up the MySQL Database
Create a MySQL database for storing image metadata. Adjust the database connection details in .env file.

4. Configure environment variables:
Create a .env file in the root directory and add the following environment variables:

env
Copy code
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=image_upload_db
JWT_SECRET=your_jwt_secret
5. Run the server:
bash
Copy code
npm start
The server should now be running on http://localhost:5000.

Features
1. User Authentication
Implement JWT-based authentication for secure access to the platform.
2. Image Upload
Allow users to upload images to the platform.
3. Image Processing
Resize uploaded images to 400x400 pixels and convert them to PNG format.
4. Image Storage
Store image metadata and file paths in a MySQL database using Prisma ORM.
5. Scheduled Image Publication
Enable users to schedule the publication of their uploaded images for future dates using Cron Jobs.
6. Image Retrieval
Provide endpoints to retrieve and display images to users efficiently.
7. API Security
Implement security measures such as rate-limiting, CSRF protection, and input validation.
8. User Profile
Allow users to manage their profile settings and view their uploaded images.
API Endpoints
POST /api/auth/register
Register a new user.
Request Body:
json
Copy code
{
  "username": "example_user",
  "password": "password123"
}
Response:
json
Copy code
{
  "success": true,
  "message": "User registered successfully"
}
POST /api/auth/login
Authenticate and login a user.
Request Body:
json
Copy code
{
  "username": "example_user",
  "password": "password123"
}
Response:
json
Copy code
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
POST /api/images/upload
Upload an image.
Request Body:
Form-data with image field for the image file.
Response:
json
Copy code
{
  "success": true,
  "message": "Image uploaded successfully",
  "imageUrl": "https://example.com/uploads/image.jpg"
}
GET /api/images/user/
Retrieve images uploaded by a specific user.
Response:
json
Copy code
{
  "success": true,
  "images": [
    {
      "id": 1,
      "imageUrl": "https://example.com/uploads/image1.jpg",
      "uploadedAt": "2024-06-13T12:00:00Z"
    },
    {
      "id": 2,
      "imageUrl": "https://example.com/uploads/image2.jpg",
      "uploadedAt": "2024-06-13T13:00:00Z"
    }
  ]
}
DELETE /api/images/
Delete an image by its ID.
Response:
json
Copy code
{
  "success": true,
  "message": "Image deleted successfully"
}
Testing
To run tests, execute the following command:

bash
Copy code
npm run test
Live API
The API is hosted live at https://your-image-upload-api.com. You can use this URL to interact with the API endpoints directly.


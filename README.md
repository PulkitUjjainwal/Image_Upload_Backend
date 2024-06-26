# Image Upload Platform API

This repository contains the code for an Image Upload Platform, allowing users to upload, view, and manage their images. The platform is built using Node.js, Express, Prisma ORM, and MySQL. Key features include JWT-based user authentication, image upload and processing (resize and format conversion), image storage with metadata, scheduled image publication with Cron Jobs, image retrieval, and API security measures (rate limiting, CSRF protection)

## Setup

To set up the project, follow these steps:

#### 1. Clone the repository:

```bash
git clone https://github.com/your-username/image-upload-platform.git
cd image-upload-platform
```

#### 2. Install the Dependencies:

```bash
npm install @prisma/client bcryptjs bull cloudinary cors csurf datauri dotenv express express-rate-limit express-validator helmet jsonwebtoken multer multer-storage-cloudinary node-cron nodemon prisma sharp

```

#### 3.  Set up the MySQL Database:
Create a MySQL database for storing image metadata. 


#### 4.  Initialize the Prisma Schema
Initialize the prisma Schema using the follow command

```bash
prisma init
```

#### 5. Setup Cloudinary:
Login and Setup Cloudinary for Image uploading. and get all the required env variables.


#### 6. Configure environment variables:
Create a .env file in the root directory and add the following environment variables:

```env 
PORT=3003
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=your_jwt_secret
DATABASE_URL = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

#### 7. Prisma migrations:
Run the Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev

```

#### 8. Run the server:

```bash
node start
```

The server should now be running on 

```bash 
http://localhost:3003. 
```
and the APIs can be accessed through 

```bash 
http://localhost:3003/api
```


## API Endpoints

The Image Upload Platform Backend API provides the following endpoints: 


### 1. Register a User

Request Body should contain a valid JSON object.

```bash
- URL: /api/auth/register
- Method: POST
- Request Body:
  - email: String (required) - The email id of the user.
  - password: String (required) - The password of the user.
- Success Response:
  - Code: 201
  - Content:
    {
      "success": true,
      "message": "User registered successfully"
    }
  ```

### 2. User Login

```bash
- URL: /api/auth/login
- Method: POST
- Path Parameters:
  - email: String (required) - The email ID of the user.
  - password: String (required) - The password of the user.
- Success Response:
  - "success": true,
  - "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  ```

### 3. Uploading an Image

Note: Request Body should contain Form-data with image field for the image file.

```bash
- URL: /api/images/upload
- Method: POST
- Path Parameters:
  - Image (.jpeg , .jpg or .png)
- Success Response:
  - "success": true,
  - "message": "Image uploaded successfully",
  - "imageUrl": "https://example.com/uploads/image.jpg"

  ```

### 4. Fetch Uploaded Images ( for the specific user )

```bash
- URL: /api/images/images/:userId
- Method: GET
- Path Parameters:
  - userID : int ( unique )
- Success Response:
  - "success": true,
  - "images": [
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
              
  ```


### 5. Fetch User Information

```bash
- URL: /api/users/:userId
- Method: GET
- Path Parameters:
  - userID : int ( unique )
- Success Response:
  - "success": true,
  -  "id" : 1
  - "email" : "xyz@gmail.com"
  - "images": [
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
  ```





## Live API

The API is also hosted on https://image-upload-backend-m1dw.onrender.com/api/. You can use this URL to interact with the API endpoints directly. \
Note: The API might take around 1 minute to load, only for the first time.

### User Authentication API

```bash
https://image-upload-backend-m1dw.onrender.com/api/auth
```

### Image API for image retrival and Uploading

```bash
https://image-upload-backend-m1dw.onrender.com/api/images
```

### User API for fetching user data or updating

```bash
https://image-upload-backend-m1dw.onrender.com/api/users
```

# Deployed Link for Image Upload Platform
Live Link - https://imageuploadplatform.netlify.app/


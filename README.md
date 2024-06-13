# Sleep Tracker API

This repository contains the code for the Sleep Tracker API, which is designed to manage sleep records for users.

## Setup

To set up the project, follow these steps:

#### 1. Clone the repository:

```bash
git clone https://github.com/your-username/image-upload-platform.git
cd image-upload-platform
```

#### 2. Install the Dependencies:

```bash
npm install
```

#### 3.  Set up the MySQL Database:
Create a MySQL database for storing image metadata. Adjust the database connection details in .env file.


#### 4. Configure environment variables:
Create a .env file in the root directory and add the following environment variables:

```env 
PORT=3003
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=image_upload_db
JWT_SECRET=your_jwt_secret
```

#### 5. Run the server:

```bash
node start
```


The server should now be running on 

```bash 
http://localhost:3003. 
```
and the APIs can be accessed through 

```bash 
http://localhost:3003/api. 
```


## API Endpoints

The Image Upload Platform Backend API provides the following endpoints: 


### 1. Register a User

Request Body should contain a valid JSON object.

```bash
- URL: /api/auth/register
- Method: POST
- Request Body:
  - email: String (required) - The email ID of the user.
  - password: String (required) - The Password of hours slept.
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
  - password: String (required) - The Password of hours slept.
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
  - JWT token ( generated during login )
- Success Response:
  - "success": true,
  - "message": "Image uploaded successfully",
  - "imageUrl": "https://example.com/uploads/image.jpg"

  ```

### 2. User Login

```bash
- URL: /api/auth/login
- Method: POST
- Path Parameters:
  - email: String (required) - The email ID of the user.
  - password: String (required) - The Password of hours slept.
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




## Live API

The API is also hosted on https://backend-assignment-sleep-tracker.onrender.com/api/. You can use this URL to interact with the API endpoints directly. \
Note: The API might take around 1 minute to load, only for the first time.

### POST Endpoint

```bash
https://backend-assignment-sleep-tracker.onrender.com/api/sleep
```

### GET Endpoint

```bash
https://backend-assignment-sleep-tracker.onrender.com/api/sleep/:userId
```

### DELETE Endpoint

```bash
https://backend-assignment-sleep-tracker.onrender.com/api/sleep/:recordId
```



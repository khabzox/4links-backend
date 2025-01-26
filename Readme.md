# 4Links Backend

4Links is a URL shortening service that allows users to create, manage, and track shortened URLs.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
  - [Create a Shortened URL](#create-a-shortened-url)
  - [Get All URLs](#get-all-urls)
  - [Get a Shortened URL](#get-a-shortened-url)
  - [Read a URL](#read-a-url)
  - [Update a URL](#update-a-url)
  - [Delete a URL](#delete-a-url)
  - [Redirect to the Original URL](#redirect-to-the-original-url)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
     ```sh
     git clone https://github.com/yourusername/4links-backend.git
     cd 4links-backend
     ```

2. Install dependencies:

    ```sh
    npm install
    ```

### Configuration

1. Create a `.env` file based on the `.env.example`:

    ```sh
    cp .env.example .env
    ```

2. Update the `.env` file with your MongoDB URI and other configuration settings.

     ```sh
    # MongoDB connection URI
    MONGODB_URI=your_mongodb_uri

    # Server port
    PORT=5000

    # Clerk API keys for authentication and authorization
    CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    ```
### Running the Server

1. Start the server:

    ```sh
    npm start
    ```

The server will be running on [http://localhost:5000](http://localhost:5000).

## API Documentation

### Create a Shortened URL

- **Endpoint:** `POST /api/shorten`
- **Description:** Creates a shortened URL.
- **Request Body:**
    ```json
    {
      "originalUrl": "https://example.com"
    }
    ```
- **Response:**
    ```json
    {
      "shortUrl": "abc123"
    }
    ```

### Get All URLs

- **Endpoint:** `GET /api/all`
- **Description:** Retrieves all URLs.
- **Response:**
    ```json
    [
      {
        "originalUrl": "https://example.com",
        "shortUrl": "abc123"
      },
      ...
    ]
    ```

### Get a Shortened URL

- **Endpoint:** `GET /api/get-short-url`
- **Description:** Retrieves a shortened URL for a given original URL.
- **Request Query:**
    ```json
    {
      "originalUrl": "https://example.com"
    }
    ```
- **Response:**
    ```json
    {
      "shortUrl": "abc123"
    }
    ```

### Read a URL

- **Endpoint:** `GET /api/:shortUrl`
- **Description:** Retrieves the original URL for a given shortened URL.
- **Response:**
    ```json
    {
      "originalUrl": "https://example.com",
      "shortUrl": "abc123"
    }
    ```

### Update a URL

- **Endpoint:** `PUT /api/:shortUrl`
- **Description:** Updates the original URL for a given shortened URL.
- **Request Body:**
    ```json
    {
      "originalUrl": "https://newexample.com"
    }
    ```
- **Response:**
    ```json
    {
      "originalUrl": "https://newexample.com",
      "shortUrl": "abc123"
    }
    ```

### Delete a URL

- **Endpoint:** `DELETE /api/:shortUrl`
- **Description:** Deletes a shortened URL.
- **Response:**
    ```json
    {
      "message": "URL deleted"
    }
    ```

### Redirect to the Original URL

- **Endpoint:** `GET /api/r/:shortUrl`
- **Description:** Redirects to the original URL associated with the shortened URL.

## Example Usage

To use the 4Links backend package in your project, follow these steps:

### Install the package:

```sh
npm install 4links-backend
```

### Import and use the functions in your project:

```javascript
import express from "express";
import { connectDB, setupMiddleware, createUrl, readUrl, updateUrl, deleteUrl, getAllUrls, getShortenedUrl, redirectUrl } from "4links-backend";

const app = express();

// Connect to MongoDB
connectDB();

// Setup middleware
setupMiddleware(app);

// Define routes
app.post("/shorten", createUrl);
app.get("/all", getAllUrls);
app.get("/get-short-url", getShortenedUrl);
app.get("/:shortUrl", readUrl);
app.put("/:shortUrl", updateUrl);
app.delete("/:shortUrl", deleteUrl);
app.get("/r/:shortUrl", redirectUrl);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### License
- This project is licensed under the MIT License.


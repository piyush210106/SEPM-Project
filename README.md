
# InterVue - A Talent Acquisation Platform

A full-stack interview application enabling seamless interaction between candidates and recruiters.

## Authors

- [Piyush Garg](https://www.github.com/piyush210106)
- [Anmol Pandey](https://www.github.com/BeholdCalvin)
- [Pragya Agarwal](https://www.github.com/ctrl-alt-elite1)
- [Nikita](https://www.github.com/niki-1003)


## Demo

Will be added at a later stage.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Frontend

`VITE_FIREBASE_API_KEY`

`VITE_FIREBASE_AUTH_DOMAIN`

`VITE_FIREBASE_PROJECT_ID`

`VITE_API_URL`

### Server

`MONGO_DB_URL`

`MONGO_DB_NAME`

`PORT`

`AI_INTERNAL_SECRET`

`JWT_SECRET`

`SIGNALING_SERVER_URL`

`FIREBASE_PROJECT_ID`

`FIREBASE_CLIENT_EMAIL`

`FIREBASE_PRIVATE_KEY`

`AI_SERVICE_URL`

### AI Service

`MONGO_DB_URL`

`MONGO_DB_NAME`

`PORT`

`AI_INTERNAL_SECRET`

`JWT_SECRET`

`PINECONE_API_KEY`

`PINECONE_ENVIRONMENT`

`PINECONE_INDEX_NAME`

`GOOGLE_API_KEY`

### Signaling Server

`JWT_SECRET`

`PORT`









## Database Setup

This project uses MongoDB as the database.

### 1. Create a MongoDB Database

Create a free MongoDB Atlas account and create a new cluster.

### 2. Get the MongoDB Connection String

In MongoDB Atlas, go to:

`Database → Connect → Drivers`

Copy the connection string.

### 3. Add Environment Variables

Create a `.env` file in the backend and AI service directory and add:

```env
MONGODB_URI=your_mongodb_connection_string
```
## Required Dependencies

### Backend Service

```json
{
    "axios": "^1.13.2",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "firebase-admin": "^13.6.0",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.1.2",
    "multer": "^2.0.2",
    "nodemon": "^3.1.11",
    "socket.io": "^4.8.3",
    "uuid": "^13.0.0"
}
```

### Frontend

```json
{
    "@reduxjs/toolkit": "^2.11.2",
    "@tailwindcss/vite": "^4.1.18",
    "axios": "^1.13.2",
    "firebase": "^12.8.0",
    "framer-motion": "^12.26.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.12.0",
    "socket.io-client": "^4.8.3",
    "tailwindcss": "^4.1.18"
}
```

### AI Service

```json
{
  "fastapi": "0.128.0",
  "uvicorn": "0.40.0",
  "pydantic": "2.12.5",
  "python-dotenv": "1.2.1",
  "google-genai": "1.57.0",
  "langchain-google-genai": "4.1.3",
  "langchain-core": "1.2.7",
  "langchain-community": "0.4.1",
  "langchain": "1.2.3",
  "pypdf": "6.6.1",
  "pinecone": "8.0.0",
  "pymongo": "4.16.0",
  "numpy": "2.4.1",
  "requests": "2.32.5"
}
```

### Signaling Server

```json
{
  "dotenv": "^17.2.3",
  "jsonwebtoken": "^9.0.3",
  "nodemon": "^3.1.11",
  "socket.io": "^4.8.3"
}
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/piyush210106/SEPM-Project
```

### Frontend

Go to the Frontend directory

```bash
  cd Client
```

Install dependencies

```bash
  npm install
```

Add the environment variables


Start the server

```bash
  npm run dev
```

### Backend

Go to the Backend directory

```bash
  cd Server
```

Install dependencies

```bash
  npm install
```

Add the environment variables


Start the server

```bash
  npm run start
```

### AI Service

Go to the AI Service directory

```bash
  cd AI Service
```

Create a virtual environment

```bash
  python -m venv venv
```

Activate the virtual environment

```bash
  venv\Scripts\activate
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Add the environment variables

Start the FastAPI server

```bash
  uvicorn main:app --reload --port 8000
```

### Signaling Server

Go to the Signaling Server directory

```bash
  cd Signaling Server
```

Install dependencies

```bash
  npm install
```

Add the environment variables


Start the server

```bash
  npm run start
```

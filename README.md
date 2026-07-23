# AI Knowledge Base Assistant

## Project Overview

AI Knowledge Base Assistant is a full-stack application that allows users to upload documents and interact with them using AI.

Users can upload PDF, TXT, and Markdown documents. The system extracts document content, divides it into meaningful chunks, retrieves relevant information based on user questions, and generates AI-powered answers using Google's Gemini API.

The application implements authentication, document management, AI question answering, and chat history management.

---

# Features

## User Authentication

- User registration
- User login
- JWT based authentication
- Protected APIs
- Secure password hashing using bcrypt

---

## Document Management

Users can:

- Upload PDF files
- Upload TXT files
- Upload Markdown files
- View uploaded documents
- Delete documents

Stored information:

- Document name
- File type
- File size
- Upload timestamp
- Owner information
- Metadata

---

## AI Question Answering

The application uses a Retrieval Augmented Generation (RAG) approach.

Flow:
Upload Document
|
↓
Extract Text
|
↓
Split Into Chunks
|
↓
Store Chunks
|
↓
User Question
|
↓
Retrieve Relevant Chunks
|
↓
Gemini AI
|
↓
Answer


The AI answers questions based only on the uploaded document content.

---

## Chat History

The system stores:

- User
- Document
- Question
- AI Response
- Timestamp

Users can view previous conversations.

---

# Tech Stack

## Frontend

- React.js
- JavaScript
- Axios
- CSS

## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer
- REST APIs

## Database

- MongoDB
- Mongoose

## AI

- Google Gemini API

---

# Project Structure


ai-knowledge-base-assistant

├── client
│ └── React frontend
│
├── server
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ ├── services
│ └── server.js
│
├── README.md
├── AI_USAGE.md
├── DEBUG_NOTES.md
└── ARCHITECTURE.md


---

# Installation Steps

## Clone Repository


git clone <repository-url>


Move into project:


cd ai-knowledge-base-assistant


---

# Backend Setup

Go to server:


cd server


Install dependencies:


npm install

Run server:


npm run dev


Server runs on:


http://localhost:5000


---

# Frontend Setup

Go to client:


cd client


Install dependencies:


npm install


Run:


npm run dev


Frontend runs on:


http://localhost:5173


---

# Design Decisions

## Authentication

JWT authentication was selected because it provides a stateless and scalable authentication mechanism.

Passwords are encrypted using bcrypt before storing them.

---

## Document Processing

Documents are converted into text before processing.

The extracted text is divided into smaller chunks to improve AI retrieval accuracy.

---

## AI Approach

A Retrieval Augmented Generation approach was used instead of directly sending entire documents to the AI model.

Benefits:

- Better accuracy
- Reduced token usage
- Document-based answers

---

# Future Improvements

Possible improvements:

- Semantic vector search using embeddings
- Document preview
- OCR support
- Pagination
- Docker deployment
- Unit testing
- Streaming AI responses
- Redis caching

---

# Environment Requirements

- Node.js
- MongoDB
- Gemini API Key

---

# Author

Mounika Narem
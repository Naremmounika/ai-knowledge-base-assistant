# System Architecture

## Overview

AI Knowledge Base Assistant is a full-stack application that allows users to upload documents and ask questions about their content using an AI-powered Retrieval Augmented Generation (RAG) pipeline.

The system consists of:

- React frontend
- Node.js + Express backend
- MongoDB database
- Google Gemini AI service

---

# High Level Architecture
            User
             |
             |
      React Frontend
             |
             |
      REST API Requests
             |
             |
    Node.js + Express Server
             |
  ---------------------------
  |            |            |
  |            |            |
  Authentication Documents Chat
| | |
| | |
JWT File Upload Questions
|
|
MongoDB
|
|
Gemini AI Service


---

# Project Structure


ai-knowledge-base-assistant

│
├── client
│
│ └── React Application
│ ├── components
│ ├── pages
│ ├── api
│ └── styles
│
│
├── server
│
│ ├── controllers
│ │
│ ├── models
│ │
│ ├── routes
│ │
│ ├── middleware
│ │
│ ├── services
│ │
│ ├── uploads
│ │
│ └── server.js
│
│
├── README.md
├── AI_USAGE.md
├── DEBUG_NOTES.md
└── ARCHITECTURE.md


---

# Database Design

MongoDB is used as the primary database.

## Users Collection

Stores user account information.

Schema:


User
{
name,
email,
password,
createdAt,
updatedAt
}


Purpose:

- Authentication
- User ownership tracking

---

# Documents Collection

Stores uploaded document information.

Schema:


Document
{
fileName,
originalName,
fileType,
fileSize,
filePath,
extractedText,
metadata,
owner,
createdAt
}


Purpose:

- Store uploaded documents
- Connect documents with users

---

# DocumentChunks Collection

Stores processed document sections.

Schema:


DocumentChunk
{
document,
owner,
chunkIndex,
content,
createdAt
}


Purpose:

- Store smaller searchable pieces of documents
- Improve AI retrieval accuracy

---

# Chat Collection

Stores user conversations.

Schema:


Chat
{
user,
document,
question,
answer,
createdAt
}


Purpose:

- Maintain conversation history
- Track document-based questions

---

# Authentication Approach

JWT authentication is used.

Flow:


User Login
|
↓
Validate Credentials
|
↓
Generate JWT Token
|
↓
Client Stores Token
|
↓
Token Sent With Requests
|
↓
Middleware Verifies Token
|
↓
Protected API Access


Passwords are stored after hashing using bcrypt.

---

# Document Processing Flow

When a user uploads a document:


Upload File
|
↓
Multer Middleware
|
↓
Validate File Type
|
↓
Extract Text
|
↓
Split Into Chunks
|
↓
Store Document
|
↓
Store Chunks


Supported formats:

- PDF
- TXT
- Markdown

---

# AI Question Answering Architecture

The application uses Retrieval Augmented Generation.

Process:


User Question

  ↓

Retrieve Relevant Document Chunks

  ↓

Create Context

  ↓

Send Context + Question to Gemini

  ↓

Generate Answer

  ↓

Save Conversation


Advantages:

- Answers are based on uploaded documents
- Reduces incorrect responses
- Uses smaller context windows

---

# Major Engineering Decisions

## MongoDB

Chosen because:

- Flexible document structure
- Easy integration with Node.js
- Suitable for storing document metadata

---

## JWT Authentication

Chosen because:

- Stateless authentication
- Easy API protection
- Suitable for scalable applications

---

## Chunk Based Retrieval

Chosen because:

- Large documents cannot always be sent completely to AI models
- Improves relevance of retrieved information

---

## Gemini API

Chosen because:

- Strong language understanding
- Suitable for document question answering
- Easy API integration

---

# Error Handling Strategy

The application handles:

- Invalid authentication
- Unauthorized requests
- Unsupported files
- Upload failures
- Database errors
- AI API failures

Errors are returned with meaningful messages.

---

# Future Improvements

Possible production improvements:

## Better Search

Implement:

- Vector embeddings
- Vector databases
- Semantic search

Examples:

- Pinecone
- ChromaDB
- FAISS

---

## Performance

Add:

- Redis caching
- Background document processing
- Queue systems

---

## Security

Improve with:

- Rate limiting
- File scanning
- Role based access control

---

## Deployment

Possible improvements:

- Docker containers
- CI/CD pipeline
- Cloud deployment
- Monitoring and logging

---

# Scalability Approach

For a larger system:

Frontend
|
API Gateway
|
Backend Services
|

| | |
Auth Document AI Service
Service Service
|
Database
|
Cache Layer
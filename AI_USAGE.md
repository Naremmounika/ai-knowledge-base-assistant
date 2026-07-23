# AI Usage Documentation

## Overview

During the development of the AI Knowledge Base Assistant project, AI tools were used as development assistants for understanding concepts, debugging errors, improving code quality, and reviewing implementation approaches.

The final implementation was tested, modified, and verified manually before submission.

---

# AI Tools Used

## 1. ChatGPT

Purpose:

- Understanding implementation approaches
- Debugging errors
- Code review
- Explaining technical concepts
- Improving documentation

Used for:

- React component structure
- Backend API debugging
- MongoDB schema discussions
- Gemini API integration guidance
- Error analysis

---

## 2. Google Gemini API

Purpose:

- AI-powered document question answering

Usage:

The application sends relevant document chunks along with user questions to Gemini.

Example:

User Question:
Tell me about the projects in this document.


Document Context:


Extracted document chunks related to projects.


Gemini Response:


The document contains:

Online Exam Proctoring & Result Analysis System
Job Portal
E-Commerce Application

---

# Example AI Prompts Used During Development

## Debugging Prompt


I am getting this error in my Node.js application.
Explain the root cause and provide a fix.


---

## Architecture Prompt


Help me design a document based AI assistant using React,
Node.js, MongoDB and Gemini API.


---

## Code Review Prompt


Review this backend controller and identify possible errors.


---

## Documentation Prompt


Create professional documentation for this full stack project.


---

# Code Generated With AI Assistance

AI assistance was used for:

- Boilerplate React components
- API integration examples
- Error handling suggestions
- Documentation structure
- Debugging approaches

Examples:

- React class component patterns
- Express controller improvements
- MongoDB query suggestions

---

# Code Modified By Developer

The following parts were implemented and modified manually:

## Backend

- Authentication flow
- JWT middleware
- MongoDB models
- Document upload logic
- File extraction service
- Chunk generation logic
- Retrieval logic
- Gemini API integration

## Frontend

- Dashboard UI
- Authentication pages
- Document upload interface
- Document listing
- Chat interface

---

# Incorrect AI Suggestions Encountered

During development, some AI-generated suggestions required correction.

## Issue 1: PDF Parsing

Problem:

An initial suggestion used an incorrect import method for `pdf-parse`.

Error:


pdfParse is not a function


Resolution:

The package version and module format were checked, and the implementation was updated accordingly.

---

## Issue 2: Gemini API Configuration

Problem:

The Gemini API returned:


API_KEY_INVALID


Resolution:

The API key configuration was verified, environment variables were checked, and the server restart was performed after updating `.env`.

---

## Issue 3: Frontend State Handling

Problem:

Dashboard components initially received undefined data.

Error:


Cannot read properties of undefined (reading 'length')


Resolution:

Default state values and API response checks were added.

---

# Verification Process

All AI-assisted changes were verified by:

- Running the backend locally
- Testing REST APIs
- Uploading sample documents
- Testing Gemini responses
- Checking MongoDB data
- Testing frontend flows

---
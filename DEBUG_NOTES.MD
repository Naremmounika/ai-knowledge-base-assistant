# Debug Notes

This document describes major issues encountered during development, investigation process, root causes, and solutions.

---

# Issue 1: PDF Text Extraction Failure

## Problem

While uploading PDF documents, the upload API was working, but document processing failed with the error:
TypeError: pdfParse is not a function


---

## Root Cause

The installed `pdf-parse` package version had a different module export format compared to the import syntax used in the application.

The code initially used:

```javascript
import pdfParse from "pdf-parse";

which was incompatible with the installed package version.

Investigation

Steps performed:

Checked backend logs after document upload.
Verified that Multer successfully received the file.
Confirmed that the failure occurred only during PDF extraction.
Checked installed package version:
npm list pdf-parse
Updated the import and usage according to the installed package format.
Solution

The PDF extraction service was modified to correctly initialize the PDF parser.

After the fix:

PDF upload succeeded.
Text extraction worked.
Extracted content was stored in MongoDB.
Issue 2: Gemini API Key Invalid Error
Problem

The AI question answering feature failed with:

API key not valid.
Please pass a valid API key.
Root Cause

The Gemini API key was either:

Incorrectly configured
Not loaded from environment variables
Generated from an incorrect project configuration
Investigation

Steps performed:

Checked .env configuration.
Verified that GEMINI_API_KEY was loaded.
Added temporary logging to confirm environment variable loading.
Tested Gemini API separately.
Generated a valid Gemini API key.
Solution

Updated the .env file:

GEMINI_API_KEY=valid_key

Restarted the backend server.

After verification:

Gemini API requests succeeded.
AI generated document-based answers.
Issue 3: Document Upload Returning 500 Error
Problem

Uploading documents from frontend resulted in:

POST /api/documents/upload
500 Internal Server Error
Root Cause

The upload pipeline failed during document processing.

The file upload itself was successful, but errors occurred while:

Extracting text
Creating chunks
Saving processed data
Investigation

Steps performed:

Checked browser network logs.
Checked backend terminal logs.
Verified uploaded file details:
filename
mimetype
file path
file size
Added debugging logs in document controller.
Identified failure point in text extraction service.
Solution

Improved:

Error handling
File processing checks
Extraction service validation

After changes:

PDF upload completed successfully.
Extracted text was stored.
Document chunks were created.
Issue 4: Dashboard Undefined Data Error
Problem

Dashboard crashed with:

Cannot read properties of undefined (reading 'length')
Root Cause

The frontend expected an API response array, but the value was undefined during initial rendering.

Investigation

Checked:

API response structure
Component state initialization
Rendering conditions
Solution

Added:

Default empty arrays
Conditional rendering
API response validation

Example:

documents || []

The dashboard loaded correctly after the fix.
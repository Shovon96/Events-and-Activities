# User Registration Implementation

## Overview
This document describes the implementation of the user registration functionality that connects the frontend form to the backend API.

## Backend API Details

### Endpoint
- **URL**: `POST /api/users/register`
- **Content-Type**: `multipart/form-data`

### Request Format
The backend expects a FormData object with:
- `file`: (optional) Profile image file
- `data`: JSON stringified object containing:
  ```json
  {
    "email": "string",
    "password": "string (min 6 chars)",
    "fullName": "string (min 2 chars)",
    "interests": ["string"] (optional),
    "city": "string" (optional),
    "role": "USER" | "HOST" | "ADMIN" (default: "USER")
  }
  ```

### Response Format
**Success (200)**:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "User created successfully!",
  "data": {
    "id": "string",
    "email": "string",
    "fullName": "string",
    "profileImage": "string (Cloudinary URL)",
    "interests": ["string"],
    "city": "string",
    "role": "string",
    "createdAt": "timestamp"
  }
}
```

**Error (409 - User exists)**:
```json
{
  "success": false,
  "message": "User already exists"
}
```

## Frontend Implementation

### Files Modified
1. **RegisterForm.tsx** - Main registration form component
2. **registerUser.validation.ts** - Zod validation schema (already existed)

### Files Created
1. **.env.local** - Environment variables for local development
2. **.env.example** - Example environment file for reference

### Interests Field Implementation

The interests field is implemented to support comma-separated input:

**Database Structure:**
- PostgreSQL array type: `String[]`
- Prisma schema: `interests String[]`

**Frontend Handling:**
- Users type interests separated by commas: "Music, Sports, Technology"
- Input automatically splits by comma and trims whitespace
- Displays as visual tags below the input
- Each tag can be removed individually by clicking the × button
- Sent to backend as JSON array: `["Music", "Sports", "Technology"]`

**Backend Handling:**
- Receives interests as array from JSON data
- Saves directly to PostgreSQL as array type
- No additional processing needed

### Key Features Implemented

#### 1. Form Validation
- Uses Zod schema for client-side validation
- Validates email, password (min 6 chars), fullName (min 2 chars)
- Required fields: email, password, fullName
- Optional fields: bio, profileImage, interests, city

#### 2. File Upload Handling
- Stores actual File object (not base64) for API submission
- Generates preview using FileReader for UI display
- Supports image files (PNG, JPG, etc.)

#### 3. API Integration
- Uses Next.js native `fetch` API
- Constructs FormData with file and JSON data
- Configurable API URL via environment variable
- Proper error handling for network and validation errors

#### 4. User Experience
- Loading states during submission
- Error messages displayed in red alert box
- Success messages displayed in green alert box
- Form fields disabled during submission
- Auto-redirect to login page after successful registration
- Interest tags with add/remove functionality

#### 5. Debugging Console Logs
Comprehensive logging throughout the flow:
- 🚀 Form submission started
- 📝 Form data logging
- ✅ Validation status
- 📎 File upload details
- 📦 User data being sent
- 🏷️ Interests array details (array and length)
- 🌐 API endpoint being called
- 📡 Response status
- 📥 Response data
- ❌ Error details
- 🏁 Completion status
- 📝 Interests updated (when typing)
- ➖ Removing interests (when clicking × button)
- 📁 File selection
- 🖼️ Preview generation

## Environment Configuration

### .env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Note**: Make sure your backend server is running on port 5000, or update this value accordingly.

## Testing the Implementation

### Prerequisites
1. Backend server running on configured port (default: 5000)
2. Database connected and migrations run
3. Cloudinary credentials configured in backend (for image uploads)

### Test Cases

#### 1. Successful Registration (without image)
- Fill in: Full Name, Email, Password
- Submit form
- Expected: Success message, redirect to login

#### 2. Successful Registration (with image)
- Fill in: Full Name, Email, Password
- Upload profile image
- Submit form
- Expected: Success message, image uploaded to Cloudinary, redirect to login

#### 3. Validation Errors
- Try submitting with empty required fields
- Try password less than 6 characters
- Expected: Validation error messages

#### 4. Duplicate Email
- Register with an existing email
- Expected: "User already exists" error message

#### 5. Optional Fields
- Add interests by typing comma-separated values (e.g., "Music, Sports, Technology")
- Remove individual interests by clicking × button on tags
- Fill in city and bio
- Expected: All data saved correctly as an array in the database

## Console Output Example

```
🚀 Form submission started
📝 Form data: {email: "test@example.com", password: "******", fullName: "John Doe", interests: ["Music", "Sports"], ...}
✅ Validating form data with Zod schema...
✅ Validation successful: {email: "test@example.com", interests: ["Music", "Sports"], ...}
📎 Adding file to FormData: profile.jpg image/jpeg 45678
📦 User data to be sent: {email: "test@example.com", fullName: "John Doe", interests: ["Music", "Sports"], ...}
🏷️ Interests array: ["Music", "Sports"] Length: 2
🌐 Making API call to: http://localhost:5000/v1/api/users/register
📡 Response status: 200 OK
📥 Response data: {statusCode: 200, success: true, message: "User created successfully!", data: {..., interests: ["Music", "Sports"]}}
✅ Registration successful!
🏁 Form submission completed
```

## Error Handling

The implementation handles:
1. **Validation Errors**: Zod schema validation before API call
2. **Network Errors**: Fetch failures, timeout issues
3. **API Errors**: Backend validation, duplicate users, server errors
4. **File Upload Errors**: Invalid file types, size limits

## Security Considerations

1. Password is sent over HTTPS (ensure backend uses HTTPS in production)
2. No sensitive data stored in localStorage
3. File validation on both client and server
4. CORS properly configured on backend
5. JWT tokens handled securely (for future login implementation)

## Future Enhancements

1. Add password strength indicator
2. Add email verification flow
3. Add social login options (Google, Facebook)
4. Add image cropping before upload
5. Add progress indicator for file uploads
6. Add rate limiting on frontend
7. Add reCAPTCHA for bot prevention

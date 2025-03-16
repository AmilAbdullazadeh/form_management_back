# Form Management System

RESTful API for form management built with Node.js, Express, and MongoDB. This backend service follows clean architecture principles with a layered design for better maintainability and testability.

## Features

- Create, read, update, and delete forms
- Set form visibility (visible/hidden)
- Add multiple fields to forms with different types (text, number, email, date, checkbox, select)
- Set field properties (required, read-only)
- Data validation and error handling
- Secure API with rate limiting, CORS, and Helmet protection
- Compression for improved performance
- Logging with Morgan

## Architecture

The application follows a clean, layered architecture:

### Layers
- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic and validation
- **Repositories**: Manage data access and database operations
- **Models**: Define data structure and schema

### Project Structure
```
src/
├── controllers/     # Request handlers
├── models/          # Database schemas
├── repositories/    # Data access layer
├── routes/          # API route definitions
├── services/        # Business logic layer
├── app.js           # Express application setup
└── server.js        # Server entry point
```

## Data Model

### Form Schema
- `name`: String (required, unique)
- `isVisible`: Boolean
- `isReadOnly`: Boolean
- `fields`: Array of field objects
  - `name`: String
  - `type`: String (text, number, email, date, checkbox, select)
  - `isRequired`: Boolean

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/form-management
   ```
4. Make sure MongoDB is running on localhost:27017

## Running the Application

Start the development server:
```
npm run dev
```

Or start in production mode:
```
npm start
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Forms
- `GET /api/forms` - Get all forms
- `GET /api/forms/:id` - Get a specific form
- `POST /api/forms` - Create a new form
- `PUT /api/forms/:id` - Update a form
- `DELETE /api/forms/:id` - Delete a form

## API Request Examples

### Create a Form
```json
POST /api/forms
{
  "name": "ContactForm",
  "isVisible": true,
  "isReadOnly": false,
  "fields": [
    {
      "name": "fullName",
      "type": "text",
      "isRequired": true
    },
    {
      "name": "email",
      "type": "email",
      "isRequired": true
    },
    {
      "name": "message",
      "type": "text",
      "isRequired": false
    }
  ]
}
```

## Security Features

The API implements several security measures:
- **Helmet**: Sets various HTTP headers for security
- **CORS**: Controls cross-origin resource sharing
- **Rate Limiting**: Prevents abuse by limiting request frequency
- **MongoDB Sanitization**: Prevents NoSQL injection attacks
- **Request Size Limiting**: Limits payload size to prevent DoS attacks

## Error Handling

The application includes a centralized error handling mechanism that:
- Returns appropriate HTTP status codes
- Provides meaningful error messages
- Handles validation errors
- Logs errors for debugging

## Development

### Code Style
The project follows a consistent code style with:
- ES6+ JavaScript features
- Class-based architecture
- Async/await for asynchronous operations

### Testing
Run tests with:
```
npm test
```
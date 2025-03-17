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

## Why MongoDB?

MongoDB was chosen as the database for this project for several key reasons:

### Document-Oriented Data Model
Forms have varying fields and structures, making MongoDB's document model ideal:
- Forms can have different numbers and types of fields
- The schema is flexible and can evolve over time
- Nested structure of forms (with fields as sub-documents) maps naturally to MongoDB's document structure

### Schema Flexibility
The Form schema includes an array of field objects with properties like name, type, and isRequired. This variable structure is handled elegantly in MongoDB, whereas in a relational database it would require complex joins or normalization.

### JSON-Native Storage
The API deals with JSON data for requests and responses. MongoDB stores data in BSON (Binary JSON), making the conversion between API payloads and database storage seamless.

### Scalability
MongoDB's horizontal scaling capabilities through sharding support growth as the application scales.

### Query Capabilities
MongoDB's query language is powerful for the types of queries needed in this application, such as finding forms by name or ID, which are common operations in the repository layer.

## Why Class-Based Architecture?

The API uses a Class-based architecture for several important reasons:

### Clean Separation of Concerns
The code is organized into distinct layers, each implemented as classes with specific responsibilities:
- Controllers: Handle HTTP requests/responses
- Services: Implement business logic
- Repositories: Manage data access
- Models: Define data structure

### Encapsulation
Classes allow encapsulation of related functionality:
- `FormRepository` encapsulates all database operations
- `FormService` encapsulates business rules and validation
- `FormController` encapsulates request handling

### Code Organization
The class structure provides a consistent pattern across the application, making the code more maintainable and easier to understand.

### Dependency Injection
The architecture uses a form of dependency injection where:
- Controllers depend on Services
- Services depend on Repositories

Example:
```javascript
class FormService {
  constructor() {
    this.formRepository = FormRepository;
  }
  // Methods that use this.formRepository
}
```

### Testability
The class-based approach makes the code highly testable, as seen in the comprehensive test suite. Each layer can be tested in isolation by mocking its dependencies.

### Method Binding
The class approach allows for proper method binding, which is important for maintaining the correct `this` context:
```javascript
module.exports = {
  getAllForms: formController.getAllForms.bind(formController),
  // Other methods
};
```

### Error Handling
The class structure facilitates centralized error handling, with services throwing specific errors that controllers can catch and transform into appropriate HTTP responses.

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

## Testing

The application includes comprehensive test coverage using Jest as the test runner. The tests follow a simple, focused approach to ensure the core functionality works correctly.

### Test Structure

```
tests/
├── controllers/     # Controller unit tests
├── models/          # Model validation tests
├── repositories/    # Repository unit tests
├── services/        # Service unit tests
├── integration/     # API endpoint integration tests
└── setup.js         # Test setup configuration
```

### Running Tests

Run all tests:
```
npm test
```

Run tests in watch mode:
```
npm run test:watch
```

Generate test coverage report:
```
npm run test:coverage
```

### Test Types

#### Unit Tests
- **Repository Tests**: Verify data access operations work correctly with the database
- **Service Tests**: Ensure business logic and validation rules are properly applied
- **Controller Tests**: Check HTTP request handling and response formatting
- **Model Tests**: Validate schema definitions, defaults, and constraints

#### Integration Tests
- **API Endpoint Tests**: Test the complete request-response cycle for all CRUD operations

### Test Implementation Details

- **Mocking**: Service tests use mocked repositories to isolate business logic
- **In-Memory Database**: Tests use MongoDB Memory Server to avoid affecting real databases
- **Test Data**: Simple, focused test data that covers essential use cases
- **Assertions**: Clear, minimal assertions that verify only what's necessary

### Current Test Coverage

The test suite achieves approximately 80% statement coverage across the codebase:
- Models: 100% coverage
- Repositories: 100% coverage
- Routes: 100% coverage
- Services: ~73% coverage
- Controllers: ~72% coverage

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
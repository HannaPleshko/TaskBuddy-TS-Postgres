# TaskBuddy-TS-Postgres

This is a backend server for a task manager application with authentication and registration functionality. The server is built with TypeScript, Node.js, Express, and PostgreSQL as the relational database. Passwords are hashed and securely stored in the database. The project also includes Jest for testing, Eslint and Prettier for code quality, and Swagger for API documentation. Nodemon is used for automatic server restarts during development.

## Getting Started

To get started with the project, clone the repository and run npm install to install all dependencies. Create a .env file in the root directory and add the required environment variables as specified in the .env.example file.

To start the server, run:

```
npm run start:dev
```

The server will start on http://localhost:3000.

## Testing

To run the test suite, run npm test. This will run all tests and generate a coverage report.

## API Documentation

API documentation is available through Swagger at http://localhost:3000/api-docs.

## Code Quality

The project uses Eslint and Prettier to maintain code quality. To lint and format the code, run npm run lint and npm run format respectively.

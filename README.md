
# CRUD Users HTTP Server

This is a simple Node.js HTTP server that provides a RESTful API for managing users.
Each user contains the following fields:
- \`id\` (UUID)
- \`username\` (string)
- \`age\` (number)
- \`hobbies\` (array of strings)

## Requirements
- Node.js v16+
- npm (or yarn)

## Installation

Clone the repository:
\`\`\`
git clone <your-repo-url>
cd <project-folder>
\`\`\`

Install dependencies:
\`\`\`
npm install
\`\`\`

## Running the application

Start the server:
\`\`\`
npm start
\`\`\`

The server will run by default on:
\`\`\`
http://localhost:3000
\`\`\`

## API Endpoints

### Get all users
**GET** \`/api/users\`

Response: array of users

### Get user by ID
**GET** \`/api/users/{id}\`

Response: single user object or 404

### Create user
**POST** \`/api/users\`

Body example:
\`\`\`json
{
  "username": "Alex",
  "age": 25,
  "hobbies": ["coding", "games"]
}
\`\`\`

Response: the created user

### Update user
**PUT** \`/api/users/{id}\`

Body example:
\`\`\`json
{
  "age": 26
}
\`\`\`

Response: the updated user

### Delete user
**DELETE** \`/api/users/{id}\`

Response: 204 No Content

## How to Test with Postman

### 1. Create User
- URL: \`POST http://localhost:3000/api/users\`
- Body → raw → JSON

### 2. List Users
- URL: \`GET http://localhost:3000/api/users\`

### 3. Get by ID
- URL: \`GET http://localhost:3000/api/users/{id}\`

### 4. Update User
- URL: \`PUT http://localhost:3000/api/users/{id}\`

### 5. Delete User
- URL: \`DELETE http://localhost:3000/api/users/{id}\`

## Error Handling

| Status | Reason |
|--------|------------------------------------------------|
| 400    | Invalid JSON or wrong field types              |
| 404    | User not found                                 |
| 405    | Method not allowed                             |
| 500    | Internal server error                          |

## Notes
- This server stores data in memory only (not persistent)
- Restarting the server clears all data
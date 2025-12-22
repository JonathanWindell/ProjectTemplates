# Flask API & Database Connector

This repository contains a suite of essential backend scripts for RESTful API development, database management, and secure user authentication. These modules cover the fundamental requirements for server-side data operations.

## Core Infrastructure

### 1. Server Setup (Flask)
A fundamental utility that initializes the web application and configures Cross-Origin Resource Sharing (CORS) to permit requests from external clients.

### 2. Database Interface (Psycopg2)
A connection handler that establishes a secure link to a PostgreSQL database, enabling the execution of SQL queries and transaction management.

## API Operations

### 3. Data Retrieval (GET)
A query component that fetches specific records from the database based on dynamic parameters provided in the request URL.

```json
// Success
[
    { "column1": "data1", "column2": "data2", "column3": "data3" }
]

// Error
{ "error": "Missing 'param' parameter" }

### 4. Data Insertion (POST)
A transactional tool designed to parse JSON payloads and insert new records into the database tables.

```json
{ "column1": "new_data1", "column2": "new_data2" }
```

### 5. Data Modification (PUT)
An update utility that locates existing records by ID and modifies their content based on the provided JSON input.

```json
{ "param": "value_to_find", "column1": "updated_data1", "column2": "updated_data2" }
```

### 6. Data Removal (DELETE)
A maintenance tool used to permanently remove specific records from the database using their unique identifier.

```json
{ "param": "value_to_find" }
```

## Security & Utilities

### 7. User Authentication
A security module that handles user registration and login processes, utilizing hash algorithms (Werkzeug) to store and verify passwords securely.

```json
{ "username": "user1", "password": "secure_password" }
```

### 8. File Upload
A storage utility that accepts file transfers via form-data and saves them to a designated directory on the server.

## Dependencies

* **Flask**: Web framework core.
* **Flask-CORS**: Cross-origin resource sharing.
* **Psycopg2**: PostgreSQL database adapter.
* **Werkzeug**: Password hashing and security.
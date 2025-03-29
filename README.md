Flask Setup with Database Connection
This section explains the dependencies required to run the Flask server with PostgreSQL and details the API endpoints you can use.

Dependencies
To use the Flask app and interact with a PostgreSQL database, you will need to install the following dependencies:

Required Dependencies:
Flask: The web framework to build the server.

flask-cors: Allows Cross-Origin Resource Sharing (CORS).

psycopg2: PostgreSQL adapter for Python.

werkzeug: For secure password handling.

Install all dependencies with the following command:

bash
Kopiera
Redigera
pip install flask flask-cors psycopg2 werkzeug
API Endpoints
1. GET Request to Retrieve Data
Endpoint: /get-data

Method: GET

Description: This endpoint retrieves data from the database based on the provided query parameter.

Request:
kotlin
Kopiera
Redigera
GET /get-data?param=value
Expected Response:
If param is provided and the data is retrieved successfully, the response will look like:

json
Kopiera
Redigera
[
    {
        "column1": "data1",
        "column2": "data2",
        "column3": "data3"
    }
]
If param is missing from the request, you will receive an error:

json
Kopiera
Redigera
{
    "error": "Missing 'param' parameter"
}
2. POST Request to Add Data
Endpoint: /add-data

Method: POST

Description: This endpoint allows adding data to the database.

Request:
Send a POST request with JSON data in the body:

json
Kopiera
Redigera
{
    "column1": "new_data1",
    "column2": "new_data2"
}
Expected Response:
json
Kopiera
Redigera
{
    "message": "Data added successfully"
}
If there's an issue with the request or the database, you may receive an error message:

json
Kopiera
Redigera
{
    "error": "Database connection failed"
}
3. PUT Request to Update Data
Endpoint: /update-data

Method: PUT

Description: This endpoint allows updating existing data in the database.

Request:
Send a PUT request with JSON data containing the values to update:

json
Kopiera
Redigera
{
    "param": "value_to_find",
    "column1": "updated_data1",
    "column2": "updated_data2"
}
Expected Response:
json
Kopiera
Redigera
{
    "message": "Data updated successfully"
}
If the specified data could not be found or updated:

json
Kopiera
Redigera
{
    "error": "Data update failed"
}
4. DELETE Request to Delete Data
Endpoint: /delete-data

Method: DELETE

Description: This endpoint deletes data from the database.

Request:
Send a DELETE request with JSON data specifying the record to delete:

json
Kopiera
Redigera
{
    "param": "value_to_find"
}
Expected Response:
json
Kopiera
Redigera
{
    "message": "Data deleted successfully"
}
If the deletion fails for any reason:

json
Kopiera
Redigera
{
    "error": "Data deletion failed"
}
5. User Authentication (Login/Signup)
Endpoint (Sign-Up): /signup

Endpoint (Login): /login

Method: POST

Description: These endpoints allow users to sign up and log in, with password hashing for secure authentication.

Sign-Up Request:
json
Kopiera
Redigera
{
    "username": "new_user",
    "password": "new_password"
}
Expected Response (Sign-Up):
json
Kopiera
Redigera
{
    "message": "User signed up successfully"
}
Login Request:
json
Kopiera
Redigera
{
    "username": "new_user",
    "password": "new_password"
}
Expected Response (Login):
If the credentials are correct:

json
Kopiera
Redigera
{
    "message": "Login successful"
}
If the credentials are invalid:

json
Kopiera
Redigera
{
    "message": "Invalid credentials"
}
Additional Notes
Make sure PostgreSQL is installed and running before using the application.

Modify the SQL queries in your Flask routes according to your database schema.

For security reasons, avoid hardcoding sensitive credentials (e.g., database passwords) in your code. Use environment variables or .env files.
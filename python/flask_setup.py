#Flask setup with database connection
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allows cross-origin requests

# Function to connect to database
def connect_to_db():
    """
    Skapar och returnerar en anslutning till PostgreSQL-databasen.
    Uppdatera värdena nedan med dina faktiska databasuppgifter.
    """
    return psycopg2.connect(
        host="localhost",  
        database="your_database",  
        user="your_user",  
        password="your_password"  
    )

# Example of get route
@app.route('/get-data', methods=['GET'])
def get_data():
    """
    Hämtar data från databasen baserat på en angiven parameter.
    Exempel: /get-data?param=value
    """
    param = request.args.get('param')
    if param is None:
        return jsonify({"error": "Missing 'param' parameter"}), 400
    
    conn = connect_to_db()
    cursor = conn.cursor()
    
    try:
        # SQL-question with parameters
        cursor.execute(
            """
            SELECT column1, column2, column3 
            FROM public.your_table 
            WHERE some_column = %s
            """,
            (param,)
        )
        data = cursor.fetchall()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()  # Closes the database connection
    
    # Formats database data to JSON
    result = [
        {
            "column1": row[0],
            "column2": row[1],
            "column3": row[2]
        }
        for row in data
    ]
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)  # Starts the Flask development server


# Example of post route to add data
@app.route('/add-data', methods=['POST'])
def add_data():
    """
    Lägger till ny data i databasen. Förväntar sig en JSON-kropp i begäran.
    Exempel: {"column1": "value1", "column2": "value2"}
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    column1_value = data.get('column1')
    column2_value = data.get('column2')
    
    if not column1_value or not column2_value:
        return jsonify({"error": "Missing required fields"}), 400

    conn = connect_to_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            """
            INSERT INTO public.your_table (column1, column2)
            VALUES (%s, %s)
            """,
            (column1_value, column2_value)
        )
        conn.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
    
    return jsonify({"message": "Data added successfully"}), 201


# Example of put route to update data
@app.route('/update-data/<int:id>', methods=['PUT'])
def update_data(id):
    """
    Uppdaterar en rad i databasen baserat på det angivna ID:t.
    Exempel: PUT /update-data/1 {"column1": "new_value", "column2": "new_value"}
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    column1_value = data.get('column1')
    column2_value = data.get('column2')

    if not column1_value or not column2_value:
        return jsonify({"error": "Missing required fields"}), 400
    
    conn = connect_to_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            """
            UPDATE public.your_table
            SET column1 = %s, column2 = %s
            WHERE id = %s
            """,
            (column1_value, column2_value, id)
        )
        conn.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
    
    return jsonify({"message": "Data updated successfully"}), 200


# Example of delete route
@app.route('/delete-data/<int:id>', methods=['DELETE'])
def delete_data(id):
    """
    Tar bort en rad från databasen baserat på det angivna ID:t.
    Exempel: DELETE /delete-data/1
    """
    conn = connect_to_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            """
            DELETE FROM public.your_table
            WHERE id = %s
            """,
            (id,)
        )
        conn.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
    
    return jsonify({"message": "Data deleted successfully"}), 200


# User signup
from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/signup', methods=['POST'])
def signup():
    """
    Skapar en ny användare med lösenordshashning.
    Exempel: {"username": "user1", "password": "securepassword"}
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

    hashed_password = generate_password_hash(password)
    
    conn = connect_to_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            """
            INSERT INTO public.users (username, password_hash)
            VALUES (%s, %s)
            """,
            (username, hashed_password)
        )
        conn.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

    return jsonify({"message": "User created successfully"}), 201


# Example of login. Use werkzeug and more for this case aswell
@app.route('/login', methods=['POST'])
def login():
    """
    Loggar in en användare genom att jämföra lösenord med lösenordshash.
    Exempel: {"username": "user1", "password": "securepassword"}
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400
    
    conn = connect_to_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            """
            SELECT password_hash FROM public.users WHERE username = %s
            """,
            (username,)
        )
        result = cursor.fetchone()

        if result and check_password_hash(result[0], password):
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()



# Example of file upload
from flask import request
import os

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    """
    Laddar upp en fil till servern.
    Förväntar sig en fil i formdata under nyckeln 'file'.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filename)
    
    return jsonify({"message": "File uploaded successfully"}), 200
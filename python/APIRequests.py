import requests
import psycopg2

class APIClient:
    """
    A generic API client to fetch data from an external API.
    """
    def __init__(self, base_url, api_key=None):
        self.base_url = base_url
        self.api_key = api_key

    def fetch_data(self, endpoint, params=None):
        """
        Fetch data from the specified API endpoint.
        """
        url = f"{self.base_url}{endpoint}"
        if self.api_key:
            params = params or {}
            params["apikey"] = self.api_key
        
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Failed to fetch data: {response.status_code}")
            return None

class DatabaseClient:
    """
    A generic database client to handle connections and queries.
    """
    def __init__(self, dbname, user, password, host):
        self.conn = psycopg2.connect(
            dbname=dbname, user=user, password=password, host=host
        )
        self.cursor = self.conn.cursor()

    def execute_query(self, query, params=None):
        """
        Execute an SQL query with optional parameters.
        """
        self.cursor.execute(query, params or ())
        self.conn.commit()

    def fetch_all(self, query, params=None):
        """
        Fetch all results from a query.
        """
        self.cursor.execute(query, params or ())
        return self.cursor.fetchall()

    def close(self):
        """
        Close the database connection.
        """
        self.conn.close()

class DataFetcher:
    """
    Fetch data from an API and store it in a database.
    """
    def __init__(self, api_client, db_client, table_name, data_key, columns):
        self.api_client = api_client
        self.db_client = db_client
        self.table_name = table_name
        self.data_key = data_key  # The key in API response containing relevant data
        self.columns = columns  # List of expected columns in the response

    def get_existing_entries(self, unique_column):
        """
        Retrieve existing unique entries from the database.
        """
        query = f"SELECT DISTINCT {unique_column} FROM {self.table_name}"
        return {row[0] for row in self.db_client.fetch_all(query)}

    def fetch_and_store_data(self, identifiers, endpoint, params_template, unique_column):
        """
        Fetch data from the API and store new entries in the database.
        """
        existing_entries = self.get_existing_entries(unique_column)
        identifiers_to_fetch = [id_ for id_ in identifiers if id_ not in existing_entries]

        for identifier in identifiers_to_fetch:
            params = params_template.copy()
            params[unique_column] = identifier
            data = self.api_client.fetch_data(endpoint, params)

            if data and self.data_key in data:
                records = data[self.data_key]
                for timestamp, values in records.items():
                    self.db_client.execute_query(
                        f"""
                        INSERT INTO {self.table_name} ({', '.join(self.columns)}, latest_date)
                        VALUES ({', '.join(['%s'] * (len(self.columns) + 1))})
                        """,
                        [identifier] + [values[col] for col in self.columns] + [timestamp]
                    )
            else:
                print(f"No data found for {identifier}")

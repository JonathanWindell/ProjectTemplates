# API & Database Sync Utility

A modular framework for fetching external API data and persisting it into PostgreSQL with incremental loading to ensure efficiency and data integrity.

## Core Classes

### 1. APIClient
Generic HTTP wrapper for API requests with authentication:

```python
api_client = APIClient("https://api.example.com", api_key="your-key")
data = api_client.fetch_data("/endpoint", params={"param": "value"})
```

### 2. DatabaseClient
PostgreSQL connection and query management:

```python
db_client = DatabaseClient("dbname", "user", "password", "localhost")
db_client.execute_query("INSERT INTO table VALUES (%s)", ("value",))
results = db_client.fetch_all("SELECT * FROM table")
db_client.close()
```

### 3. DataFetcher
Orchestrates API and database operations with duplicate prevention:

```python
fetcher = DataFetcher(
    api_client, db_client, 
    table_name="data_table",
    data_key="records",
    columns=["col1", "col2", "col3"]
)

# Fetch only new data, avoiding duplicates
fetcher.fetch_and_store_data(
    identifiers=["id1", "id2", "id3"],
    endpoint="/data",
    params_template={"format": "json"},
    unique_column="identifier"
)
```

## Usage Example

```python
# Initialize clients
api = APIClient("https://api.example.com", "your-api-key")
db = DatabaseClient("mydb", "user", "pass", "localhost")

# Set up data fetcher
fetcher = DataFetcher(
    api_client=api,
    db_client=db,
    table_name="stock_prices",
    data_key="prices",
    columns=["open", "high", "low", "close", "volume"]
)

# Fetch and store new data
fetcher.fetch_and_store_data(
    identifiers=["AAPL", "GOOGL", "MSFT"],
    endpoint="/historical",
    params_template={"interval": "1d"},
    unique_column="symbol"
)
```

## Key Features

- **Incremental loading**: Only fetches new data, avoiding duplicates
- **Error handling**: Graceful handling of API failures and database issues
- **Flexible configuration**: Works with any API and database schema
- **Transaction safety**: Proper commit/rollback handling

## Dependencies

* **requests**: HTTP communication
* **psycopg2**: PostgreSQL database adapter

## Best Practices

- Always close database connections after use
- Use appropriate error handling for production use
- Monitor API rate limits and implement retry logic
- Validate data before insertion

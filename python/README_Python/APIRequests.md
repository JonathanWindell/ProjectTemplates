# API & Database Sync Utility

This utility provides a modular framework for fetching external API data and persisting it into a PostgreSQL database. It is designed with an incremental loading strategy to ensure efficiency and data integrity.

## Core Classes

### 1. APIClient
A generic network wrapper that handles HTTP requests, endpoint management, and API key authentication for secure data retrieval.

### 2. DatabaseClient
A dedicated interface for PostgreSQL connections. It manages the lifecycle of database cursors, executes SQL queries, and ensures transactions are committed safely.

### 3. DataFetcher
The orchestration layer that connects the API and Database clients. It implements logic to cross-reference local data with remote sources, ensuring only unique, non-duplicate entries are fetched and stored.

## Dependencies

* **requests**: For handling HTTP communication.
* **psycopg2**: For PostgreSQL database adaptation.
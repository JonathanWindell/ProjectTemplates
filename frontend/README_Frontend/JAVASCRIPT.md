# JavaScript Helper Utilities

This repository contains a suite of essential scripts for API handling, storage safety, and performance optimization. These modules cover the fundamental requirements for maintaining a robust and responsive web application.

## Core Utilities

### 1. API Client (Fetch)
A fundamental utility for structured network communication. It handles base URL configuration, automated JSON parsing, and provides standardized error handling (4xx/5xx) to ensure that server interactions are predictable and resilient.

### 2. Safe Storage (localStorage)
A robust component for client-side data persistence that wraps the browser's `localStorage`. It manages automated serialization/deserialization of complex objects and includes error-trapping to prevent application failure during data corruption or restricted access scenarios.

## Performance & Optimization Components

### 3. Debounce
A timing optimization tool that delays the execution of a function until a specified period of inactivity has elapsed. This is critical for reducing resource consumption during high-frequency events such as search input filtering or window resizing.

### 4. Throttle
A rate-limiting utility designed to ensure a function is executed at most once per specified time interval. It is the preferred solution for managing performance-heavy events like scroll tracking or rapid-fire button interactions.

## Dependencies

* **Fetch API**: Network request handling.
* **ES6+ Modules**: Module-based script architecture. `import/export` syntax.
* **JSON**: Data serialization and exchange.

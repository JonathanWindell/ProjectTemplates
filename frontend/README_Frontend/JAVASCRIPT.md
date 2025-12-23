# JavaScript Helper Utilities

This repository contains a suite of essential scripts for API handling, storage safety, and performance optimization. These modules cover the fundamental requirements for maintaining a robust and responsive web application.

## Core Utilities

### 1. API Client (Fetch)

A fundamental utility for structured network communication. It handles base URL configuration, automated JSON parsing, and provides standardized error handling (4xx/5xx) to ensure that server interactions are predictable and resilient.

#### Usage Examples

```javascript
// Set your API base URL
api.setBaseUrl('https://api.example.com');

// GET request
const users = await api.get('/users');
console.log(users);

// POST request with data
const newUser = await api.post('/users', {
    name: 'John Doe',
    email: 'john@example.com'
});

// PUT request for updates
const updatedUser = await api.put('/users/123', {
    name: 'John Smith',
    email: 'john.smith@example.com'
});

// DELETE request
await api.delete('/users/123');

// Custom headers (e.g., for authentication)
const protectedData = await api.get('/protected', {
    'Authorization': 'Bearer your-token-here'
});
```

### 2. Safe Storage (localStorage)

A robust component for client-side data persistence that wraps the browser's `localStorage`. It manages automated serialization/deserialization of complex objects and includes error-trapping to prevent application failure during data corruption or restricted access scenarios.

#### Usage Examples

```javascript
// Save data to localStorage
storage.set('userPreferences', {
    theme: 'dark',
    language: 'en',
    notifications: true
});

// Retrieve data with fallback
const preferences = storage.get('userPreferences', {
    theme: 'light',
    language: 'en',
    notifications: false
});

// Remove data
storage.remove('userPreferences');

// Store simple values
storage.set('lastLogin', new Date().toISOString());
const lastLogin = storage.get('lastLogin', 'Never');

// Store arrays or complex objects
storage.set('shoppingCart', [
    { id: 1, name: 'Product A', price: 29.99 },
    { id: 2, name: 'Product B', price: 49.99 }
]);
const cart = storage.get('shoppingCart', []);
```

## Performance & Optimization Components

### 3. Debounce

A timing optimization tool that delays the execution of a function until a specified period of inactivity has elapsed. This is critical for reducing resource consumption during high-frequency events such as search input filtering or window resizing.

#### Usage Examples

```javascript
// Search input with debounce
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('results');

const debouncedSearch = performance.debounce(async (query) => {
    if (query.length < 2) return;
    
    try {
        const results = await api.get(`/search?q=${encodeURIComponent(query)}`);
        searchResults.innerHTML = results.map(item => 
            `<div>${item.title}</div>`
        ).join('');
    } catch (error) {
        console.error('Search failed:', error);
    }
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});

// Window resize handler
const debouncedResize = performance.debounce(() => {
    console.log('Window resized, recalculating layout...');
    // Recalculate layout, update charts, etc.
}, 250);

window.addEventListener('resize', debouncedResize);
```

### 4. Throttle

A rate-limiting utility designed to ensure a function is executed at most once per specified time interval. It is the preferred solution for managing performance-heavy events like scroll tracking or rapid-fire button interactions.

#### Usage Examples

```javascript
// Scroll event throttling
const handleScroll = performance.throttle(() => {
    const scrollPosition = window.scrollY;
    console.log(`Scroll position: ${scrollPosition}px`);
    
    // Update sticky headers, lazy load images, etc.
    updateStickyHeader(scrollPosition);
    checkLazyLoadImages();
}, 100);

window.addEventListener('scroll', handleScroll);

// Button click throttling (prevent double-submission)
const submitButton = document.getElementById('submit');
const originalSubmit = async () => {
    // Submit form logic
    const response = await api.post('/submit', formData);
    console.log('Form submitted successfully');
};

const throttledSubmit = performance.throttle(originalSubmit, 2000);

submitButton.addEventListener('click', throttledSubmit);

// Mouse move tracking
const trackMouse = performance.throttle((e) => {
    console.log(`Mouse at: ${e.clientX}, ${e.clientY}`);
    // Update cursor position, draw trails, etc.
}, 16); // ~60fps

document.addEventListener('mousemove', trackMouse);
```

## Dependencies

* **Fetch API**: Network request handling.
* **ES6+ Modules**: Module-based script architecture. `import/export` syntax.
* **JSON**: Data serialization and exchange.

## Import Examples

```javascript
// ES6 Modules (recommended)
import { api, storage, performance } from './js_helpers.js';

// Or import specific utilities
import { api } from './js_helpers.js';
import { storage } from './js_helpers.js';
import { performance } from './js_helpers.js';

// CommonJS (if needed)
const { api, storage, performance } = require('./js_helpers.js');
```

## Best Practices

1. **API Client**: Always handle errors gracefully and provide user feedback
2. **Storage**: Use appropriate fallback values and avoid storing sensitive data
3. **Debounce**: Use for search inputs, resize events, and any operation that should wait for user inactivity
4. **Throttle**: Use for scroll events, rapid interactions, and operations that need rate limiting
5. **Performance**: Choose the right tool - debounce for waiting, throttle for limiting frequency

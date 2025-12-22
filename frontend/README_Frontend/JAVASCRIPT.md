# JavaScript Helper Utilities

A collection of reusable JavaScript helper classes and functions for both browser development and Node.js applications. These utilities are designed to simplify common tasks and provide a consistent API for your projects.

Contents
Installation

Overview

Usage

DOMUtils

FormUtils

StorageUtils

APIClient

DataUtils

Logger

NodeUtils

Contributing

License

Installation
Include the library in your project by downloading the js-helper-utilities.js file:

bash
Kopiera
Redigera
# With npm
npm install --save path/to/js-helper-utilities

# With yarn
yarn add path/to/js-helper-utilities
Or include it directly in HTML:

html
<script src="path/to/js-helper-utilities.js"></script>
Overview
This library contains the following modules:

DOMUtils: DOM manipulation functions for the browser

FormUtils: Form handling and validation

StorageUtils: Simplified access to localStorage

APIClient: Consistent API request handling for both the browser and Node.js

DataUtils: General data manipulation functions

Logger: Structured logging with different levels

NodeUtils: Node.js-specific helper functions

Usage
DOMUtils
DOM manipulation functions for the browser's frontend.

javascript
// Select an element
const header = DOMUtils.select('#header');
const buttons = DOMUtils.selectAll('.button');

// Create elements with attributes and children
const div = DOMUtils.create('div', 
  { 
    id: 'container', 
    classList: ['box', 'large'], 
    style: { backgroundColor: 'blue' } 
  },
  [
    DOMUtils.create('h2', {}, 'Heading'),
    DOMUtils.create('p', {}, 'Text content')
  ]
);

// Add an event listener with simple removal
const removeEvent = DOMUtils.on(button, 'click', () => {
  console.log('Button clicked!');
});

// Later remove the event listener
removeEvent();
FormUtils
Handle form data and validation.

javascript
// Get form data as an object
const form = document.querySelector('#registrationForm');
const formData = FormUtils.getValues(form);

// Validate data
const validationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value, allValues) => {
      if (!/[A-Z]/.test(value)) {
        return 'Password must contain at least one uppercase letter';
      }
      return null;
    }
  }
};

const validation = FormUtils.validate(formData, validationRules);

if (validation.isValid) {
  // Continue with form submission
} else {
  // Display validation errors
  console.log(validation.errors);
}
StorageUtils
Simplify interaction with the browser's localStorage.

javascript
// Save data
StorageUtils.save('user', { id: 123, name: 'Test Testsson' });

// Get data
const user = StorageUtils.get('user');
console.log(user.name); // 'Test Testsson'

// Get with default value if the key doesn't exist
const settings = StorageUtils.get('settings', { theme: 'light' });

// Remove data
StorageUtils.remove('tempData');

// Clear all stored data
StorageUtils.clear();
APIClient
A consistent HTTP client for both the browser and Node.js.

javascript
// Set base URL
APIClient.setBaseUrl('https://api.example.com/v1');

// Set authentication token
APIClient.setAuthToken('jwt-token-here');

// GET request with parameters
const users = await APIClient.get('/users', { page: 1, limit: 10 });

// POST request with data
const newUser = await APIClient.post('/users', {
  name: 'Test Testsson',
  email: 'test@example.com'
});

// PUT request
const updatedUser = await APIClient.put('/users/123', {
  name: 'Updated Testsson'
});

// DELETE request
await APIClient.delete('/users/123');
DataUtils
General utilities for data manipulation.

javascript
// Deep clone an object
const original = { user: { name: 'Test', details: { age: 30 } } };
const clone = DataUtils.deepClone(original);

// Safe access to nested properties
const userName = DataUtils.get(user, 'details.profile.name', 'Anonymous');

// Debounce function
const debouncedSearch = DataUtils.debounce((searchTerm) => {
  // Perform search
  console.log('Searching for:', searchTerm);
}, 500);

// Call when the user types
inputElement.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Throttle function
const throttledScroll = DataUtils.throttle(() => {
  // Handle scroll event
  console.log('Scrolling');
}, 200);

// Call on scroll
window.addEventListener('scroll', throttledScroll);
Logger
Structured logging with different levels.

javascript
// Set log level (DEBUG, INFO, WARN, ERROR)
Logger.setLevel('DEBUG');
// or
Logger.setLevel(Logger.levels.DEBUG);

// Log messages
Logger.debug('Initializing application');
Logger.info('User logged in', { userId: 123 });
Logger.warn('API response time above threshold', { responseTime: 1500 });
Logger.error('Failed to fetch data', { error: 'Timeout' });
NodeUtils
Node.js-specific helper functions.

javascript
// Load environment variables from .env (requires dotenv package)
NodeUtils.loadEnv();

// Read a file
try {
  const content = await NodeUtils.readFile('config.json');
  const config = JSON.parse(content);
  console.log(config);
} catch (error) {
  console.error('Could not read the file:', error);
}

// Write to a file
try {
  const data = JSON.stringify({ setting: 'value' }, null, 2);
  await NodeUtils.writeFile('config.json', data);
  console.log('File saved');
} catch (error) {
  console.error('Could not write to the file:', error);
}

This README provides an overview of the JavaScript helper utilities, including usage examples for each module and instructions on how to integrate them into your project.
/**
 * Web Development and Node.js Helper Utilities
 * A collection of reusable helper functions for both frontend and backend development
 */

// ==========================================
// DOM Utilities (Frontend)
// ==========================================
const DOMUtils = {
    /**
     * Select a DOM element
     * @param {string} selector - CSS selector 
     * @param {Element} context - Context element (optional, defaults to document)
     * @returns {Element} Selected element or null
     */
    select: (selector, context = document) => context.querySelector(selector),
    
    /**
     * Select multiple DOM elements
     * @param {string} selector - CSS selector
     * @param {Element} context - Context element (optional, defaults to document)
     * @returns {Element[]} Array of elements
     */
    selectAll: (selector, context = document) => [...context.querySelectorAll(selector)],
    
    /**
     * Create a DOM element with attributes and children
     * @param {string} tag - HTML tag name
     * @param {object} attrs - Attributes to set (optional)
     * @param {Array|string} children - Child nodes or text content (optional)
     * @returns {Element} Created element
     */
    create: (tag, attrs = {}, children = []) => {
      const element = document.createElement(tag);
      
      // Set attributes
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'classList' && Array.isArray(value)) {
          element.classList.add(...value);
        } else if (key === 'style' && typeof value === 'object') {
          Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
          element.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
          element.setAttribute(key, value);
        }
      });
      
      // Add children
      if (typeof children === 'string') {
        element.textContent = children;
      } else if (Array.isArray(children)) {
        children.forEach(child => {
          if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
          } else if (child instanceof Node) {
            element.appendChild(child);
          }
        });
      }
      
      return element;
    },
    
    /**
     * Add event listener with easy removal
     * @param {Element} element - DOM element
     * @param {string} event - Event name
     * @param {Function} callback - Event handler
     * @returns {Function} Function to remove the event listener
     */
    on: (element, event, callback) => {
      element.addEventListener(event, callback);
      return () => element.removeEventListener(event, callback);
    }
  };
  
  // ==========================================
  // Form Utilities (Frontend)
  // ==========================================
  const FormUtils = {
    /**
     * Get form values as an object
     * @param {Element|string} form - Form element or selector
     * @returns {object} Form values as key-value pairs
     */
    getValues: (form) => {
      const formElement = typeof form === 'string' ? DOMUtils.select(form) : form;
      if (!formElement || !(formElement instanceof HTMLFormElement)) {
        throw new Error('Invalid form element');
      }
      
      const formData = new FormData(formElement);
      const values = {};
      
      formData.forEach((value, key) => {
        if (Object.hasOwnProperty.call(values, key)) {
          if (!Array.isArray(values[key])) {
            values[key] = [values[key]];
          }
          values[key].push(value);
        } else {
          values[key] = value;
        }
      });
      
      return values;
    },
    
    /**
     * Validate form data
     * @param {object} data - Form data to validate
     * @param {object} rules - Validation rules
     * @returns {object} Validation result with errors
     */
    validate: (data, rules) => {
      const errors = {};
      
      Object.entries(rules).forEach(([field, fieldRules]) => {
        if (!data[field]) {
          if (fieldRules.required) {
            errors[field] = 'This field is required';
          }
          return;
        }
        
        if (fieldRules.minLength && data[field].length < fieldRules.minLength) {
          errors[field] = `Minimum length is ${fieldRules.minLength} characters`;
        }
        
        if (fieldRules.maxLength && data[field].length > fieldRules.maxLength) {
          errors[field] = `Maximum length is ${fieldRules.maxLength} characters`;
        }
        
        if (fieldRules.pattern && !fieldRules.pattern.test(data[field])) {
          errors[field] = fieldRules.message || 'Invalid format';
        }
        
        if (typeof fieldRules.custom === 'function') {
          const customError = fieldRules.custom(data[field], data);
          if (customError) {
            errors[field] = customError;
          }
        }
      });
      
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    }
  };
  
  // ==========================================
  // Storage Utilities (Frontend)
  // ==========================================
  const StorageUtils = {
    /**
     * Save data to local storage
     * @param {string} key - Storage key
     * @param {*} value - Value to store (will be JSON stringified)
     */
    save: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    },
    
    /**
     * Get data from local storage
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if key doesn't exist
     * @returns {*} Retrieved value (JSON parsed) or default value
     */
    get: (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error('Error retrieving from localStorage:', error);
        return defaultValue;
      }
    },
    
    /**
     * Remove item from local storage
     * @param {string} key - Storage key
     */
    remove: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    },
    
    /**
     * Clear all local storage for this domain
     */
    clear: () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  };
  
  // ==========================================
  // API Client (Works in both Browser and Node.js)
  // ==========================================
  const APIClient = {
    /**
     * Default options for fetch requests
     */
    defaultOptions: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 seconds
    },
    
    /**
     * Base URL for API requests
     */
    baseUrl: '',
    
    /**
     * Set the base URL for API requests
     * @param {string} url - Base URL
     */
    setBaseUrl: (url) => {
      APIClient.baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    },
    
    /**
     * Add auth token to headers
     * @param {string} token - Auth token
     */
    setAuthToken: (token) => {
      APIClient.defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    },
    
    /**
     * Make a fetch request with timeout
     * @param {string} url - Request URL
     * @param {object} options - Fetch options
     * @returns {Promise} Fetch promise with timeout
     */
    fetchWithTimeout: (url, options = {}) => {
      const { timeout = APIClient.defaultOptions.timeout } = options;
      
      return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), timeout)
        )
      ]);
    },
    
    /**
     * Make a GET request
     * @param {string} endpoint - API endpoint
     * @param {object} params - Query parameters
     * @param {object} options - Additional fetch options
     * @returns {Promise} Promise resolving to parsed response
     */
    get: async (endpoint, params = {}, options = {}) => {
      const url = new URL(`${APIClient.baseUrl}${endpoint}`);
      Object.keys(params).forEach(key => 
        url.searchParams.append(key, params[key])
      );
      
      const response = await APIClient.fetchWithTimeout(
        url.toString(),
        {
          ...APIClient.defaultOptions,
          ...options,
          method: 'GET'
        }
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
    
    /**
     * Make a POST request
     * @param {string} endpoint - API endpoint
     * @param {object} data - Request body data
     * @param {object} options - Additional fetch options
     * @returns {Promise} Promise resolving to parsed response
     */
    post: async (endpoint, data = {}, options = {}) => {
      const response = await APIClient.fetchWithTimeout(
        `${APIClient.baseUrl}${endpoint}`,
        {
          ...APIClient.defaultOptions,
          ...options,
          method: 'POST',
          body: JSON.stringify(data)
        }
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
    
    /**
     * Make a PUT request
     * @param {string} endpoint - API endpoint
     * @param {object} data - Request body data
     * @param {object} options - Additional fetch options
     * @returns {Promise} Promise resolving to parsed response
     */
    put: async (endpoint, data = {}, options = {}) => {
      const response = await APIClient.fetchWithTimeout(
        `${APIClient.baseUrl}${endpoint}`,
        {
          ...APIClient.defaultOptions,
          ...options,
          method: 'PUT',
          body: JSON.stringify(data)
        }
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
    
    /**
     * Make a DELETE request
     * @param {string} endpoint - API endpoint
     * @param {object} options - Additional fetch options
     * @returns {Promise} Promise resolving to parsed response
     */
    delete: async (endpoint, options = {}) => {
      const response = await APIClient.fetchWithTimeout(
        `${APIClient.baseUrl}${endpoint}`,
        {
          ...APIClient.defaultOptions,
          ...options,
          method: 'DELETE'
        }
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    }
  };
  
  // ==========================================
  // Data Utilities (Both Frontend and Node.js)
  // ==========================================
  const DataUtils = {
    /**
     * Deep clone an object
     * @param {*} obj - Object to clone
     * @returns {*} Cloned object
     */
    deepClone: (obj) => {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }
      
      if (obj instanceof Date) {
        return new Date(obj.getTime());
      }
      
      if (obj instanceof Array) {
        return obj.map(item => DataUtils.deepClone(item));
      }
      
      if (obj instanceof Object) {
        const copy = {};
        Object.keys(obj).forEach(key => {
          copy[key] = DataUtils.deepClone(obj[key]);
        });
        return copy;
      }
      
      return obj;
    },
    
    /**
     * Safely get a nested property from an object
     * @param {object} obj - Source object
     * @param {string} path - Dot-notation path to property
     * @param {*} defaultValue - Default value if property doesn't exist
     * @returns {*} Property value or default value
     */
    get: (obj, path, defaultValue = undefined) => {
      const keys = path.split('.');
      let result = obj;
      
      for (const key of keys) {
        if (result === null || result === undefined || typeof result !== 'object') {
          return defaultValue;
        }
        result = result[key];
      }
      
      return result === undefined ? defaultValue : result;
    },
    
    /**
     * Debounce a function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Debounce wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce: (func, wait = 300) => {
      let timeout;
      
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    
    /**
     * Throttle a function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Throttle limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle: (func, limit = 300) => {
      let inThrottle;
      
      return function executedFunction(...args) {
        if (!inThrottle) {
          func(...args);
          inThrottle = true;
          setTimeout(() => {
            inThrottle = false;
          }, limit);
        }
      };
    }
  };
  
  // ==========================================
  // Logger (Both Frontend and Node.js)
  // ==========================================
  const Logger = {
    levels: {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3
    },
    
    level: 1, // Default to INFO
    
    /**
     * Set the logging level
     * @param {number|string} level - Logging level
     */
    setLevel: (level) => {
      if (typeof level === 'string') {
        Logger.level = Logger.levels[level.toUpperCase()] || Logger.levels.INFO;
      } else {
        Logger.level = level;
      }
    },
    
    /**
     * Format log message
     * @param {string} level - Log level
     * @param {string} message - Log message
     * @param {*} data - Additional data
     * @returns {string} Formatted log message
     */
    formatMessage: (level, message, data) => {
      const timestamp = new Date().toISOString();
      return `[${timestamp}] [${level}] ${message}${data ? ': ' + JSON.stringify(data) : ''}`;
    },
    
    /**
     * Log debug message
     * @param {string} message - Log message
     * @param {*} data - Additional data
     */
    debug: (message, data) => {
      if (Logger.level <= Logger.levels.DEBUG) {
        console.log(Logger.formatMessage('DEBUG', message, data));
      }
    },
    
    /**
     * Log info message
     * @param {string} message - Log message
     * @param {*} data - Additional data
     */
    info: (message, data) => {
      if (Logger.level <= Logger.levels.INFO) {
        console.info(Logger.formatMessage('INFO', message, data));
      }
    },
    
    /**
     * Log warning message
     * @param {string} message - Log message
     * @param {*} data - Additional data
     */
    warn: (message, data) => {
      if (Logger.level <= Logger.levels.WARN) {
        console.warn(Logger.formatMessage('WARN', message, data));
      }
    },
    
    /**
     * Log error message
     * @param {string} message - Log message
     * @param {*} data - Additional data
     */
    error: (message, data) => {
      if (Logger.level <= Logger.levels.ERROR) {
        console.error(Logger.formatMessage('ERROR', message, data));
      }
    }
  };
  
  // ==========================================
  // Node.js Specific Utilities (will only work in Node.js environment)
  // ==========================================
  const NodeUtils = {
    /**
     * Load environment variables from .env file
     * Note: Requires 'dotenv' package
     */
    loadEnv: () => {
      try {
        // Check if we're in Node.js environment
        if (typeof process !== 'undefined' && process.versions && process.versions.node) {
          const dotenv = require('dotenv');
          dotenv.config();
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error loading environment variables:', error);
        return false;
      }
    },
    
    /**
     * Read a file asynchronously
     * @param {string} path - File path
     * @param {string} encoding - File encoding (default: 'utf8')
     * @returns {Promise<string>} File contents
     */
    readFile: async (path, encoding = 'utf8') => {
      // Check if we're in Node.js environment
      if (typeof process !== 'undefined' && process.versions && process.versions.node) {
        const fs = require('fs').promises;
        return await fs.readFile(path, encoding);
      }
      throw new Error('This function can only be used in Node.js environment');
    },
    
    /**
     * Write a file asynchronously
     * @param {string} path - File path
     * @param {string|Buffer} data - Data to write
     * @param {string} encoding - File encoding (default: 'utf8')
     * @returns {Promise<void>}
     */
    writeFile: async (path, data, encoding = 'utf8') => {
      // Check if we're in Node.js environment
      if (typeof process !== 'undefined' && process.versions && process.versions.node) {
        const fs = require('fs').promises;
        return await fs.writeFile(path, data, encoding);
      }
      throw new Error('This function can only be used in Node.js environment');
    }
  };
  
  // Export the modules
  // This works in both CommonJS (Node.js) and ES modules (browser) environments
  try {
    // Check if we're in Node.js environment with CommonJS modules
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = {
        DOMUtils,
        FormUtils,
        StorageUtils,
        APIClient,
        DataUtils,
        Logger,
        NodeUtils
      };
    }
  } catch (e) {
    // In browser, these will be available as global variables
    console.log('Running in browser environment');
  }
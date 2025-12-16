/**
 * Core Utilities
 * Focused on API handling, Storage safety, and Performance.
 * Environment: Browser / Universal
 */

// ==========================================
// 1. API Client (Simplified)
// ==========================================
export const api = {
    baseUrl: '',
    
    setBaseUrl(url) {
        this.baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    },

    /**
     * Generic fetch wrapper that handles JSON parsing and errors
     */
    async request(endpoint, method = 'GET', body = null, customHeaders = {}) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...customHeaders
        };

        const config = {
            method,
            headers,
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, config);
            
            // Handle HTTP errors (4xx, 5xx)
            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
            }

            // Return empty object for 204 No Content, otherwise parse JSON
            if (response.status === 204) return {};
            return await response.json();
        } catch (error) {
            console.error(`API Request Failed (${endpoint}):`, error);
            throw error;
        }
    },

    get(endpoint, headers) { return this.request(endpoint, 'GET', null, headers); },
    post(endpoint, body, headers) { return this.request(endpoint, 'POST', body, headers); },
    put(endpoint, body, headers) { return this.request(endpoint, 'PUT', body, headers); },
    delete(endpoint, headers) { return this.request(endpoint, 'DELETE', null, headers); }
};

// ==========================================
// 2. Storage (Safe Wrappers)
// ==========================================
export const storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn(`Error reading ${key} from localStorage`, e);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error saving ${key} to localStorage`, e);
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    }
};

// ==========================================
// 3. Performance (Debounce/Throttle)
// ==========================================
export const performance = {
    /**
     * delays invoking a function until after 'wait' milliseconds 
     * have elapsed since the last time the debounced function was invoked.
     * Useful for: Search inputs, window resizing.
     */
    debounce(func, wait = 300) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    /**
     * ensures a function is called at most once every 'limit' milliseconds.
     * Useful for: Scroll events, button spamming.
     */
    throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};
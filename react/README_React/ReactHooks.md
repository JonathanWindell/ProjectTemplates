# React Custom Hooks

This library contains a set of custom hooks designed to abstract complex logic, manage side effects, and enhance code reusability across the application.

## Hooks

### 1. useAuth
A hook responsible for managing user authentication state. It typically exposes methods for logging in, logging out, and accessing the current user's profile and permission levels.

### 2. useDebounce
A utility hook that delays the update of a value until a specified time has passed without further changes. This is critical for performance optimization, particularly in search bars or window resizing events.

### 3. useFetch
An abstraction wrapper for making HTTP requests. It handles the loading status, error states, and data caching, streamlining asynchronous data retrieval.

### 4. useFormState
A state management hook tailored for form handling. It manages input values, handles validation logic, and tracks form submission status.

### 5. useLocalStorage
A persistence hook that synchronizes a state variable with the browser's LocalStorage API, ensuring data remains available across browser sessions.

### 6. useTheme
A context-aware hook for managing the application's visual theme (e.g., toggling between Dark and Light modes) and accessing theme variables.

### 7. useToggle
A simplified state hook designed specifically for boolean values (true/false). It provides an easy way to switch states for modals, menus, or visibility toggles.
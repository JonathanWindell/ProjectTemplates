React Hooks Templates
This collection contains reusable React hooks for common use cases in web applications. The hooks are organized by type, such as useState, useEffect, useReducer, and various utility hooks. They are designed to simplify and improve application development by providing easy-to-use, reusable solutions to common problems.

Installation
To use these hooks, you can either copy and paste the file into your own application or import it as a module. If you want to use it as a module, simply export the relevant functions in your codebase:

bash
npm install react
Example import:
javascript
Kopiera
Redigera
import { useFormState, useToggle, useFetch } from './hooks';
Hooks
useFormState
A hook for managing form data.

Usage:

javascript
const [values, handleChange, resetForm, setValues] = useFormState({ name: '', email: '' });
values: Current form values.

handleChange: Function to update form values.

resetForm: Function to reset form values to their initial state.

useToggle
A hook for managing toggle states (e.g., show/hide modals).

Usage:

javascript
const [isOpen, toggle] = useToggle(false);
isOpen: Current toggle state.

toggle: Function to toggle the state.

useLoading
A hook for managing loading states.

Usage:

javascript
const [isLoading, startLoading, stopLoading] = useLoading(false);
isLoading: Current loading state.

startLoading: Function to set loading state to true.

stopLoading: Function to set loading state to false.

useFetch
A hook for fetching data from an API.

Usage:

javascript
const { data, error, loading, refetch } = useFetch('https://api.example.com/data');
data: Fetched data.

error: Error message if the request fails.

loading: Boolean indicating if the data is still loading.

refetch: Function to refetch the data.

useEventListener
A hook for handling event listeners with automatic cleanup.

Usage:

javascript
useEventListener('resize', handleResize);
eventType: Type of event (e.g., 'resize', 'keydown').

handler: Callback function for the event.

element: Element to attach the listener to (default is window).

useLocalStorage
A hook for synchronizing with localStorage.

Usage:

javascript
const [storedValue, setStoredValue] = useLocalStorage('myKey', 'defaultValue');
storedValue: The current value from localStorage.

setStoredValue: Function to set the value in localStorage.

useEffectOnce
A hook for running a callback only once, even in React Strict Mode.

Usage:

javascript
useEffectOnce(() => {
  console.log('This runs only once');
});
useList
A hook for managing a list of items with CRUD operations.

Usage:

javascript
const { items, addItem, updateItem, removeItem, clearItems } = useList([]);
items: The current list of items.

addItem: Function to add an item.

updateItem: Function to update an item by ID.

removeItem: Function to remove an item by ID.

clearItems: Function to clear the entire list.

useMultiStepForm
A hook for managing multi-step forms.

Usage:

javascript
const { data, currentStep, next, prev, goTo, updateData, reset } = useMultiStepForm({}, { step1: {}, step2: {} });
data: Current form data.

currentStep: Current step in the form.

next: Function to go to the next step.

prev: Function to go to the previous step.

goTo: Function to go to a specific step.

updateData: Function to update form data.

reset: Function to reset the form.

useDebounce
A hook for debouncing input or other fast-changing values.

Usage:

javascript
const debouncedValue = useDebounce(value, 300);
value: The value to debounce.

delay: The debounce delay in milliseconds (default is 300).

useInView
A hook for checking if an element is in the viewport.

Usage:

javascript
const [ref, isVisible] = useInView();
ref: A ref that should be attached to the element you want to track.

isVisible: Boolean indicating if the element is currently in the viewport.

useMediaQuery
A hook for handling media queries (responsiveness).

Usage:

javascript
const isMobile = useMediaQuery('(max-width: 768px)');
query: The media query string (e.g., (max-width: 768px)).

Returns true if the media query matches, otherwise false.

useFormValidation
A hook for handling form validation.

Usage:

javascript
const { values, errors, handleChange, handleBlur, handleSubmit, resetForm } = useFormValidation({}, validateFunction);
values: Form values.

errors: Validation errors.

handleChange: Function to update form values.

handleBlur: Function to handle blur events for form fields.

handleSubmit: Function to submit the form and trigger validation.

resetForm: Function to reset the form to its initial state.

useAsync
A hook for handling async operations.

Usage:

javascript
const { execute, status, value, error } = useAsync(myAsyncFunction);
execute: Function to run the async operation.

status: The status of the async operation ('idle', 'pending', 'success', 'error').

value: The result of the async operation.

error: Any error that occurred during the async operation.

useTimers
A hook for managing timeouts and intervals.

Usage:

javascript
const { setTimeout, clearTimeout, setInterval, clearInterval } = useTimers();
setTimeout: Function to set a timeout.

clearTimeout: Function to clear a timeout.

setInterval: Function to set an interval.

clearInterval: Function to clear an interval.

clearAll: Function to clear all timeouts and intervals.

License
This project is licensed under the MIT License - see the LICENSE file for details.

This README provides an overview of the hooks and their usage, making it easier to integrate them into your React projects. Let me know if you need any additional information or modifications!
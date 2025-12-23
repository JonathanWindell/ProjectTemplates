# React Custom Hooks

A set of custom hooks designed to abstract complex logic, manage side effects, and enhance code reusability across React applications.

## Data Management Hooks

### 1. useFetch
HTTP request abstraction with loading and error states:

```jsx
import { useFetch } from './hooks';

function MyComponent() {
  const { data, error, loading, refetch } = useFetch('/api/data');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

### 2. useLocalStorage
Synchronize state with browser storage:

```jsx
import { useLocalStorage } from './hooks';

function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

### 3. useFormState
Form data management with validation:

```jsx
import { useFormState } from './hooks';

function ContactForm() {
  const [values, handleChange, resetForm] = useFormState({
    name: '', email: '', message: ''
  });
  
  return (
    <form>
      <input name="name" value={values.name} onChange={handleChange} />
      <input name="email" value={values.email} onChange={handleChange} />
      <textarea name="message" value={values.message} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## State Management Hooks

### 4. useToggle
Simple boolean state management:

```jsx
import { useToggle } from './hooks';

function ModalExample() {
  const [isOpen, toggleOpen] = useToggle(false);
  
  return (
    <>
      <button onClick={toggleOpen}>Toggle Modal</button>
      {isOpen && <div>Modal content</div>}
    </>
  );
}
```

### 5. useAuth
Authentication state management:

```jsx
import { withAuthentication } from './hooks';

function ProtectedPage() {
  return <div>This page requires authentication</div>;
}

export default withAuthentication(ProtectedPage);
```

## Performance Hooks

### 6. useDebounce
Delay value updates for performance:

```jsx
import { useDebounce } from './hooks';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

## Usage Example

```jsx
import { useFetch, useFormState, useLocalStorage } from './hooks';

function Dashboard() {
  // Fetch data
  const { data, loading } = useFetch('/api/dashboard');
  
  // Form management
  const [formValues, handleFormChange] = useFormState({
    title: '', description: ''
  });
  
  // Persistent settings
  const [settings, setSettings] = useLocalStorage('userSettings', {
    theme: 'light', notifications: true
  });
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Dashboard</h1>
      <form>
        <input name="title" onChange={handleFormChange} />
        <textarea name="description" onChange={handleFormChange} />
      </form>
      <button onClick={() => setSettings({
        ...settings, theme: settings.theme === 'light' ? 'dark' : 'light'
      })}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## Key Features

- **Type-safe**: Full TypeScript support with proper type definitions
- **Performance optimized**: Built with memoization and efficient re-renders
- **Error handling**: Comprehensive error boundaries and fallbacks
- **Reusable**: Designed for cross-component and cross-project usage
- **Well-documented**: Clear JSDoc comments and usage examples

## Best Practices

- Use appropriate hooks for specific use cases
- Always handle loading and error states
- Implement proper cleanup in useEffect hooks
- Use memoization for expensive calculations
- Keep hooks focused on single responsibilities

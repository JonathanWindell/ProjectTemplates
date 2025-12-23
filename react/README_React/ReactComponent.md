# React Core Components

A curated collection of high-impact, reusable React components for modern applications with consistent styling and functionality.

## Layout Components

### 1. Container
Structural wrapper with consistent padding and max-width:

```jsx
<Container>
  <YourContent />
</Container>
```

### 2. Sidebar
Responsive vertical navigation:

```jsx
<Sidebar>
  <nav>
    <ul>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/settings">Settings</a></li>
    </ul>
  </nav>
</Sidebar>
```

## UI Components

### 3. Button
Interactive element with multiple variants:

```jsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
```

### 4. ErrorBoundary
Protects against component crashes:

```jsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### 5. LoadingSpinner
Visual loading indicator:

```jsx
{isLoading ? <LoadingSpinner /> : <YourContent />}
```

### 6. Modal
Dialog overlay for critical information:

```jsx
<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <h2>Modal Title</h2>
  <p>Modal content here</p>
</Modal>
```

### 7. Notification
Transient feedback messages:

```jsx
<Notification type="success" message="Operation completed!" />
<Notification type="error" message="Something went wrong" />
```

### 8. Pagination
Navigation for large datasets:

```jsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
```

### 9. SearchBar
Input for filtering content:

```jsx
<SearchBar onSearch={(query) => setSearchQuery(query)} />
```

### 10. Tabs
Switchable content sections:

```jsx
<Tabs>
  <Tab label="Tab 1">Content for Tab 1</Tab>
  <Tab label="Tab 2">Content for Tab 2</Tab>
</Tabs>
```

## Usage Example

```jsx
import { Container, Sidebar, Button, Modal, SearchBar } from './components';

function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <Container>
      <Sidebar>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Open Modal
        </Button>
      </Sidebar>
      
      <main>
        <SearchBar onSearch={(query) => console.log(query)} />
        <Button variant="secondary">Action</Button>
      </main>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Modal Content</h2>
        <p>This is a modal dialog</p>
      </Modal>
    </Container>
  );
}
```

## Key Features

- **Consistent styling**: All components use shared design tokens
- **Accessibility**: Built with ARIA attributes and keyboard navigation
- **Responsive**: Components adapt to different screen sizes
- **Type-safe**: Full TypeScript support with proper prop types
- **Customizable**: Easy to extend and modify for specific needs

## Best Practices

- Use appropriate variants for different contexts
- Always provide fallback content for loading states
- Implement proper error boundaries for critical sections
- Use semantic HTML elements within components
- Test components across different devices and screen sizes

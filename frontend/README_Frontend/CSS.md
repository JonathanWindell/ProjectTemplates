# CSS Utility Classes

A lightweight collection of reusable CSS utility classes for rapid web development.

## Overview

This CSS framework provides essential utility classes that follow the "utility-first" approach. Instead of writing custom CSS for each component, you can apply these pre-built classes directly in your HTML to quickly style elements.

## Core Layout System

### Container
A responsive container that centers content and provides consistent max-width:

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
```

### Row and Columns
Flexible grid system using flexbox:

```css
.row { display: flex; flex-wrap: wrap; margin: 0 -15px; }
.col { flex: 1; padding: 0 15px; }
.col-2 { flex: 0 0 50%; max-width: 50%; padding: 0 15px; }
.col-3 { flex: 0 0 33.333%; max-width: 33.333%; padding: 0 15px; }
.col-4 { flex: 0 0 25%; max-width: 25%; padding: 0 15px; }
```

## Flexbox Utilities

Quick flexbox layout controls:

```css
.d-flex { display: flex; }
.flex-column { flex-direction: column; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.align-center { align-items: center; }
```

## Spacing Utilities

Consistent spacing system:

```css
.m-0 { margin: 0; }
.my-3 { margin-top: 1rem; margin-bottom: 1rem; } 
.mb-3 { margin-bottom: 1rem; }
.p-3 { padding: 1rem; }
```

## Typography Utilities

Text styling controls:

```css
.text-center { text-align: center; }
.font-bold { font-weight: 700; }
.text-sm { font-size: 0.875rem; }
.text-xl { font-size: 1.25rem; }
```

## Visual Utilities

Display and visibility controls:

```css
.d-none { display: none; }
.d-block { display: block; }
.bg-white { background-color: #ffffff; }
.text-black { color: #000000; }
```

## Animation Utilities

Simple animation effects:

```css
.animate-none { animation: none; }
.animate-spin { animation: spin 1s linear infinite; }
.animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
.animate-bounce { animation: bounce 1s infinite; }
```

## Backdrop Utilities

Background blur effects:

```css
.backdrop-filter-none { backdrop-filter: none; }
.backdrop-blur-sm { backdrop-filter: blur(4px); }
.backdrop-blur { backdrop-filter: blur(8px); }
.backdrop-blur-lg { backdrop-filter: blur(16px); }
```

## Usage

Include the CSS file in your HTML document:

```html
<link rel="stylesheet" href="css_basics.css">
```

Then apply the classes directly to your HTML elements:

```html
<div class="container my-3 p-3 bg-white">
  <h2 class="text-xl font-bold">Example Heading</h2>
  <div class="row">
    <div class="col">
      <p class="text-center">This is an example of using utility classes.</p>
    </div>
  </div>
</div>
```

## Best Practices

- **Combine Classes**: Layer multiple utility classes to create complex styles without writing custom CSS
- **Keep It Simple**: This is a lightweight framework - use it for basic styling and add custom CSS for complex requirements
- **Semantic HTML**: Use semantic HTML elements and enhance them with utility classes

## Extension

When the provided utilities don't meet your needs, extend the framework by adding your own custom classes following the same naming conventions.

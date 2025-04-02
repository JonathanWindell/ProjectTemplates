CSS Utility Classes
A comprehensive collection of reusable CSS utility classes for rapid web development.
Overview
This CSS framework provides a collection of utility classes that follow the "utility-first" approach to CSS. Instead of writing custom CSS for each component, you can apply these pre-built classes directly in your HTML to quickly style elements.
Key Features
Layout System

Container classes for consistent page widths
Row and column classes for structured layouts
Flexbox utilities for advanced layouts
Grid system with various column configurations

Spacing

Comprehensive margin and padding utilities
Various sizes from extra small (0.25rem) to extra large (5rem+)
Directional control (top, right, bottom, left)
Negative margins for special layout needs
Gap utilities for flex and grid layouts

Typography

Font size classes from extra small to display-level
Font weight variations
Text alignment options
Text transform utilities
Line height controls
Text decoration and styling options

Display and Position

Display property controls (block, inline, flex, etc.)
Position utilities (static, relative, absolute, etc.)
Z-index management
Top/right/bottom/left positioning

Width and Height

Percentage-based widths (full, half, thirds, etc.)
Viewport-relative sizing
Auto-sizing options

Borders

Border width controls
Border styles (solid, dashed, dotted)
Border radius utilities for rounded corners
Individual side border controls

Colors

Background color utilities
Text color utilities
Border color options
Opacity controls

Effects

Shadow utilities for depth
Opacity controls
Transform utilities (scale, rotate, translate)
Filter effects (blur, brightness, contrast)
Transition and animation helpers

Responsive Design

Media query-based classes for different screen sizes
Responsive display controls
Responsive spacing and layout options

Usage
Simply include the CSS file in your HTML document:
htmlCopy<link rel="stylesheet" href="css-utility-classes.css">
Then apply the classes directly to your HTML elements:
htmlCopy<div class="container my-4 p-3 bg-white rounded shadow">
  <h2 class="text-xl font-bold mb-2">Example Heading</h2>
  <p class="text-gray-700">This is an example of using utility classes.</p>
</div>
Best Practices

Combine Classes: Layer multiple utility classes to create complex styles without writing custom CSS
Mobile-First: Start with mobile layouts and use responsive classes to adapt for larger screens
Component Patterns: Extract common patterns into component classes when the same combinations are used repeatedly
Custom Properties: Use CSS variables for theming and maintaining consistency

Extension
When the provided utilities don't meet your needs, extend the framework by adding your own custom classes following the same naming conventions.
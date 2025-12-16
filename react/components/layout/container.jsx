/*
 * Container - A flexible layout component with responsive behavior
 */
export const Container = ({ children, className = "" }) => {
  return <div className={`max-w-7xl mx-auto p-4 ${className}`}>{children}</div>;
};
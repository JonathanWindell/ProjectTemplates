/*
 * Button - A button component with support for different variants
 */
export const Button = ({ variant = "primary", children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded text-white font-bold";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
    success: "bg-green-500 hover:bg-green-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
  };
  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button> 
  );
};
/* 
   * withTheme - HOC to handle dark/light theme
   */
  import { useState, useEffect } from "react";
  export const withTheme = (Component) => {
    return (props) => {
      const [theme, setTheme] = useState("light");
      useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
          setTheme(storedTheme);
        }
      }, []);
      const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
      };
      return (
        <div className={theme}>
          <button onClick={toggleTheme}>Byt Tema</button>
          <Component {...props} />
        </div>
      );
    };
  };
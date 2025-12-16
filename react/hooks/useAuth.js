/* 
   * withAuthentication - HOC to protect pages that require authentication
   */
  export const withAuthentication = (Component) => {
    return (props) => {
      const isAuthenticated = true; // Lägg till logik för autentisering här
      if (!isAuthenticated) {
        return <div>Du måste vara inloggad för att se denna sida.</div>;
      }
      return <Component {...props} />;
    };
  };
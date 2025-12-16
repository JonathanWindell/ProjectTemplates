/* 
   * Notification/Toast - A notification component to display messages
   */
  export const Toast = ({ message, type = "success", onClose }) => {
    const types = {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
    };
    return (
      <div className={`fixed bottom-4 left-4 p-4 rounded ${types[type]} text-white`}>
        <div className="flex justify-between">
          <span>{message}</span>
          <button onClick={onClose} className="ml-4">&times;</button>
        </div>
      </div>
    );
  };
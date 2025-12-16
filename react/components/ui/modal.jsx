/* 
   * Modal/Dialog - A popup component for messages or forms
   */
  export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
          <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
          {children}
        </div>
      </div>
    );
  };
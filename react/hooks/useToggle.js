import { useState, useCallback } from 'react';

/**
 * Hook to handle toggle state (e.g., show/hide modals)
 * @param {boolean} initialState - Initial state
 * @returns {Array} [state, toggle, setState]
 */
export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return [state, toggle, setState];
};
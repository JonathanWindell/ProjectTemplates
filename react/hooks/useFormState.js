import { useState, useCallback } from 'react';

/**
 * Hook to handle form data
 * @param {Object} initialValues - Initial values for the form
 * @returns {Array} [values, handleChange, resetForm, setValues]
 */
export const useFormState = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return [values, handleChange, resetForm, setValues];
};
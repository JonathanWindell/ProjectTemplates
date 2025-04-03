/**
 * React Hooks Templates
 * En samling återanvändbara React hooks för vanliga användningsfall
 */

import { useState, useEffect, useRef, useCallback, useReducer, useContext, useMemo } from 'react';

// ==========================================
// useState Hooks
// ==========================================

/**
 * Hook för att hantera formulärdata
 * @param {Object} initialValues - Initiala värden för formuläret
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

/**
 * Hook för att hantera toggle-tillstånd (t.ex. visa/dölj modaler)
 * @param {boolean} initialState - Initialt tillstånd
 * @returns {Array} [state, toggle, setState]
 */
export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return [state, toggle, setState];
};

/**
 * Hook för att hantera laddningstillstånd
 * @param {boolean} initialState - Initialt laddningstillstånd
 * @returns {Array} [isLoading, startLoading, stopLoading, setLoading]
 */
export const useLoading = (initialState = false) => {
  const [isLoading, setLoading] = useState(initialState);

  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);

  return [isLoading, startLoading, stopLoading, setLoading];
};

// ==========================================
// useEffect Hooks
// ==========================================

/**
 * Hook för att hämta data från API
 * @param {string} url - URL att hämta från
 * @param {Object} options - Fetch-options
 * @returns {Object} { data, error, loading, refetch }
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || 'Ett fel uppstod vid hämtning av data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};

/**
 * Hook för att hantera event-lyssnare med automatisk städning
 * @param {string} eventType - Typ av event (t.ex. 'resize', 'keydown')
 * @param {Function} handler - Callback-funktion för eventet
 * @param {Element|Window} element - Element att fästa lyssnaren på
 */
export const useEventListener = (eventType, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventType, eventListener);

    return () => {
      element.removeEventListener(eventType, eventListener);
    };
  }, [eventType, element]);
};

/**
 * Hook för att synkronisera med localStorage
 * @param {string} key - Lagringsnyckeln
 * @param {*} initialValue - Initialvärde om nyckeln inte finns
 * @returns {Array} [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

/**
 * Hook för att köra kod endast en gång, även med React Strict Mode (där useEffect körs två gånger)
 * @param {Function} callback - Funktion att köra en gång
 */
export const useEffectOnce = (callback) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      callback();
    }
  }, [callback]);
};

// ==========================================
// useReducer Hooks
// ==========================================

/**
 * Hook för att hantera listdata med CRUD-operationer
 * @param {Array} initialItems - Initial lista av items
 * @returns {Object} { items, addItem, updateItem, removeItem, clearItems }
 */
export const useList = (initialItems = []) => {
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.payload];
      case 'UPDATE':
        return state.map(item => 
          item.id === action.payload.id ? { ...item, ...action.payload.data } : item
        );
      case 'REMOVE':
        return state.filter(item => item.id !== action.payload);
      case 'CLEAR':
        return [];
      default:
        return state;
    }
  }, initialItems);

  const addItem = useCallback((item) => {
    dispatch({ type: 'ADD', payload: item });
  }, []);

  const updateItem = useCallback((id, data) => {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE', payload: id });
  }, []);

  const clearItems = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  return { items, addItem, updateItem, removeItem, clearItems };
};

/**
 * Hook för att hantera flerstegsformulär
 * @param {Object} initialData - Initial formulärdata
 * @param {Object} stepsConfig - Konfiguration för formstegen
 * @returns {Object} { data, currentStep, next, prev, goTo, updateData, reset }
 */
export const useMultiStepForm = (initialData = {}, stepsConfig = {}) => {
  const steps = Object.keys(stepsConfig);
  
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'NEXT':
        if (state.currentStepIndex >= steps.length - 1) return state;
        return {
          ...state,
          currentStepIndex: state.currentStepIndex + 1
        };
      case 'PREV':
        if (state.currentStepIndex <= 0) return state;
        return {
          ...state,
          currentStepIndex: state.currentStepIndex - 1
        };
      case 'GO_TO':
        if (action.payload < 0 || action.payload >= steps.length) return state;
        return {
          ...state,
          currentStepIndex: action.payload
        };
      case 'UPDATE_DATA':
        return {
          ...state,
          data: { ...state.data, ...action.payload }
        };
      case 'RESET':
        return {
          data: initialData,
          currentStepIndex: 0
        };
      default:
        return state;
    }
  }, {
    data: initialData,
    currentStepIndex: 0
  });

  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const prev = useCallback(() => dispatch({ type: 'PREV' }), []);
  const goTo = useCallback((step) => dispatch({ type: 'GO_TO', payload: step }), []);
  const updateData = useCallback((data) => dispatch({ type: 'UPDATE_DATA', payload: data }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return {
    data: state.data,
    currentStep: steps[state.currentStepIndex],
    currentStepIndex: state.currentStepIndex,
    isFirstStep: state.currentStepIndex === 0,
    isLastStep: state.currentStepIndex === steps.length - 1,
    stepsCount: steps.length,
    next,
    prev,
    goTo,
    updateData,
    reset
  };
};

// ==========================================
// Diverse Utility Hooks
// ==========================================

/**
 * Hook för att hantera debounce på input eller andra snabba ändringar
 * @param {*} value - Värdet att debouncera
 * @param {number} delay - Fördröjning i millisekunder
 * @returns {*} Det debouncerade värdet
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook för att kontrollera om ett element är synligt i viewporten
 * @param {Object} options - IntersectionObserver options
 * @returns {Array} [ref, isVisible]
 */
export const useInView = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

/**
 * Hook för att hantera media queries (responsivitet)
 * @param {string} query - CSS media query string
 * @returns {boolean} Matchar mediaquery:n eller ej
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

/**
 * Hook för att hantera formulärvalidering
 * @param {Object} initialValues - Initialvärden för formuläret
 * @param {Function} validateFn - Valideringsfunktion
 * @returns {Object} { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }
 */
export const useFormValidation = (initialValues = {}, validateFn = () => ({})) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting]);

  const validate = useCallback(() => {
    const validationErrors = validateFn(values);
    setErrors(validationErrors);
    return validationErrors;
  }, [values, validateFn]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setValues(prevValues => ({
      ...prevValues,
      [name]: val
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));
    
    validate();
  }, [validate]);

  const handleSubmit = useCallback((callback) => (e) => {
    if (e) e.preventDefault();
    
    setTouched(
      Object.keys(values).reduce((touched, field) => {
        touched[field] = true;
        return touched;
      }, {})
    );
    
    const validationErrors = validate();
    const noErrors = Object.keys(validationErrors).length === 0;
    
    setIsSubmitting(true);
    
    if (noErrors && callback) {
      callback(values);
    }
  }, [values, validate]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
};

/**
 * Hook för att hantera async-operationer
 * @param {Function} asyncFunction - Async funktion att köra
 * @returns {Object} { execute, status, value, error }
 */
export const useAsync = (asyncFunction) => {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setStatus('pending');
    setValue(null);
    setError(null);

    try {
      const result = await asyncFunction(...args);
      setValue(result);
      setStatus('success');
      return result;
    } catch (error) {
      setError(error);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);

  return { execute, status, value, error, isLoading: status === 'pending' };
};

/**
 * Hook för att hantera timeout och interval
 * @returns {Object} { setTimeout, clearTimeout, setInterval, clearInterval }
 */
export const useTimers = () => {
  const timersRef = useRef({
    timeouts: new Map(),
    intervals: new Map()
  });

  const clear = useCallback(() => {
    timersRef.current.timeouts.forEach(clearTimeout);
    timersRef.current.intervals.forEach(clearInterval);
    
    timersRef.current.timeouts.clear();
    timersRef.current.intervals.clear();
  }, []);

  useEffect(() => {
    return clear;
  }, [clear]);

  const setTimeoutFn = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.timeouts.set(id, id);
    return id;
  }, []);

  const clearTimeoutFn = useCallback((id) => {
    clearTimeout(id);
    timersRef.current.timeouts.delete(id);
  }, []);

  const setIntervalFn = useCallback((fn, delay) => {
    const id = setInterval(fn, delay);
    timersRef.current.intervals.set(id, id);
    return id;
  }, []);

  const clearIntervalFn = useCallback((id) => {
    clearInterval(id);
    timersRef.current.intervals.delete(id);
  }, []);

  return {
    setTimeout: setTimeoutFn,
    clearTimeout: clearTimeoutFn,
    setInterval: setIntervalFn,
    clearInterval: clearIntervalFn,
    clearAll: clear
  };
};
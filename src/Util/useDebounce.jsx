import { useState, useEffect } from 'react';

export const useDebounce = (value) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    const delay = 700;

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
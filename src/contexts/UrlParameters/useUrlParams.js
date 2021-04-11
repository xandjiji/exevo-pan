import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function useUrlParams(initialValue) {
    const [paramState, setParamState] = useState(initialValue);
    const history = useHistory();

    useEffect(() => {
        const { search, pathname } = window.location;
        const params = new URLSearchParams(search);

        for (const key in paramState) {
            const currentParamValue = paramState[key];

            if (currentParamValue !== null) {
                if (typeof currentParamValue === 'object') {
                    const setArray = Array.from(currentParamValue);
                    params.set(key, setArray.join(','));
                } else {
                    params.set(key, currentParamValue);
                }

            } else {
                params.delete(key);
            }
        }

        history.replace(`${pathname}?${params.toString()}`);
    }, [paramState, history]);

    return [paramState, setParamState];
}
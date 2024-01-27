import { useEffect, useState, useCallback } from "react";


const useFetchPromise = (
    query,
    transformData,
    promise,
    debounceWait,
    autoComplete,
) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    const debounceFunction = (func, wait) => {
        let timeout;

        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = useCallback(
        debounceFunction(async (query, transformData, signal) => {
            try {
                const response = await promise(query, signal);
                setData(transformData(response));
            } catch (e) {
                console.log(e);
                if (!signal.aborted) setError(e);
            }
        }, debounceWait),
        [debounceWait, promise, transformData]
    );

    useEffect(() => {
        if (!query || !autoComplete) {
            setData(null);
            setError(null);
            return;
        }
        const controller = new AbortController();
        const signal = controller.signal;

        fetchData(query, transformData, signal);

        return () => {
            controller.abort();
        };
    }, [query, transformData, fetchData, autoComplete]);

    return [data, setData, error];
};

export default useFetchPromise;

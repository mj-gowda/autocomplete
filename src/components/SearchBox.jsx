/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import ListMeanings from './ListMeanings';
import useFetchPromise from '../lib/useFetchPromise';
import { DefinitionContext } from '../context/context';
const debounceWait = 500;

const SearchBox = ({ transformData, promise, autoComplete, Suggestions }) => {
    const state = useContext(DefinitionContext);
    const [query, setQuery] = useState("");
    const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);


    const [data, setData, error] = useFetchPromise(
        query,
        transformData,
        promise,
        debounceWait,
        isAutoComplete
    );


    const handleChange = (event) => {
        setQuery(event.target.value);
        state.setList(true);
    };



    const handleKeyUp = (event) => {
        const keyCode = event.keyCode;
        if (keyCode === 13) {
            // user enters 
            state.setWords(data);
            state.setDefinitions(true);
            state.setList(false)
            setIsAutoComplete(false);
            setData(null);
            return;
        }
        setIsAutoComplete(true);
    };
    return (
        <>
            <label className='text-2xl sm:text-3xl m-6 font-semibold '>
                Search
            </label>
            <br />
            <input className=' w-3/4 sm:w-1/2 p-2 border-4 rounded-md'
                value={state.list ? query : ""}
                onChange={handleChange}
                autoComplete="off"
                onKeyUp={handleKeyUp}
            />
            {data && data.length > 0 && state.list && Suggestions(data)}
            {error && console.log(error)}
            <div className='w-3/4'>
                {state.definitions && <ListMeanings />}
            </div>
        </>
    );
}

export default SearchBox
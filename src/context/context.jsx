/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const DefinitionContext = createContext('false');


export const DefinitionProvider = ({ children }) => {
    const [definitions, setDefinitions] = useState(false);
    const [list, setList] = useState(false);
    const [words, setWords] = useState([]);
    return (
        <DefinitionContext.Provider value={{ definitions, setDefinitions, words, setWords, list, setList }}>
            {children}
        </DefinitionContext.Provider>
    )
};
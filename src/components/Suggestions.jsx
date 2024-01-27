/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { DefinitionContext } from '../context/context';



// this component is used to list all the possible suggestions for the search feature

const Suggestons = ({ items }) => {
    const state = useContext(DefinitionContext);

    //Incase the user selects a word from the suggestions to get the definition
    const handleClick = (item) => {
        const wordsArray = Array.isArray(item) ? item : [item];
        state.setWords([...wordsArray]);
        state.setDefinitions(true);
        state.setList(false);
    }
    return (
        <div className="w-3/4 sm:w-1/2 ">
            <ul className="bg-gray-200 h-auto max-h-64 sm:max-h-96 m overflow-scroll text-gray-800 rounded-md shadow-md">
                {items.map((item, index) => (
                    <li
                        className="p-3 cursor-pointer rounded-md hover:bg-gray-400 transition duration-300"
                        key={index}
                        onClick={() => handleClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default Suggestons
import { useContext, useState, useEffect } from 'react';
import { DefinitionContext } from '../context/context';
import getMeaning from '../lib/getMeanings';
const maxWords = 10;
const ListMeanings = () => {
    const state = useContext(DefinitionContext);
    const words = state.words;
    const [meanings, setMeanings] = useState([]);

    useEffect(() => {
        const fetchMeaning = async () => {
            try {
                const meaningsArray = await Promise.all(words.slice(0, maxWords).map(async (word) => {
                    return await getMeaning(word);
                }));
                setMeanings([...meaningsArray]);
            } catch (error) {
                console.error('Error fetching meanings:', error.message);
            }
        };

        fetchMeaning();
    }, [words]);

    const truncateDefinition = (definition) => {
        if (!definition) return 'No definition available';
        const firstSemicolonIndex = definition.indexOf(';');
        if (firstSemicolonIndex === -1) return definition; // Return full definition if no semicolon found
        const secondSemicolonIndex = definition.indexOf(';', firstSemicolonIndex + 1);
        if (secondSemicolonIndex === -1) return definition; // Return full definition if no second semicolon found

        return definition.substring(0, secondSemicolonIndex + 1).trim();
    };

    const handleClick = () => {
        state.setWords([]);
        state.setDefinitions(false);
    };

    return (
        <div className='mt-20 mx-2 '>
            <div className='flex flex-row  justify-around mb-5'>
                <h1 className='text-2xl font-bold'>Definitions</h1>
                <button className='bg-red-500 rounded-md px-3' onClick={() => handleClick()}>
                    Clear
                </button>
            </div>

            <div className='m-4'>
                {meanings.map((meaning, idx) => (
                    <div key={idx} className='bg-white w-full p-4 m-2 rounded-lg shadow-md'>
                        <div className='mb-2'>
                            <span className='font-semibold text-gray-800'>Word: </span>
                            <span className='text-gray-600'>{meaning.word}</span>
                        </div>
                        <div>
                            <span className='font-semibold text-gray-800'>Definition: </span>
                            <span className='text-gray-600'>{truncateDefinition(meaning.definition)}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ListMeanings;

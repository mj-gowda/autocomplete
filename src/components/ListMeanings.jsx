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
                //console.log('meanings', meanings)
            } catch (error) {
                console.error('Error fetching meanings:', error.message);
            }
        };

        fetchMeaning();
    }, [words]);


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
                {meanings[0] ? (meanings.map((meaning, idx) => (
                    <div key={idx} className='bg-white w-full p-4 m-2 rounded-lg shadow-md'>
                        <div className='mb-2'>
                            <span className='font-semibold text-gray-800'>Word: </span>
                            <span className='text-gray-600'>{meaning[0]?.word || 'not found'}</span>
                        </div>
                        <div>
                            <span className='font-semibold text-gray-800'>Definition: </span>
                            <span className='text-gray-600'>{meaning[0]?.meanings?.[0]?.definitions?.[0]?.definition}</span>
                        </div>
                    </div>))
                ) : (<p> Loading...</p>)
                }
            </div>

        </div>
    );
};

export default ListMeanings;

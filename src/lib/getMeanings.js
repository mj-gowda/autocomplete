const apiKey = import.meta.env.VITE_API_KEY || '';

export default async function getMeaning(word) {
    const url = `https://api.api-ninjas.com/v1/dictionary?word=${word}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }

}


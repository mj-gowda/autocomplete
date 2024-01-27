export default async function getMeaning(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    try {
        const response = await fetch(url, {
            method: 'GET',
            // headers: {
            //     'X-Api-Key': apiKey,
            //     'Content-Type': 'application/json',
            // },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} ${word}`);
        }

        const result = await response.json();
        await new Promise(resolve => setTimeout(resolve, 100));
        return result;
    } catch (error) {
        console.error('Error:', error.message);
        return '';
    }

}
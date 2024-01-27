import SearchBox from "./components/SearchBox"
import Suggestions from "./components/Suggestions";
import { DefinitionProvider } from './context/context.jsx'
const maxItems = 50;

function App() {
  const transformData = (data) => {
    const finalData = data.slice(0, maxItems);
    //console.log(finalData);
    return finalData;
  }
  const dataPromise = async (query, signal) => {
    try {
      const wordsResponse = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt', { signal });
      if (!wordsResponse.ok) {
        throw new Error(`Failed to fetch words: ${wordsResponse.statusText}`);
      }

      const words = await wordsResponse.text();
      //console.log("words", words);

      const filteredWords = words
        .split("\n")
        .map(word => word.trim())
        .filter((word) => word.toLowerCase().startsWith(query.toLowerCase()));

      //console.log("filteredWords", filteredWords);
      return filteredWords;
    } catch (error) {
      // Handle errors, including AbortError
      console.error("Error:", error.message);
      throw error;
    }
  };


  return (
    <>
      <header>
        <div className="bg-white dark:bg-gray-800 overflow-hidden relative">
          <div className=" py-8 px-4 sm:px-6 sm:ml-12 lg:py-16 lg:px-8 z-20">
            <h2 className="text-2xl font-extrabold text-black dark:text-white sm:text-4xl">
              <span className="block">
                Oxford dictionary Search Engine ?
              </span>
              <span className="block text-indigo-500">
                Search the definition of any word in english.
              </span>
            </h2>
          </div>
        </div>
      </header>
      <DefinitionProvider>
        <main className="flex flex-col items-center">
          <SearchBox
            transformData={transformData}
            promise={dataPromise}
            autoComplete
            Suggestions={(items) => (
              <Suggestions items={items} />
            )} />
        </main>
      </DefinitionProvider>
    </>
  )
}

export default App

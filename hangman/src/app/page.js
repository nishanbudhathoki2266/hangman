"use client";

import hangmanWords from "@/constants/words";
import alphabets from "@/constants/alphabets";
import { useEffect, useState } from "react";

const Home = () => {
  // State to keep track of the word which is given as a question
  const [questionWord, setQuestionWord] = useState(null);

  // To keep track of which words to show
  const [wordIndexesToShow, setWordIndexesToShow] = useState([0]);

  // To keep track of things loading in our application
  const [isLoading, setIsLoading] = useState(true);

  // Function that handles guesses (when user clicks a word)
  const handleGuess = (e) => {
    console.log("WORD ", questionWord?.word);
    const indexes = questionWord?.word.split("").reduce((acc, word, index) => {
      if (index === 0) return acc;
      if (e.target.value === word) acc.push(index);
      return acc;
    }, []);

    setWordIndexesToShow([...wordIndexesToShow, ...indexes]);
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * hangmanWords.length);
    const randomWordObject = hangmanWords[randomIndex];
    setQuestionWord(randomWordObject);
    setIsLoading(false);
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen flex justify-center items-center">
      <div className="bg-white container mx-auto rounded-xl flex items-center center flex-wrap flex-col xl:flex-row gap-12 p-4 xl:p-12">
        {/* Left Layout */}
        <div className="bg-blue-400 h-96 w-full xl:flex-1 flex justify-center items-center rounded-md">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            HANGMAN COMING SOON
          </h1>
        </div>

        {/* Right layout */}
        <div className="flex flex-col gap-4 xl:flex-1 items-center justify-center">
          {/* Word input */}
          {isLoading ? (
            <p className="text-sm font-medium tracking-wide">
              Finding a word for you...
            </p>
          ) : (
            <div className="flex items-center justify-center flex-col gap-2">
              <p className="flex items-center gap-2">
                {questionWord?.word.split("").map((word, index) => (
                  <span className="font-bold">
                    {wordIndexesToShow.includes(index)
                      ? index === 0
                        ? word.toUpperCase()
                        : word
                      : "___"}
                  </span>
                ))}
              </p>
              <p className="text-sm font-medium tracking-wide">
                Hint:
                <span className="font-semibold">
                  {questionWord?.description}
                </span>
              </p>
            </div>
          )}

          {/* Guess indicator */}
          <p p className="text-sm text-red-400 font-medium tracking-wide">
            Incorrect guess: 1/5
          </p>

          {/* Keyboard */}
          <div className="border border-gray-200 p-2 flex items-center rounded-md gap-2 justify-start flex-wrap">
            {alphabets.map((alphabet) => (
              <button
                className="bg-blue-400 min-h-12 min-w-12 flex justify-center items-center text-white cursor-pointer hover:scale-105 rounded-md"
                value={alphabet}
                onClick={handleGuess}
              >
                {alphabet.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

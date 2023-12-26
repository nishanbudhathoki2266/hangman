"use client";

import hangmanWords from "@/constants/words";
import alphabets from "@/constants/alphabets";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import hangmanSteps from "@/constants/hangman";

const Home = () => {
  // Number of attempts allowed
  const attemptsLimit = 6;

  // State to keep track of the word which is given as a question
  const [questionWord, setQuestionWord] = useState("");

  // To keep track of which words to show
  const [wordIndexesToShow, setWordIndexesToShow] = useState([0]);

  // Number of wrong attempts
  const [wrongAttempts, setWrongAttempts] = useState(0);

  // State to track clicked words
  const [clickedButtons, setClickedButtons] = useState([]);

  // To keep track of things loading in our application
  const [isLoading, setIsLoading] = useState(true);

  // Win state
  const [isWin, setIsWin] = useState(false);

  // Loosing and winning state
  const [isGameOver, setIsGameOver] = useState(false);

  // Function that handles guesses (when user clicks a word)
  const handleGuess = (e) => {
    const { value } = e.target;

    // Update the state to include the button so that next time it grays out
    setClickedButtons((prevClickedButtons) => [...prevClickedButtons, value]);

    // If the guessed word is not included in the given word, just do nothing and add wrong attempts count
    if (!questionWord?.word.split("").includes(value)) {
      return setWrongAttempts((currAttempts) => currAttempts + 1);
    }

    // If included in the question (word), add the indexes to state so that the right letters appear in the word instead of __
    const indexes = questionWord?.word.split("").reduce((acc, word, index) => {
      if (index === 0) return acc;
      if (e.target.value === word) acc.push(index);
      return acc;
    }, []);

    setWordIndexesToShow([...wordIndexesToShow, ...indexes]);
  };

  // Restart the game
  const restart = () => {
    setWrongAttempts(0);
    setIsGameOver(false);
    setClickedButtons([]);
    setIsWin(false);
    setWordIndexesToShow([0]);
    loadQuestion();
  };

  // Load a question
  const loadQuestion = () => {
    const randomIndex = Math.floor(Math.random() * hangmanWords.length);
    const randomWordObject = hangmanWords[randomIndex];
    setQuestionWord(randomWordObject);
  };

  // Load a word
  useEffect(() => {
    loadQuestion();
    setIsLoading(false);
  }, []);

  // For checking if game is over
  useEffect(() => {
    setIsGameOver(wrongAttempts === attemptsLimit);
  }, [wrongAttempts]);

  // Check if win
  useEffect(() => {
    setIsWin(questionWord.word?.split("").length === wordIndexesToShow.length);
  }, [wordIndexesToShow, questionWord]);

  return (
    <div className="bg-slate-800 min-h-screen flex justify-center items-center">
      <div className="bg-white container mx-auto rounded-xl flex items-center center flex-wrap flex-col xl:flex-row gap-12 p-4 xl:p-12">
        {/* Left Layout */}
        <div className="bg-blue-400 min-h-[60vh] w-full xl:flex-1 flex justify-center items-center rounded-md">
          <textarea
            className="bg-transparent text-white font-bold text-4xl"
            rows={10}
            value={hangmanSteps[wrongAttempts]}
          />
        </div>

        {/* Right layout */}
        {isGameOver ? (
          <div className="flex-1 gap-4 flex justify-center items-center flex-col overflow-hidden">
            <span className="font-extrabold text-6xl text-gray-400">
              GAME OVER
            </span>
            <button
              className="bg-blue-400 hover:scale-105 py-2 px-4 text-lg rounded-md text-white uppercase font-semibold"
              onClick={restart}
            >
              Restart
            </button>
          </div>
        ) : isWin ? (
          <div className="flex-1 gap-4 flex justify-center items-center flex-col">
            <Confetti
              numberOfPieces={500}
              opacity={0.6}
              friction={0.99}
              tweenDuration={5000}
            />
            <span className="font-extrabold text-4xl text-gray-400">
              Congratulations! You did it 🥳
            </span>
            <button
              className="bg-blue-400 hover:scale-105 py-2 px-4 text-lg rounded-md text-white uppercase font-semibold"
              onClick={restart}
            >
              Replay
            </button>
          </div>
        ) : (
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
                        ? word.toUpperCase()
                        : "__"}
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
            <p
              p
              className="text-sm text-red-400 text-center font-medium tracking-wide"
            >
              Incorrect attempt/s: {wrongAttempts}/{attemptsLimit}
              {attemptsLimit - wrongAttempts < 4 && (
                <span className="block">
                  Be careful! You only have {attemptsLimit - wrongAttempts}{" "}
                  attempt/s left!
                </span>
              )}
            </p>

            {/* Keyboard */}
            <div className="border border-gray-200 p-2 flex items-center rounded-md gap-2 flex-wrap">
              {alphabets.map((alphabet) => (
                <button
                  className={`min-h-12 min-w-12 flex justify-center items-center text-white hover:scale-105 rounded-md ${
                    clickedButtons.includes(alphabet)
                      ? "bg-gray-300 cursor-not-allowed"
                      : "cursor-pointer bg-blue-400"
                  }`}
                  value={alphabet}
                  disabled={clickedButtons.includes(alphabet)}
                  onClick={handleGuess}
                >
                  {alphabet.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

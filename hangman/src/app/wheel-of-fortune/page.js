"use client";
import React, { useEffect, useState } from "react";

const prizes = ["car", "Tv", "Fridge", "Apple"];

const WheelOfFortunePage = () => {
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const startGame = () => {
    setSelectedBoxIndex(null);
    setIsGameRunning(true);

    // Move the border every second
    const interval = setInterval(() => {
      setSelectedBoxIndex((prevIndex) => {
        // Reset border if it reaches the last box
        if (prevIndex === boxes.length - 1) {
          return null;
        }
        // Move the border to the next box
        return prevIndex === null ? 0 : prevIndex + 1;
      });
    }, 50 + Math.random() * 10);

    // Stop moving the border after 5 seconds (adjust as needed)
    setTimeout(() => {
      clearInterval(interval);
      setIsGameRunning(false);

      // Display a message when the game stops
      alert(
        selectedBoxIndex !== null
          ? "Congratulations! You won!"
          : "Sorry, you did not win this time. Try again!"
      );
    }, 5000);
  };

  const renderBoxes = () => {
    return boxes.map((box, index) => (
      <div
        key={index}
        className={`w-16 h-16 border-4 ${
          selectedBoxIndex === index ? "border-green-500" : "border-gray-300"
        }`}
      >
        {prizes[index]}
      </div>
    ));
  };

  const boxes = Array(5).fill(); // Change the number of boxes as needed

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4">Gift Box Game</h1>

      <div className="flex space-x-4">{renderBoxes()}</div>

      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        onClick={startGame}
        disabled={isGameRunning}
      >
        {isGameRunning ? "Game Running..." : "Start Game"}
      </button>
    </div>
  );
};

export default WheelOfFortunePage;

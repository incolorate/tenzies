import { useState, useEffect } from "react";
import "./App.css";
import Dice from "./assets/Dice";
import Confetti from "react-confetti";

function App() {
  let [dice, setDice] = useState(randomNumber);
  let [tenzies, setTenzies] = useState(false);
  let [time, setTime] = useState(0);
  let [timerRunning, setTimerRunning] = useState(false);

  // Set counter
  useEffect(() => {
    let intervalId;
    if (timerRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [timerRunning, time]);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  useEffect(() => {
    const checkHeld = dice.every((dice) => dice.isHeld);
    const checkValue = dice.every((part) => dice[0].value === part.value);
    if (checkHeld && checkValue) {
      setTenzies(true);
    }
  }, [dice]);

  function randomNumber() {
    let array = [];
    for (let i = 0; i < 10; i++) {
      let obj = {
        id: `${i}`,
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      };
      array.push(obj);
    }
    return array;
  }

  function hold(id) {
    setDice((oldDice) => {
      return oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      });
    });
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((dice) => {
        return dice.isHeld
          ? dice
          : { ...dice, value: Math.ceil(Math.random() * 6) };
      })
    );
    setTimerRunning(true);
    if (tenzies) {
      setDice(randomNumber);
      setTenzies((oldValue) => !oldValue);
      setTimerRunning(false);
    }
  }

  const diceElements = dice.map((element) => (
    <Dice
      value={element.value}
      key={element.id}
      id={element.id}
      isHeld={element.isHeld}
      handleClick={hold}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="instructions">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="stopwatch-container">
        <p className="stopwatch-time">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
      </div>
      <div className="dice-container">
        {diceElements}
        <button type="button" className="roll-button" onClick={rollDice}>
          {tenzies ? "Reset" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;

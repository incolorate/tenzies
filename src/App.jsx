import { useState, useEffect } from "react";
import "./App.css";
import Dice from "./assets/Dice";
import Confetti from "react-confetti";

function App() {
  let [dice, setDice] = useState(randomNumber);
  let [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const checkHeld = dice.every((dice) => dice.isHeld);
    const checkValue = dice.every((part) => dice[0].value === part.value);
    if (checkHeld && checkValue) {
      setTenzies(true);
      console.log("win");
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
    if (tenzies) {
      setDice(randomNumber);
      setTenzies((oldValue) => !oldValue);
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

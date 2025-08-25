import './App.css'
import {languages} from './languages'
import { useState, useEffect } from 'react'
import {clsx} from 'clsx'
import {getFarewellText} from './utils'

export default function App(){

  // states
  const [word, setWord] = useState("react");
  const [guessWord, setGuessWord] = useState([]);

  //derived values
  const wrongGuessCount = guessWord.filter((letter) => (
    !word.includes(letter)
  )).length;
  const gameWon = word.split('').filter((letter) => (
    !guessWord.includes(letter)
  )).length === 0 ? true : false;
  const gameLost = wrongGuessCount >= languages.length-1 ? true : false;
  const isGameOver = gameWon || gameLost ? true : false;
  
  //rendering repitive elements
  const charElems = word.split('').map((char) => (
    <span>{guessWord.includes(char) ? char.toUpperCase() : ""}</span>
  ))

  const langElems = languages.map((language) => {
    const className = clsx({lost: languages.indexOf(language) < wrongGuessCount})
    const style = {
      backgroundColor:language.backgroundColor,
      color: language.color
    }
    return (<h2 style={style} className={className}>{language.name}</h2>)
  })

  // updating guessedword state
  function addGuess(letter){
    setGuessWord((prevGuessWord) => (
      prevGuessWord.includes(letter) ? prevGuessWord : [...prevGuessWord, letter]
    ))
  }

  //rendering keyboard components
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const buttons = alphabets.split('').map((char) => (
    <button  
    onClick={() => addGuess(char)}
    className = {clsx({right:(word.includes(char) && guessWord.includes(char)), 
    wrong:(guessWord.includes(char) && !word.includes(char))})}>
      {char.toUpperCase()}
    </button>
  ))

  // classname and variable for rendering different messages and styling
  const gameStatusClass = clsx("game-status",{"won":gameWon, "lost": gameLost, 
    "wrong-guess":(wrongGuessCount > 0 && wrongGuessCount < languages.length-1)})

  const wrongLanguages = languages.slice(0, wrongGuessCount);
  const languageArr = wrongLanguages.map((language) => (language.name))
  const farewellMsg = getFarewellText(languageArr)
  
  const renderEle =  (isGameOver ? (
    gameWon ?
      <>
        <h2>You Win</h2>
        <p>Well done 🎉!</p>
      </>:
      (gameLost ?
        <>
          <h2>Game Over</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
        : null
      )) 
    : wrongGuessCount > 0 ? 
        <h2>"{farewellMsg}"</h2>
      : null
    ) 

  return(
    <main className='main-container'>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word under 8 attempts to keep the programming world safe from Assembly!</p>
        <section className={gameStatusClass}>
          {renderEle}
        </section>
      </header>
      
      <section className='language-container'>
        {langElems}
      </section>
      <section className='word-container'>
        {charElems}
      </section>
      <div className='foot-container'>
          <section className='keyboard-container'>
            {buttons}
          </section>
          {isGameOver && <button className='new-game'>New Game</button>}
      </div>
    </main>
  )
}
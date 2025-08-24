import './App.css'
import {languages} from './languages'
import { useState } from 'react'
import {clsx} from 'clsx'
export default function App(){
  const [word, setWord] = useState("react");
  const [guessWord, setGuessWord] = useState([]);

  const wrongGuessCount = guessWord.filter((letter) => (
    !word.includes(letter)
  )).length;
  
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

  function addGuess(letter){
    setGuessWord((prevGuessWord) => (
      prevGuessWord.includes(letter) ? prevGuessWord : [...prevGuessWord, letter]
    ))
  }

  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const buttons = alphabets.split('').map((char) => (
    <button  
    onClick={() => addGuess(char)}
    className = {clsx({right:(word.includes(char) && guessWord.includes(char)), 
    wrong:(guessWord.includes(char) && !word.includes(char))})}>
      {char.toUpperCase()}
    </button>
  ))
  

  return(
    <main className='main-container'>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className='game-status'>
        <h1>You win!</h1>
        <p>Well done! 🎉</p>
      </section>
      <section className='language-container'>
        {langElems}
      </section>
      <section className='word-container'>
        {charElems}
      </section>
      <section className='keyboard-container'>
        {buttons}
      </section>
      <button className='new-game'>New Game</button>
    </main>
  )
}
import './App.css'
import {languages} from './languages'
import { useState } from 'react'
export default function App(){
  const [word, setWord] = useState("react");

  const charElems = word.split('').map((char) => (
    <span>{char.toUpperCase()}</span>
  ))

  const langElems = languages.map((language) => {
    const style = {
      backgroundColor:language.backgroundColor,
      color: language.color
    }
    return (<h2 style={style}>{language.name}</h2>)
  })

  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const buttons = alphabets.split('').map((char) => (
    <button className='key-btn'>{char.toUpperCase()}</button>
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
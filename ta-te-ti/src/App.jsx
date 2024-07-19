
import { useState } from "react"
import confetti from "canvas-confetti"
import Square from "./components/Square"
import {turns} from "./constants.js"
import WinnerModal from "./components/WinnerModal.jsx"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"

function App() {
  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) {
      return JSON.parse(boardFromStorage)
    }else{
      return Array(9).fill(null)
    }
  }
  ) 
  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn')
    if (turnFromStorage) {
      return turnFromStorage
    }else{
      return turns.x
    }
  })
  
  //Null es que no hay un ganador, false es que hay empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  
  const updateBoard = (index) => {
    //Si ya tiene un valor no actualizamos nada
    if (board[index] || winner) {
      return
    } 

    //Actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    //Actualizar turno
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)

    //Guardar partida
    window.localStorage.setItem('board',JSON.stringify(newBoard))
    window.localStorage.setItem('turn',newTurn)

    //Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'> 
      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
        {
          board.map((square,index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <h2>El turno es de:</h2>
        <div className="container">
          <Square isSelected={turn === turns.x}>
            {turns.x}
          </Square>
          <Square isSelected={turn === turns.o}>
            {turns.o}
          </Square>      
        </div>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
      
    </main>
  )
}

export default App

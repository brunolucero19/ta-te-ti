import { winner_combination } from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {
    //Revisamos todas las combinaciones ganadoras para ver si hay ganador
    for (const combination of winner_combination) {
        const [a,b,c] = combination
        if(
            boardToCheck[a] && 
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c] 
        ){
            return boardToCheck[a]
        }
    }
    //Si no hay ganador
    return null
}

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
}
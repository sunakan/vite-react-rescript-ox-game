%%raw(`import './App.css'`)

let renderSquare = i => {
  <button className="square" />
}

let board = {
  let status = "Next player: X"
  <div>
    <div className="status"> {React.string(status)} </div>
    <div className="board-row"> {renderSquare(0)} {renderSquare(1)} {renderSquare(2)} </div>
    <div className="board-row"> {renderSquare(3)} {renderSquare(4)} {renderSquare(5)} </div>
    <div className="board-row"> {renderSquare(6)} {renderSquare(7)} {renderSquare(8)} </div>
  </div>
}

let game = {
  <div className="game">
    <div className="game-board"> board </div>
    <div className="game-info"> {React.string("Hello2")} </div>
  </div>
}

@react.component
let make = () => game

%%raw(`import './App.css'`)

type cell =
  | O
  | X
  | None

module Square = {
  @react.component
  let make = (~value: cell, ~onClick) => {
    let cellString = switch value {
    | None => ""
    | O => "O"
    | X => "X"
    }
    <button className="square" onClick> {React.string(cellString)} </button>
  }
}

module Board = {
  @react.component
  let make = (~squares: array<cell>, ~onClick: int => unit) => {
    let renderSquare = index => <Square value={squares[index]} onClick={_ => onClick(index)} />
    <div>
      <div className="board-row"> {renderSquare(0)} {renderSquare(1)} {renderSquare(2)} </div>
      <div className="board-row"> {renderSquare(3)} {renderSquare(4)} {renderSquare(5)} </div>
      <div className="board-row"> {renderSquare(6)} {renderSquare(7)} {renderSquare(8)} </div>
    </div>
  }
}

module Game = {
  type state = {squares: array<cell>}
  type history = array<state>
  type gameState = {history: history, xIsNext: bool, stepNumber: int}
  let calculateWinner = (squares: array<cell>) => {
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    let win = arr => {
      switch arr {
      | [a, b, c] => squares[a] != None && squares[a] === squares[b] && squares[a] === squares[c]
      | _ => false // ありえない
      }
    }
    Js.Array2.length(Js.Array2.filter(lines, win)) > 0
  }
  @react.component
  let make = () => {
    let (state, setState) = React.useState(_ => {
      history: [{squares: [None, None, None, None, None, None, None, None, None]}],
      xIsNext: true,
      stepNumber: 0,
    })
    let jumpTo = (~step: int) => {
      let history = state.history
      setState(_ => {
        history: history,
        xIsNext: mod(step, 2) === 0,
        stepNumber: step,
      })
    }
    let handleClick = index => {
      let history = Js.Array2.slice(state.history, ~start=0, ~end_=state.stepNumber + 1)
      let current = history[Js.Array2.length(history) - 1]
      let squares = Js.Array2.copy(current.squares)
      if calculateWinner(squares) || squares[index] != None {
        ()
      } else {
        squares[index] = state.xIsNext ? X : O
        setState(_ => {
          history: Js.Array2.concat(history, [{squares: squares}]),
          xIsNext: !state.xIsNext,
          stepNumber: Js.Array2.length(history),
        })
      }
    }
    let history = state.history
    let current = history[state.stepNumber]

    let moves = Js.Array2.mapi(history, (_, move) => {
      let desc = "Go to move #" ++ Js.Int.toString(move)
      <li key={Js.Int.toString(move)}>
        <button onClick={_ => jumpTo(~step=move)}> {React.string(desc)} </button>
      </li>
    })

    let status = if calculateWinner(current.squares) {
      "Winner: " ++ (state.xIsNext ? "O" : "X")
    } else {
      "Next player: " ++ (state.xIsNext ? "X" : "O")
    }

    <div className="game">
      <div className="game-board">
        <Board squares=current.squares onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div> {React.string(status)} </div> <ol> {React.array(moves)} </ol>
      </div>
    </div>
  }
}

@react.component
let make = () => <Game />

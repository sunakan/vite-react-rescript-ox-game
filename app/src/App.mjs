// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Caml_array from "rescript/lib/es6/caml_array.js";

import './App.css'
;

function App$Square(Props) {
  var value = Props.value;
  var onClick = Props.onClick;
  var cellString;
  switch (value) {
    case /* O */0 :
        cellString = "O";
        break;
    case /* X */1 :
        cellString = "X";
        break;
    case /* None */2 :
        cellString = "";
        break;
    
  }
  return React.createElement("button", {
              className: "square",
              onClick: onClick
            }, cellString);
}

function App$Board(Props) {
  var squares = Props.squares;
  var onClick = Props.onClick;
  var renderSquare = function (index) {
    return React.createElement(App$Square, {
                value: Caml_array.get(squares, index),
                onClick: (function (param) {
                    return Curry._1(onClick, index);
                  })
              });
  };
  return React.createElement("div", undefined, React.createElement("div", {
                  className: "board-row"
                }, renderSquare(0), renderSquare(1), renderSquare(2)), React.createElement("div", {
                  className: "board-row"
                }, renderSquare(3), renderSquare(4), renderSquare(5)), React.createElement("div", {
                  className: "board-row"
                }, renderSquare(6), renderSquare(7), renderSquare(8)));
}

function calculateWinner(squares) {
  var lines = [
    [
      0,
      1,
      2
    ],
    [
      3,
      4,
      5
    ],
    [
      6,
      7,
      8
    ],
    [
      0,
      3,
      6
    ],
    [
      1,
      4,
      7
    ],
    [
      2,
      5,
      8
    ],
    [
      0,
      4,
      8
    ],
    [
      2,
      4,
      6
    ]
  ];
  var win = function (arr) {
    if (arr.length !== 3) {
      return false;
    }
    var a = arr[0];
    var b = arr[1];
    var c = arr[2];
    if (Caml_array.get(squares, a) !== /* None */2 && Caml_array.get(squares, a) === Caml_array.get(squares, b)) {
      return Caml_array.get(squares, a) === Caml_array.get(squares, c);
    } else {
      return false;
    }
  };
  return lines.filter(win).length > 0;
}

function App$Game(Props) {
  var match = React.useState(function () {
        return {
                history: [{
                    squares: [
                      /* None */2,
                      /* None */2,
                      /* None */2,
                      /* None */2,
                      /* None */2,
                      /* None */2,
                      /* None */2,
                      /* None */2,
                      /* None */2
                    ]
                  }],
                xIsNext: true,
                stepNumber: 0
              };
      });
  var setState = match[1];
  var state = match[0];
  var history = state.history;
  var current = Caml_array.get(history, state.stepNumber);
  var moves = history.map(function (param, move) {
        var desc = "Go to move #" + move.toString();
        return React.createElement("li", {
                    key: move.toString()
                  }, React.createElement("button", {
                        onClick: (function (param) {
                            var history = state.history;
                            return Curry._1(setState, (function (param) {
                                          return {
                                                  history: history,
                                                  xIsNext: move % 2 === 0,
                                                  stepNumber: move
                                                };
                                        }));
                          })
                      }, desc));
      });
  var status = calculateWinner(current.squares) ? "Winner: " + (
      state.xIsNext ? "O" : "X"
    ) : "Next player: " + (
      state.xIsNext ? "X" : "O"
    );
  return React.createElement("div", {
              className: "game"
            }, React.createElement("div", {
                  className: "game-board"
                }, React.createElement(App$Board, {
                      squares: current.squares,
                      onClick: (function (i) {
                          var history = state.history.slice(0, state.stepNumber + 1 | 0);
                          var current = Caml_array.get(history, history.length - 1 | 0);
                          var squares = current.squares.slice();
                          if (calculateWinner(squares) || Caml_array.get(squares, i) !== /* None */2) {
                            return ;
                          } else {
                            Caml_array.set(squares, i, state.xIsNext ? /* X */1 : /* O */0);
                            return Curry._1(setState, (function (param) {
                                          return {
                                                  history: history.concat([{
                                                          squares: squares
                                                        }]),
                                                  xIsNext: !state.xIsNext,
                                                  stepNumber: history.length
                                                };
                                        }));
                          }
                        })
                    })), React.createElement("div", {
                  className: "game-info"
                }, React.createElement("div", undefined, status), React.createElement("ol", undefined, moves)));
}

function App(Props) {
  return React.createElement(App$Game, {});
}

var make = App;

export {
  make ,
  
}
/*  Not a pure module */

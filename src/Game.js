import React, { Component } from 'react'
import { Loop, Stage, TileMap } from 'react-game-kit'
import Character from './character'
import GameBoard from './gameboard'
import Bomb from './bomb'

class Game extends Component {
  constructor(){
    super()

    this.keys = {}

    this.state = {
      character: {
        x: 1,
        y: 1,
      },
      board: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
    }
  }

  subscribe = (keys) => {
    window.addEventListener('keydown', this.down)
    window.addEventListener('keyup', this.up)

    keys.forEach((key) => {
      this.keys[key] = false
    })
  }

  down = (event) => {
    let keyPressed = event.keyCode
    if (event.keyCode in this.keys) {
      event.preventDefault()
      this.keys[event.keyCode] = true
    }
    this.move(keyPressed)
  }

  isTileValid = (direction) => {
    const { x, y } = this.state.character
    switch (direction) {
      case 'LEFT':
        return this.state.board[y][x-1] === 1 ? true : false
        break;
      case 'RIGHT':
        return this.state.board[y][x+1] === 1 ? true : false
        break;
      case 'UP':
        return this.state.board[y-1][x] === 1 ? true : false
        break;
      case 'DOWN':
        return this.state.board[y+1][x] === 1 ? true : false
        break;
      default:
    }
  }

  move = (key) => {
    console.log(this.state.character)
    switch (key) {
      case 37:
        if(this.isTileValid('LEFT')){
          this.setState({
            character: {
              ...this.state.character,
              x: this.state.character.x - 1,
            }
          })
        }
        break;
      case 39:
        if(this.isTileValid('RIGHT')){
          this.setState({
            character: {
              ...this.state.character,
              x: this.state.character.x + 1,
            }
          })
        }
        break;
      case 38:
        if(this.isTileValid('UP')){
          this.setState({
            character: {
              ...this.state.character,
              y: this.state.character.y - 1,
            }
          })
        }
        break;
      case 40:
        if(this.isTileValid('DOWN')){
          this.setState({
            character: {
              ...this.state.character,
              y: this.state.character.y + 1,
            }
          })
        }
        break;
      case 32:
        // let bomb_cell = document.getElementById(`cell-${2}-${3}`)
        // console.log(bomb_cell)
        // bomb_cell.innerHTML = " "
      default:

    }
  }

  up = (event) => {
    if (event.keyCode in this.keys) {
      event.preventDefault()
      this.keys[event.keyCode] = false
    }
    this.setState({
      character: {
        ...this.state.character,
        characterState: 2,
      }
    })
  }


  componentDidMount(){
    this.subscribe([
     37, 39, 38, 40, 32
   ])
  //  LEFT, RIGHT, UP, DOWN, SPACE
  }

  render(){
    return(
      <div>
        <h1>Hackerman</h1>
        <h3>HACK OR BE HACKED</h3>
        <GameBoard board={this.state.board} character={this.state.character}/>
      </div>
    )
  }
}

export default Game

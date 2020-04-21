<template>
  <div class="root">
    <h2>Enemy Ships</h2>
    <div class="player-board" :class="!setupPhase && 'focus'">
      <div class="board-row" v-for="(row, i) in player1.board.board" :key="`pr${i}`">
        <span
          :id="`pc${i}-${j}`"
          class="board-cell"
          v-for="(cell, j) in row"
          :key="`pc${j}`"
          @click="makeMove($event, i, j)"
        ></span>
      </div>
    </div>

    <div id="messages">
      <div class="message">{{message}}</div>
      <hr />
      <div class="message">{{enemyMessage}}</div>
    </div>

    <h2>Your Ships</h2>
    <div class="enemy-board" :class="setupPhase && 'focus'">
      <div class="board-row" v-for="(row, i) in player2.board.board" :key="`er${i}`">
        <span
          :id="`ec${i}-${j}`"
          class="board-cell"
          :class="hasShip(i, j, 2) && 'set-ship'"
          v-for="(cell, j) in row"
          :key="`ec${j}`"
          @click.left="placeShip($event, i, j, false)"
          @click.right="placeShip($event, i, j, true)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Player from "../scripts/player";
import Gameboard from "../scripts/gameboard";
import { Type } from "../scripts/ship";

@Component
export default class HelloWorld extends Vue {
  public player1: Player;
  public player2: Player;
  public message: string;
  public enemyMessage: string;
  private setupPhase: boolean;
  private shipsPlaced: number;

  constructor() {
    super();
    this.player1 = new Player("Player");
    this.player2 = new Player("Computer", true);
    this.message = "Welcome to Battleship. Begin by placing your Destroyer.";
    this.enemyMessage =
      "Left click to place vertically, right click to place horizontally.";
    this.shipsPlaced = 0;
    this.setupPhase = true;
  }

  beforeMount(): void {
    this.placeShipsRandom(this.player1.board);
    // this.placeShipsRandom(this.player2.board);
  }

  private getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private placeShipsRandom(board: Gameboard): void {
    let ships = 0;
    while (ships !== 5) {
      const vertical = this.getRandomNumber(10) % 2 === 0;
      const x = this.getRandomNumber(vertical ? 9 : 9 - ships);
      const y = this.getRandomNumber(vertical ? 9 - ships : 9);
      if (board.placeShip(ships, x, y, vertical)) {
        ships++;
      }
    }
  }

  private aiMove(): void {
    const [x, y] = this.player2.makeAiMove();
    const hit = this.player2.board.receiveAttack(x, y);
    const target = document.querySelector(`#ec${x}-${y}`);
    target!.textContent = hit ? "O" : "X";
    target!.classList.add(hit ? "ship-hit" : "ship-miss");
    this.enemyMessage = `Your enemy attacks at ${x},${y}. ${
      !hit
        ? "They miss."
        : hit[2]
        ? `They sink your ${hit[1]}.`
        : `They hit your ${hit[1]}.`
    }`;
    if (this.player2.board.allShipsSunk()) {
      this.enemyMessage = "Your enemy sunk all your ships. You lose.";
    }
  }

  public makeMove(e: Event, x: number, y: number): void {
    if (this.setupPhase) {
      return;
    }
    if (!this.player1.board.isIllegalMove(x, y)) {
      const hit = this.player1.board.receiveAttack(x, y);
      (e.target as HTMLElement).textContent = hit ? "O" : "X";
      (e.target as HTMLElement).classList.add(hit ? "ship-hit" : "ship-miss");
      this.message = `You attack at ${x},${y}. ${
        !hit
          ? "You miss."
          : hit[2]
          ? `You sink your enemy's ${hit[1]}.`
          : "You hit one of your enemy's ships."
      }`;
      if (this.player1.board.allShipsSunk()) {
        this.message = "You sunk all your enemy's ships. You win!";
      } else {
        this.aiMove();
      }
    } else {
      console.log("Illegal move: " + [x, y]);
    }
  }

  public placeShip(e: Event, x: number, y: number, vertical: boolean) {
    if (!this.setupPhase) {
      return;
    }
    e.preventDefault();
    if (this.player2.board.placeShip(this.shipsPlaced, x, y, vertical)) {
      this.message = `${Type[this.shipsPlaced]} placed at ${x},${y}.`;
      this.shipsPlaced++;
      if (this.shipsPlaced === 5) {
        this.enemyMessage = "All ships placed. Make your first attack!";
        this.setupPhase = false;
      } else {
        this.enemyMessage = `Now place your ${Type[this.shipsPlaced]}.`;
      }
    }
  }

  public hasShip(x: number, y: number, player: number): boolean {
    return player === 1
      ? !this.player1.board.cellIsEmpty(x, y)
      : !this.player2.board.cellIsEmpty(x, y);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.root {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 400px 200px 400px;
  grid-template-rows: auto auto;
  place-items: center center;
  place-content: center center;
  #messages {
    grid-row: 2 / span 2;
    hr {
      border-top: 1px solid black;
    }
  }
}

.focus {
  box-shadow: 0 0 25px lightblue, 0 0 5px blue;
}

.message {
  margin-top: 10px;
}

.board-row {
  display: grid;
  grid-template-columns: repeat(10, 32px);
  place-items: center center;
  place-content: center center;
}
.board-cell {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  background-color: lightblue;
}

.unknown {
  background-color: lightblue;
}
.set-ship {
  background-color: gray;
}
.ship-hit {
  background-color: green;
}
.ship-miss {
  background-color: red;
}
</style>

/* eslint-disable */
import Ship from "./ship";

export default class Gameboard {
    private board: number[][];
    private hitMap: boolean[][];
    private ships: Ship[];

    constructor(dimensions: number = 10) {
        this.board = new Array(dimensions)
            .fill(null)
            .map(x => new Array(dimensions).fill(-1));
        this.hitMap = new Array(dimensions)
            .fill(null)
            .map(x => new Array(dimensions).fill(false));
        this.ships = new Array();
    }

    public getBoard: () => number[][] = () => this.board;

    public cellIsEmpty(x: number, y: number): boolean {
        return this.board[x][y] === -1;
    }

    private canPlaceShip(ship: Ship): boolean {
        return ship.getPosition()
            .map(([x, y]) => this.cellIsEmpty(x, y))
            .every(e => e !== false);
    }

    public placeShip(type: number, x: number, y: number, vertical: boolean = false): boolean {
        const newShip = new Ship(type);
        newShip.placeShip(x, y, vertical);
        if (!this.canPlaceShip(newShip)) {
            return false;
        }
        const pos = newShip.getPosition();
        newShip.getPosition().forEach(([x, y]) => {
            this.board[x][y] = this.ships.length;
        });
        this.ships.push(newShip);
        return true;
    }

    public isIllegalMove(x: number, y: number): boolean {
        return this.hitMap[x][y];
    }

    public recordMove(x: number, y: number): void {
        this.hitMap[x][y] = true;
    }

    public receiveAttack(x: number, y: number): [boolean, string, boolean] {
        this.hitMap[x][y] = true;
        return this.ships[this.board[x][y]]?.hit(x, y) ?? false;
    }

    public allShipsSunk(): boolean {
        return this.ships.length > 0
            && this.ships.every(x => x.isSunk());
    }
}
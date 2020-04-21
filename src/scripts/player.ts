/* eslint-disable */
import Gameboard from "../scripts/gameboard";

export default class Player {
    public name: string;
    public board: Gameboard;
    private ai: boolean;

    constructor(name: string, ai: boolean = false) {
        this.name = name;
        this.board = new Gameboard();
        this.ai = ai;
    }

    private getRandomMove(): [number, number] {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        return [x, y];
    }

    public makeAiMove(): [number, number] {
        let [x, y] = this.getRandomMove();
        while (this.board.isIllegalMove(x, y)) {
            [x, y] = this.getRandomMove();
        }
        return [x, y];
    }
}
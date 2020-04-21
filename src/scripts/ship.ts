/* eslint-disable */

export default class Ship {
    private static shipTypes: Map<number, string> = new Map<number, string>([
        [1, "Patrol Boat"],
        [2, "Destroyer"],
        [3, "Cruiser"],
        [4, "Battleship"],
        [5, "Carrier"]
    ]);
    private length: number;
    private hits: boolean[];
    private sunk: boolean;
    private position: [number, number][];

    constructor(length: number) {
        this.length = length;
        this.hits = new Array(this.length).fill(false);
        this.sunk = false;
        this.position = new Array(this.length).fill([0, 0]);
    }

    public getLength: () => number = () => this.length;
    public getType: () => string = () => Ship.shipTypes.get(this.length)!;
    public getHits: () => boolean[] = () => this.hits;
    public getPosition: () => [number, number][] = () => this.position;
    public isSunk: () => boolean = () => this.sunk;

    public placeShip(x: number, y: number, vertical: boolean = false): void {
        for (let i = 0; i !== this.length; i++) {
            this.position[i] = vertical ? [x, y++] : [x++, y];
        }
    }

    public hit(x: number, y: number): [boolean, string, boolean] {
        const i = this.position.findIndex(coords =>
            JSON.stringify(coords) === JSON.stringify([x, y]));
        if (i !== -1) {
            this.hits[i] = true;
            if (this.hits.indexOf(false) === -1) {
                this.sunk = true;
            }
            return [true, this.getType(), this.sunk];
        }
        return [false, "", this.sunk];
    }
}
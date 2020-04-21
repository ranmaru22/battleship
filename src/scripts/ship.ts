/* eslint-disable */
export enum Type { Destroyer, Cruiser, Submarine, Battleship, Carrier }

export class Ship {
    private length: number;
    private type: string;
    private hits: boolean[];
    private sunk: boolean;
    private position: [number, number][];

    constructor(type: Type) {
        switch (type) {
            case Type.Destroyer:
                this.length = 2;
                this.type = "Destroyer";
                break;
            case Type.Cruiser:
                this.length = 3;
                this.type = "Cruiser";
                break;
            case Type.Submarine:
                this.length = 3;
                this.type = "Submarine";
                break;
            case Type.Battleship:
                this.length = 4;
                this.type = "Battleship";
                break;
            case Type.Carrier:
                this.length = 5;
                this.type = "Carrier";
                break;
        }
        this.hits = new Array(this.length).fill(false);
        this.sunk = false;
        this.position = new Array(this.length).fill([0, 0]);
    }

    public getLength: () => number = () => this.length;
    public getType: () => string = () => this.type;
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
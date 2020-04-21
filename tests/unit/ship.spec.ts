import { Ship, Type } from '../../src/scripts/ship';

describe("Ship.ts", () => {
    it("creates the ship and initializes its members properly", () => {
        const sampleShip = new Ship(Type.Battleship);
        expect(sampleShip.getLength()).toEqual(4);
        expect(sampleShip.getHits()).not.toContain(true);
        expect(sampleShip.isSunk()).toBe(false);
    });
    describe("placeShip", () => {
        it("places the ship correctly", () => {
            const sampleShip = new Ship(Type.Battleship);
            sampleShip.placeShip(0, 0);
            const expected = [[0, 0], [1, 0], [2, 0], [3, 0]];
            expect(sampleShip.getPosition()).toEqual(expected);
        });
        it("places the ship horizontally correctly", () => {
            const sampleShip = new Ship(Type.Battleship);
            sampleShip.placeShip(0, 0, true);
            const expected = [[0, 0], [0, 1], [0, 2], [0, 3]];
            expect(sampleShip.getPosition()).toEqual(expected);
        });
    });
    describe("hit", () => {
        it("recognizes a hit and saves it", () => {
            const sampleShip = new Ship(Type.Battleship);
            sampleShip.placeShip(0, 0);
            expect(sampleShip.hit(2, 0)[0]).toBe(true);
            expect(sampleShip.getHits()).toContain(true);
        });
        it("marks a ship as sunk when all its positions were hit", () => {
            const sampleShip = new Ship(Type.Destroyer);
            sampleShip.placeShip(0, 0);
            expect(sampleShip.hit(0, 0)[0]).toBe(true);
            expect(sampleShip.hit(1, 0)[0]).toBe(true);
            expect(sampleShip.isSunk()).toBe(true);
        });
        it("recognizes a miss", () => {
            const sampleShip = new Ship(Type.Battleship);
            sampleShip.placeShip(0, 0);
            expect(sampleShip.hit(2, 5)[0]).toBe(false);
            expect(sampleShip.getHits()).not.toContain(true);
        });
    });
});
import Gameboard from '../../src/scripts/gameboard';
import { Type } from '../../src/scripts/ship';

describe("Gameboard.ts", () => {
    it("creates the board and initializes its members properly", () => {
        const sampleBoard = new Gameboard();
        expect(sampleBoard.getBoard()).toHaveLength(10);
        expect(sampleBoard.getBoard()[0]).toHaveLength(10);
    });

    it("places a ship correctly", () => {
        const sampleBoard = new Gameboard();
        expect(sampleBoard.placeShip(Type.Destroyer, 0, 0)).toBe(true);
        expect(sampleBoard.getBoard()[0][0]).not.toEqual(-1);
    });

    it("recognizes invalid ship placement", () => {
        const sampleBoard = new Gameboard();
        expect(sampleBoard.placeShip(Type.Destroyer, 0, 0)).toBe(true);
        expect(sampleBoard.placeShip(Type.Destroyer, 0, 0)).toBe(false);
    });

    describe("receiveAttack", () => {
        it("recognizes a successfull attack", () => {
            const sampleBoard = new Gameboard();
            sampleBoard.placeShip(Type.Destroyer, 0, 0);
            expect(sampleBoard.receiveAttack(0, 0)[0]).toBe(true);
        });
        it("recognizes a miss", () => {
            const sampleBoard = new Gameboard();
            sampleBoard.placeShip(Type.Destroyer, 0, 0);
            expect(sampleBoard.receiveAttack(1, 1)).toBe(false);
        });

    });

    it("reports correctly whether all ships are sunk", () => {
        const sampleBoard = new Gameboard();
        expect(sampleBoard.allShipsSunk()).toBe(false);
        sampleBoard.placeShip(Type.Destroyer, 0, 0);
        expect(sampleBoard.allShipsSunk()).toBe(false);
        sampleBoard.receiveAttack(0, 0);
        expect(sampleBoard.allShipsSunk()).toBe(false);
        sampleBoard.receiveAttack(1, 0);
        expect(sampleBoard.allShipsSunk()).toBe(true);
    });

});
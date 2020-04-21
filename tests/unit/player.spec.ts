import Player from '../../src/scripts/player';

describe("Player.ts", () => {
    it("creates the player and initializes its members properly", () => {
        const samplePlayer = new Player("Foobar");
        expect(samplePlayer.name).toEqual("Foobar");
        expect(samplePlayer.board).toBeDefined();
    });

    describe("AI play", () => {
        it("makes a move when asked", () => {
            const samplePlayer = new Player("Computer", true);
            const [x, y] = samplePlayer.makeAiMove();
            expect(samplePlayer.board.isIllegalMove(x, y)).toBe(false);
        });
        it("doesn't make the same move twice", () => {
            const samplePlayer = new Player("Computer", true);
            const [x, y] = samplePlayer.makeAiMove();
            samplePlayer.board.recordMove(x, y);
            const [x2, y2] = samplePlayer.makeAiMove();
            expect(x !== x2 || y !== y2).toBe(true);
        });
    });
});
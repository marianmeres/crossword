import {Board} from '../Board';
import Crossword from '../Crossword';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('Board.normalizeCoordinatesBetween', () => {


    it('works for same axis', () => {
        //
        let data2 = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/sample2.json')));
        let b = new Board(data2.board);

        expect(
            b.normalizeCoordinatesBetween(0, 0, 3, 0)
        ).toEqual([
            [0, 0], [1, 0], [2, 0], [3, 0]
        ]);

        expect(
            b.normalizeCoordinatesBetween(0, 2, 3, 2)
        ).toEqual([
            [0, 2], [1, 2], [2, 2], [3, 2]
        ]);

        expect(
            b.normalizeCoordinatesBetween(3, 2, 3, 2)
        ).toEqual([
            [3, 2]
        ]);

        expect(
            b.normalizeCoordinatesBetween(3, 2, 3, 0)
        ).toEqual([
            [3, 2], [3, 1], [3, 0]
        ]);

        expect(
            b.normalizeCoordinatesBetween(0, 0, 0, 3)
        ).toEqual([
            [0, 0], [0, 1], [0, 2], [0, 3]
        ]);

        expect(
            b.normalizeCoordinatesBetween(3, 0, 3, 3)
        ).toEqual([
            [3, 0], [3, 1], [3, 2], [3, 3]
        ]);
    });

    it('works for exact diagonal', () => {
        let data2 = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/sample2.json')));
        let b = new Board(data2.board);

        expect(
            b.normalizeCoordinatesBetween(0, 0, 3, 3)
        ).toEqual([
            [0, 0], [1, 1], [2, 2], [3, 3]
        ]);

        expect(
            b.normalizeCoordinatesBetween(3, 3, 0, 0)
        ).toEqual([
            [3, 3], [2, 2], [1, 1], [0, 0]
        ]);
    });

    it('works for all other', () => {
        let data2 = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/sample2.json')));
        let b = new Board(data2.board);

        expect(
            b.normalizeCoordinatesBetween(0, 0, 3, 1)
        ).toEqual([
            [0, 0], [1, 0], [2, 0], [3, 0]
        ]);

        expect(
            b.normalizeCoordinatesBetween(0, 0, 1, 3)
        ).toEqual([
            [0, 0], [0, 1], [0, 2], [0, 3]
        ]);
    });
});


import {Board} from '../Board';
import Crossword from '../Crossword';
import Word from '../Word';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('Brute force: Board.getWord', () => {

    let data = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/sample.json')));
    let b = new Board(data.board);

    it('sanity', () => {
        assert.strictEqual(3, b.sizeX);
        assert.strictEqual(3, b.sizeY);
    });

    it('DIRECTION_RIGHT', () => {
        assert.equal('car', b.getWord(0, 0, 3, Crossword.DIRECTION_RIGHT).toString());
        assert.equal('car', b.getWord(0, 0, 3, Crossword.DIRECTION_RIGHT, 'car').toString());
        assert.equal(null, b.getWord(1, 0, 3, Crossword.DIRECTION_RIGHT));
        assert.equal('ar', b.getWord(1, 0, 2, Crossword.DIRECTION_RIGHT).toString());
        assert.equal('tim', b.getWord(0, 2, 3, Crossword.DIRECTION_RIGHT).toString());
        assert.equal(null, b.getWord(0, 2, 3, Crossword.DIRECTION_RIGHT, 'foo')); // with hint
    });

    it('DIRECTION_LEFT', () => {
        assert.equal('rac', b.getWord(2, 0, 3, Crossword.DIRECTION_LEFT).toString());
        assert.equal('rac', b.getWord(2, 0, 3, Crossword.DIRECTION_LEFT, 'rac').toString());
        assert.equal('ra', b.getWord(2, 0, 2, Crossword.DIRECTION_LEFT).toString());
        assert.equal(null, b.getWord(2, 0, 3, Crossword.DIRECTION_LEFT, 'foo'));
    });

    it('DIRECTION_BOTTOM', () => {
        assert.equal('cat', b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM).toString());
        assert.equal('cat', b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM, 'cat').toString());
        assert.equal('ram', b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM).toString());
        assert.equal(null, b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM, 'foo')); // with hint
    });

    it('DIRECTION_TOP', () => {
        assert.equal('tac', b.getWord(0, 2, 3, Crossword.DIRECTION_TOP).toString());
        assert.equal('tac', b.getWord(0, 2, 3, Crossword.DIRECTION_TOP, 'tac').toString());
        assert.equal('ia', b.getWord(1, 2, 2, Crossword.DIRECTION_TOP).toString());
        assert.equal(null, b.getWord(1, 2, 2, Crossword.DIRECTION_TOP, 'foo')); // with hint
    });

    it('DIRECTION_TOP_RIGHT', () => {
        assert.equal('tar', b.getWord(0, 2, 3, Crossword.DIRECTION_TOP_RIGHT).toString());
        assert.equal('tar', b.getWord(0, 2, 3, Crossword.DIRECTION_TOP_RIGHT, 'tar').toString());
        assert.equal('aa', b.getWord(0, 1, 2, Crossword.DIRECTION_TOP_RIGHT).toString());
        assert.equal('ia', b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_RIGHT).toString());
        assert.equal(null, b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_RIGHT, 'foo'));
        assert.equal(null, b.getWord(1, 2, 20, Crossword.DIRECTION_TOP_RIGHT));
        assert.equal(null, b.getWord(2, 1, 2, Crossword.DIRECTION_TOP_RIGHT));
    });

    it('DIRECTION_TOP_LEFT', () => {
        assert.equal('mac', b.getWord(2, 2, 3, Crossword.DIRECTION_TOP_LEFT).toString());
        assert.equal('mac', b.getWord(2, 2, 3, Crossword.DIRECTION_TOP_LEFT, 'mac').toString());
        assert.equal('ia', b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_LEFT).toString());
        assert.equal(null, b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_LEFT, 'foo'));
        assert.equal(null, b.getWord(0, 1, 3, Crossword.DIRECTION_TOP_LEFT));
        assert.equal(null, b.getWord(0, 1, 2, Crossword.DIRECTION_TOP_LEFT));
    });

    it('DIRECTION_BOTTOM_RIGHT', () => {
        assert.equal('cam', b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM_RIGHT).toString());
        assert.equal('cam', b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM_RIGHT, 'cam').toString());
        assert.equal('am', b.getWord(1, 1, 2, Crossword.DIRECTION_BOTTOM_RIGHT).toString());
        assert.equal(null, b.getWord(2, 1, 2, Crossword.DIRECTION_BOTTOM_RIGHT));
    });

    it('DIRECTION_BOTTOM_LEFT', () => {
        assert.equal('rat', b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM_LEFT).toString());
        assert.equal('rat', b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM_LEFT, 'rat').toString());
        assert.equal('ai', b.getWord(2, 1, 2, Crossword.DIRECTION_BOTTOM_LEFT).toString());
        assert.equal(null, b.getWord(0, 1, 2, Crossword.DIRECTION_BOTTOM_LEFT));
    });
});

describe('Word', () => {
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/sample.json')));
    let b = new Board(data.board);

    it('coordinates DIRECTION_RIGHT', () => {
        let word = b.getWord(0, 0, 3, Crossword.DIRECTION_RIGHT);
        expect(word.coordinates).toEqual([ [0, 0], [1, 0], [2, 0]]);
        expect(word.direction).toEqual(Crossword.DIRECTION_RIGHT);

        // tar
        expect(
            b.getWord(0, 2, 3, Crossword.DIRECTION_TOP_RIGHT).direction
        ).toEqual(Crossword.DIRECTION_TOP_RIGHT);
    });

    it('coordinates DIRECTION_LEFT', () => {
        // rac
        expect(
            b.getWord(2, 0, 3, Crossword.DIRECTION_LEFT).direction
        ).toEqual(Crossword.DIRECTION_LEFT);
    });

    it('coordinates DIRECTION_BOTTOM', () => {
        // cat
        expect(
            b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM).direction
        ).toEqual(Crossword.DIRECTION_BOTTOM);
    });

    it('coordinates DIRECTION_TOP', () => {
        // tac
        expect(
            b.getWord(0, 2, 3, Crossword.DIRECTION_TOP).direction
        ).toEqual(Crossword.DIRECTION_TOP);
    });

    it('coordinates DIRECTION_TOP_RIGHT', () => {
        // tar
        expect(
            b.getWord(0, 2, 3, Crossword.DIRECTION_TOP_RIGHT).direction
        ).toEqual(Crossword.DIRECTION_TOP_RIGHT);
    });

    it('coordinates DIRECTION_TOP_LEFT', () => {
        // mac
        expect(
            b.getWord(2, 2, 3, Crossword.DIRECTION_TOP_LEFT).direction
        ).toEqual(Crossword.DIRECTION_TOP_LEFT);
    });

    it('coordinates DIRECTION_BOTTOM_RIGHT', () => {
        // cam
        expect(
            b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM_RIGHT).direction
        ).toEqual(Crossword.DIRECTION_BOTTOM_RIGHT);
    });

    it('coordinates DIRECTION_BOTTOM_LEFT', () => {
        // rat
        expect(
            b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM_LEFT).direction
        ).toEqual(Crossword.DIRECTION_BOTTOM_LEFT);
    });

});

describe('Mark word', () => {
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/sample.json')));
    let b = new Board(data.board);

    it('returns false if word is not found', () => {
        let result = b.markWord(new Word(['a', 'a'], [[0, 0], [0, 1]]));
        expect(result).toBeFalsy();
    });

    it('it works when word is found', () => {
        let result = b.markWord(b.getWord(0, 0, 3, Crossword.DIRECTION_RIGHT));
        expect(result).toBeTruthy();

        b.markWord(b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM));

        // tieto dve maju rovnake marky
        b.markWord(b.find('mac'));
        b.markWord(b.find('cam'));

        let marks = b.marks;

        expect(marks.car).toBeInstanceOf(Word);
        expect(marks.cat).toBeInstanceOf(Word);
        expect(marks.cam).toBeInstanceOf(Word);
        expect(marks.mac).toBeInstanceOf(Word);

        let coords = b.getAllMarkedCoordinates();
        expect(coords).toEqual([
            [ 1, 1, 1 ],
            [ 1, 1, 0 ],
            [ 1, 0, 1 ]
        ]);
    });

});
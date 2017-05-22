"use strict";
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Board = require('../dist/js/crossword/Board').Board;
const Crossword = require('../dist/js/crossword/Crossword').Crossword;

module.exports = () => {

    let data = JSON.parse(fs.readFileSync('../data/sample.json'));
    let b = new Board(data.board);

    assert.strictEqual(3, b.sizeX);
    assert.strictEqual(3, b.sizeY);

    // RIGHT /////////////////////////////////////////////////////////////////////////
    assert.equal('car', b.getWord(0, 0, 3, Crossword.DIRECTION_RIGHT).toString());
    assert.equal('car', b.getWord(0, 0, 3, Crossword.DIRECTION_RIGHT, 'car').toString());
    assert.equal(null, b.getWord(1, 0, 3, Crossword.DIRECTION_RIGHT));
    assert.equal('ar', b.getWord(1, 0, 2, Crossword.DIRECTION_RIGHT).toString());
    assert.equal('tim', b.getWord(0, 2, 3, Crossword.DIRECTION_RIGHT).toString());
    assert.equal(null, b.getWord(0, 2, 3, Crossword.DIRECTION_RIGHT, 'foo')); // with hint

    // LEFT //////////////////////////////////////////////////////////////////////////
    assert.equal('rac', b.getWord(2, 0, 3, Crossword.DIRECTION_LEFT).toString());
    assert.equal('rac', b.getWord(2, 0, 3, Crossword.DIRECTION_LEFT, 'rac').toString());
    assert.equal('ra', b.getWord(2, 0, 2, Crossword.DIRECTION_LEFT).toString());
    assert.equal(null, b.getWord(2, 0, 3, Crossword.DIRECTION_LEFT, 'foo'));

    // BOTTOM ////////////////////////////////////////////////////////////////////////
    assert.equal('cat', b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM).toString());
    assert.equal('cat', b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM, 'cat').toString());
    assert.equal('ram', b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM).toString());
    assert.equal(null, b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM, 'foo')); // with hint

    // TOP ///////////////////////////////////////////////////////////////////////////
    assert.equal('tac', b.getWord(0, 2, 3, Crossword.DIRECTION_TOP).toString());
    assert.equal('tac', b.getWord(0, 2, 3, Crossword.DIRECTION_TOP, 'tac').toString());
    assert.equal('ia', b.getWord(1, 2, 2, Crossword.DIRECTION_TOP).toString());
    assert.equal(null, b.getWord(1, 2, 2, Crossword.DIRECTION_TOP, 'foo')); // with hint

    // TOP RIGHT /////////////////////////////////////////////////////////////////////
    assert.equal('tar', b.getWord(0, 2, 3, Crossword.DIRECTION_TOP_RIGHT).toString());
    assert.equal('tar', b.getWord(0, 2, 3, Crossword.DIRECTION_TOP_RIGHT, 'tar').toString());
    assert.equal('aa', b.getWord(0, 1, 2, Crossword.DIRECTION_TOP_RIGHT).toString());
    assert.equal('ia', b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_RIGHT).toString());
    assert.equal(null, b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_RIGHT, 'foo'));
    assert.equal(null, b.getWord(1, 2, 20, Crossword.DIRECTION_TOP_RIGHT));
    assert.equal(null, b.getWord(2, 1, 2, Crossword.DIRECTION_TOP_RIGHT));

    // TOP LEFT //////////////////////////////////////////////////////////////////////
    assert.equal('mac', b.getWord(2, 2, 3, Crossword.DIRECTION_TOP_LEFT).toString());
    assert.equal('mac', b.getWord(2, 2, 3, Crossword.DIRECTION_TOP_LEFT, 'mac').toString());
    assert.equal('ia', b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_LEFT).toString());
    assert.equal(null, b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_LEFT, 'foo'));
    assert.equal(null, b.getWord(0, 1, 3, Crossword.DIRECTION_TOP_LEFT));
    assert.equal(null, b.getWord(0, 1, 2, Crossword.DIRECTION_TOP_LEFT));

    // BOTTOM RIGHT //////////////////////////////////////////////////////////////////
    assert.equal('cam', b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM_RIGHT).toString());
    assert.equal('cam', b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM_RIGHT, 'cam').toString());
    assert.equal('am', b.getWord(1, 1, 2, Crossword.DIRECTION_BOTTOM_RIGHT).toString());
    assert.equal(null, b.getWord(2, 1, 2, Crossword.DIRECTION_BOTTOM_RIGHT));

    // BOTTOM LEFT ///////////////////////////////////////////////////////////////////
    assert.equal('rat', b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM_LEFT).toString());
    assert.equal('rat', b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM_LEFT, 'rat').toString());
    assert.equal('ai', b.getWord(2, 1, 2, Crossword.DIRECTION_BOTTOM_LEFT).toString());
    assert.equal(null, b.getWord(0, 1, 2, Crossword.DIRECTION_BOTTOM_LEFT));

    //
    console.log(`OK (${path.basename(__filename)})`);
};

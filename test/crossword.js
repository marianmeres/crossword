
const fs = require('fs');
const assert = require('assert');
const Board = require('../dist/js/crossword/Board').Board;
const Crossword = require('../dist/js/crossword/Crossword').Crossword;

//let data = JSON.parse(fs.readFileSync('../data/sample.json'));
let data = JSON.parse(fs.readFileSync('../data/sample.json'));
let b = new Board(data.board);

//
assert.strictEqual(3, b.sizeX);
assert.strictEqual(3, b.sizeY);

// RIGHT /////////////////////////////////////////////////////////////////////////
assert.equal('car', b.getWord(0, 0, 3, Crossword.DIRECTION_RIGHT).toString());
assert.equal(null, b.getWord(1, 0, 3, Crossword.DIRECTION_RIGHT));
assert.equal('ar', b.getWord(1, 0, 2, Crossword.DIRECTION_RIGHT).toString());
assert.equal('tim', b.getWord(0, 2, 3, Crossword.DIRECTION_RIGHT).toString());
assert.equal(null, b.getWord(0, 2, 3, Crossword.DIRECTION_RIGHT, 'foo')); // with hint

// LEFT //////////////////////////////////////////////////////////////////////////
assert.equal('rac', b.getWord(2, 0, 3, Crossword.DIRECTION_LEFT).toString());
assert.equal('ra', b.getWord(2, 0, 2, Crossword.DIRECTION_LEFT).toString());
assert.equal(null, b.getWord(2, 0, 3, Crossword.DIRECTION_LEFT, 'foo'));

// BOTTOM ////////////////////////////////////////////////////////////////////////
assert.equal('cat', b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM).toString());
assert.equal('ram', b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM).toString());
assert.equal(null, b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM, 'foo')); // with hint

// TOP ///////////////////////////////////////////////////////////////////////////
assert.equal('tac', b.getWord(0, 2, 3, Crossword.DIRECTION_TOP).toString());
assert.equal('ia', b.getWord(1, 2, 2, Crossword.DIRECTION_TOP).toString());
assert.equal(null, b.getWord(1, 2, 2, Crossword.DIRECTION_TOP, 'foo')); // with hint

// TOP RIGHT /////////////////////////////////////////////////////////////////////
assert.equal('tar', b.getWord(0, 2, 3, Crossword.DIRECTION_TOP_RIGHT).toString());
assert.equal('aa', b.getWord(0, 1, 2, Crossword.DIRECTION_TOP_RIGHT).toString());
assert.equal('ia', b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_RIGHT).toString());
assert.equal(null, b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_RIGHT, 'foo'));
assert.equal(null, b.getWord(1, 2, 20, Crossword.DIRECTION_TOP_RIGHT));

// TOP LEFT //////////////////////////////////////////////////////////////////////
assert.equal('mac', b.getWord(2, 2, 3, Crossword.DIRECTION_TOP_LEFT).toString());
assert.equal('ia', b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_LEFT).toString());
assert.equal(null, b.getWord(1, 2, 2, Crossword.DIRECTION_TOP_LEFT, 'foo'));

// BOTTOM RIGHT //////////////////////////////////////////////////////////////////
assert.equal('cam', b.getWord(0, 0, 3, Crossword.DIRECTION_BOTTOM_RIGHT).toString());
assert.equal('am', b.getWord(1, 1, 2, Crossword.DIRECTION_BOTTOM_RIGHT).toString());

// BOTTOM LEFT ///////////////////////////////////////////////////////////////////
assert.equal('rat', b.getWord(2, 0, 3, Crossword.DIRECTION_BOTTOM_LEFT).toString());
assert.equal('ai', b.getWord(2, 1, 2, Crossword.DIRECTION_BOTTOM_LEFT).toString());

let found = b.find('car');
console.log(found);


// sample.json
data2 = JSON.parse(fs.readFileSync('../data/sample2.json'));
b2 = new Board(data2.board);

// see Osemsmerovka.jpg
assert.equal('bandurky', b2.getWord(1, 2, 8, Crossword.DIRECTION_BOTTOM).toString());

//

found = b2.find('bandurky');
console.log(found);


//
console.log("OK");
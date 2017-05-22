"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crossword_1 = require("./Crossword");
var Word_1 = require("./Word");
var Board = (function () {
    /**
     * @param _board
     */
    function Board(_board) {
        this._board = _board;
        this._sizeX = 0;
        this._sizeY = 0;
        this._meta = [];
        this.counter = 0;
        this._sizeY = this._board.length;
        for (var y = 0; y < this._board.length; y++) {
            this._sizeX = Math.max(this._sizeX, this._board[y].length);
        }
        for (var y = 0; y < this._board.length; y++) {
            var row = this._board[y];
            this._meta[y] = this._meta[y] || [];
            for (var x = 0; x < this._sizeX; x++) {
                this._meta[y][x] = {};
                // fill x gaps with nulls, so we have normalized x length across the whole matrix
                if (this._board[y][x] === void (0)) {
                    this._board[y][x] = null;
                }
            }
            // for (let x = row.length; x < this._sizeX; x++) {
            //     this._board[y][x] = null;
            // }
        }
    }
    Object.defineProperty(Board.prototype, "sizeX", {
        get: function () {
            return this._sizeX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "sizeY", {
        get: function () {
            return this._sizeY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "board", {
        // quick and dirty internal data clone
        get: function () {
            return JSON.parse(JSON.stringify(this._board));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Brute force lookup (public api)
     * @param word
     * @returns {any}
     */
    Board.prototype.find = function (word) {
        // word must be at least 2 chars long
        if (!word.length || word.length < 2)
            return null;
        if (word.length > this.sizeX && word.length > this.sizeY)
            return null;
        var directions = [
            Crossword_1.Crossword.DIRECTION_TOP,
            Crossword_1.Crossword.DIRECTION_TOP_RIGHT,
            Crossword_1.Crossword.DIRECTION_RIGHT,
            Crossword_1.Crossword.DIRECTION_BOTTOM_RIGHT,
            Crossword_1.Crossword.DIRECTION_BOTTOM,
            Crossword_1.Crossword.DIRECTION_BOTTOM_LEFT,
            Crossword_1.Crossword.DIRECTION_LEFT,
            Crossword_1.Crossword.DIRECTION_TOP_LEFT,
        ];
        for (var x = 0; x < this.sizeX; x++) {
            for (var y = 0; y < this.sizeY; y++) {
                for (var i = 0; i < directions.length; i++) {
                    var direction = directions[i];
                    this.counter++;
                    //console.log(x, y, word.length, direction, word);
                    // if there should be multiple matches, first always wins...
                    var found = this.getWord(x, y, word.length, direction, word);
                    if (found)
                        return found;
                }
            }
        }
        return null;
    };
    /**
     * direct matrix lookup based on params
     * @param startX
     * @param startY
     * @param length
     * @param direction
     * @param expectedMatch
     * @returns {any}
     */
    Board.prototype.getWord = function (startX, startY, length, direction, expectedMatch) {
        if (startY >= this.sizeY)
            throw new Error("Invalid start y (expected 0 - " + this.sizeY + ")");
        if (startX >= this.sizeX)
            throw new Error("Invalid start x (expected 0 - " + this.sizeX + ")");
        var _escRgx = function (string) {
            return (string + '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        };
        // early skip dead ends (if hint provided)
        var _substrMatch = function (chars, expected) {
            if (!expected)
                return true;
            return ((new RegExp("^" + _escRgx(chars.join("")), 'i')).test(expected));
        };
        var coordinates = [];
        var chars = [];
        var y, x;
        switch (direction) {
            case Crossword_1.Crossword.DIRECTION_RIGHT:
                y = startY;
                for (var x_1 = startX; x_1 < this._sizeX; x_1++) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x_1]);
                        coordinates.push([x_1, y]);
                        if (!_substrMatch(chars, expectedMatch))
                            return null;
                    }
                }
                break;
            case Crossword_1.Crossword.DIRECTION_LEFT:
                y = startY;
                for (var x_2 = startX; x_2 >= 0; x_2--) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x_2]);
                        coordinates.push([x_2, y]);
                        if (!_substrMatch(chars, expectedMatch))
                            return null;
                    }
                }
                break;
            case Crossword_1.Crossword.DIRECTION_BOTTOM:
                x = startX;
                for (var y_1 = startY; y_1 < this._sizeY; y_1++) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y_1][x]);
                        coordinates.push([x, y_1]);
                        if (!_substrMatch(chars, expectedMatch))
                            return null;
                    }
                }
                break;
            case Crossword_1.Crossword.DIRECTION_TOP:
                x = startX;
                for (var y_2 = startY; y_2 >= 0; y_2--) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y_2][x]);
                        coordinates.push([x, y_2]);
                        if (!_substrMatch(chars, expectedMatch))
                            return null;
                    }
                }
                break;
            case Crossword_1.Crossword.DIRECTION_TOP_RIGHT:
                for (var x_3 = startX; x_3 < this._sizeX; x_3++) {
                    for (var y_3 = startY; y_3 >= 0; y_3--) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y_3][x_3]);
                            coordinates.push([x_3, y_3]);
                            if (!_substrMatch(chars, expectedMatch))
                                return null;
                        }
                        if (++x_3 >= this._sizeX)
                            break;
                    }
                }
                break;
            case Crossword_1.Crossword.DIRECTION_TOP_LEFT:
                for (var x_4 = startX; x_4 >= 0; x_4--) {
                    for (var y_4 = startY; y_4 >= 0; y_4--) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y_4][x_4]);
                            coordinates.push([x_4, y_4]);
                            if (!_substrMatch(chars, expectedMatch))
                                return null;
                        }
                        if (--x_4 < 0)
                            break;
                    }
                }
                break;
            case Crossword_1.Crossword.DIRECTION_BOTTOM_RIGHT:
                for (var x_5 = startX; x_5 < this._sizeX; x_5++) {
                    for (var y_5 = startY; y_5 < this._sizeY; y_5++) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y_5][x_5]);
                            coordinates.push([x_5, y_5]);
                            if (!_substrMatch(chars, expectedMatch))
                                return null;
                        }
                        if (++x_5 >= this._sizeX)
                            break;
                    }
                }
                break;
            case Crossword_1.Crossword.DIRECTION_BOTTOM_LEFT:
                for (var x_6 = startX; x_6 >= 0; x_6--) {
                    for (var y_6 = startY; y_6 < this._sizeY; y_6++) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y_6][x_6]);
                            coordinates.push([x_6, y_6]);
                            if (!_substrMatch(chars, expectedMatch))
                                return null;
                        }
                        if (--x_6 < 0)
                            break;
                    }
                }
                break;
            default:
                throw new Error("Unexpected direction " + direction);
        }
        // if we had a specified length and it doesnt match, act as if not found
        if (length && chars.length !== length) {
            return null;
        }
        return new Word_1.Word(coordinates, chars, direction);
    };
    return Board;
}());
exports.Board = Board;

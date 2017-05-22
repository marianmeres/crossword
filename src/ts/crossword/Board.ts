
import {Crossword} from "./Crossword";
import {Word} from "./Word";



export class Board {

    protected _sizeX:number = 0;
    protected _sizeY:number = 0;

    protected _meta:any[][] = [];

    public counter:number = 0;

    /**
     * @param _board
     */
    constructor(protected _board:string[][]) { // , words:string[]

        this._sizeY = this._board.length;
        for (let y = 0; y < this._board.length; y++) {
            this._sizeX = Math.max(this._sizeX, this._board[y].length);
        }

        for (let y = 0; y < this._board.length; y++) {
            let row = this._board[y];
            this._meta[y] = this._meta[y] || [];
            for (let x = 0; x < this._sizeX; x++) {
                this._meta[y][x] = {};

                // fill x gaps with nulls, so we have normalized x length across the whole matrix
                if (this._board[y][x] === void(0)) {
                    this._board[y][x] = null;
                }
            }
            // for (let x = row.length; x < this._sizeX; x++) {
            //     this._board[y][x] = null;
            // }
        }
    }

    get sizeX() {
        return this._sizeX;
    }

    get sizeY() {
        return this._sizeY;
    }

    // quick and dirty internal data clone
    get board() {
        return JSON.parse(JSON.stringify(this._board));
    }

    /**
     * Brute force lookup (public api)
     * @param word
     * @returns {any}
     */
    find(word:string) {

        // word must be at least 2 chars long
        if (!word.length || word.length < 2) return null;
        if (word.length > this.sizeX && word.length > this.sizeY) return null;

        let directions = [
            Crossword.DIRECTION_TOP,
            Crossword.DIRECTION_TOP_RIGHT,
            Crossword.DIRECTION_RIGHT,
            Crossword.DIRECTION_BOTTOM_RIGHT,
            Crossword.DIRECTION_BOTTOM,
            Crossword.DIRECTION_BOTTOM_LEFT,
            Crossword.DIRECTION_LEFT,
            Crossword.DIRECTION_TOP_LEFT,
        ];

        for (let x = 0; x < this.sizeX; x++) {
            for (let y = 0; y < this.sizeY; y++) {
                for (let i = 0; i < directions.length; i++) {
                    let direction = directions[i];
                    this.counter++;
                    //console.log(x, y, word.length, direction, word);
                    // if there should be multiple matches, first always wins...
                    let found = this.getWord(x, y, word.length, direction, word);
                    if (found) return found;
                }
            }
        }

        return null;
    }

    /**
     * direct matrix lookup based on params
     * @param startX
     * @param startY
     * @param length
     * @param direction
     * @param expectedMatch
     * @returns {any}
     */
    getWord(startX:number, startY:number, length:number, direction:string, expectedMatch?:string) {
        if (startY >= this.sizeY) throw new Error(`Invalid start y (expected 0 - ${this.sizeY})`);
        if (startX >= this.sizeX) throw new Error(`Invalid start x (expected 0 - ${this.sizeX})`);

        let _escRgx = (string:string):string => {
            return (string + '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        };
        // early skip dead ends (if hint provided)
        let _substrMatch = (chars:string[], expected):boolean => {
            if (!expected) return true;
            return (
                (new RegExp(`^${_escRgx(chars.join(""))}`, 'i')).test(expected)
            )
        };

        let coordinates = [];
        let chars = [];
        let y, x;

        switch (direction) {

            case Crossword.DIRECTION_RIGHT:
                y = startY;
                for (let x = startX; x < this._sizeX; x++) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (!_substrMatch(chars, expectedMatch)) return null;
                    }
                }
                break;

            case Crossword.DIRECTION_LEFT:
                y = startY;
                for (let x = startX; x >= 0; x--) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (!_substrMatch(chars, expectedMatch)) return null;
                    }
                }
                break;

            case Crossword.DIRECTION_BOTTOM:
                x = startX;
                for (let y = startY; y < this._sizeY; y++) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (!_substrMatch(chars, expectedMatch)) return null;
                    }
                }
                break;

            case Crossword.DIRECTION_TOP:
                x = startX;
                for (let y = startY; y >= 0; y--) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (!_substrMatch(chars, expectedMatch)) return null;
                    }
                }
                break;

            case Crossword.DIRECTION_TOP_RIGHT:
                for (let x = startX; x < this._sizeX; x++) {
                    for (let y = startY; y >= 0; y--) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (!_substrMatch(chars, expectedMatch)) return null;
                        }
                        if (++x >= this._sizeX) break;
                    }
                }
                break;

            case Crossword.DIRECTION_TOP_LEFT:
                for (let x = startX; x >= 0; x--) {
                    for (let y = startY; y >= 0; y--) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (!_substrMatch(chars, expectedMatch)) return null;
                        }
                        if (--x < 0) break;
                    }
                }
                break;

            case Crossword.DIRECTION_BOTTOM_RIGHT:
                for (let x = startX; x < this._sizeX; x++) {
                    for (let y = startY; y < this._sizeY; y++) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (!_substrMatch(chars, expectedMatch)) return null;
                        }
                        if (++x >= this._sizeX) break;
                    }
                }
                break;

            case Crossword.DIRECTION_BOTTOM_LEFT:
                for (let x = startX; x >= 0; x--) {
                    for (let y = startY; y < this._sizeY; y++) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (!_substrMatch(chars, expectedMatch)) return null;
                        }
                        if (--x < 0) break;
                    }
                }
                break;

            default:
                throw new Error(`Unexpected direction ${direction}`);
        }

        // if we had a specified length and it doesnt match, act as if not found
        if (length && chars.length !== length) {
            return null;
        }

        return new Word(coordinates, chars, direction);
    }
}
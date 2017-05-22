
import {Crossword} from "./Crossword";
import {Word} from "./Word";



export class Board {

    protected _sizeX:number = 0;
    protected _sizeY:number = 0;

    protected _meta:any[][] = [];

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

    // brute force lookup public api
    find(word:string) {

        // word must be at least 2 chars long
        if (!word.length || word.length < 2) return null;
        // sanity check
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
                    //console.log(x, y, direction);
                    let found = this.getWord(x, y, word.length, direction);
                    //console.log(x, y, word.length, direction, found);
                    if (found && found.equals(word)) {
                        return found;
                    }
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

        let rx;
        if (expectedMatch) {
            rx = new RegExp(`^${Board._escapeRegex(expectedMatch)}`, 'i');
        }

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
                        if (rx && !rx.test(chars.join(""))) { // early skip dead ends (if hint provided)
                            return null;
                        }
                    }
                }
                break;

            case Crossword.DIRECTION_LEFT:
                y = startY;
                for (let x = startX; x >= 0; x--) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (rx && !rx.test(chars.join(""))) return null; // early skip dead ends (if hint provided)
                    }
                }
                break;

            case Crossword.DIRECTION_BOTTOM:
                x = startX;
                for (let y = startY; y < this._sizeY; y++) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (rx && !rx.test(chars.join(""))) return null; // early skip dead ends (if hint provided)
                    }
                }
                break;

            case Crossword.DIRECTION_TOP:
                x = startX;
                for (let y = startY; y >= 0; y--) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (rx && !rx.test(chars.join(""))) return null; // early skip dead ends (if hint provided)
                    }
                }
                break;

            case Crossword.DIRECTION_TOP_RIGHT:
                for (let x = startX; x < this._sizeX; x++) {
                    for (let y = startY; y >= 0; y--) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (rx && !rx.test(chars.join(""))) return null; // early skip dead ends (if hint provided)
                            x++;
                        }
                    }
                }
                break;

            case Crossword.DIRECTION_TOP_LEFT:
                for (let x = startX; x >= 0; x--) {
                    for (let y = startY; y >= 0; y--) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (rx && !rx.test(chars.join(""))) return null; // early skip dead ends (if hint provided)
                            x--;
                        }
                    }
                }
                break;

            case Crossword.DIRECTION_BOTTOM_RIGHT:
                for (let x = startX; x < this._sizeX; x++) {
                    for (let y = startY; y < this._sizeY; y++) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (rx && !rx.test(chars.join(""))) return null; // early skip dead ends (if hint provided)
                        }
                        x++;
                    }
                }
                break;

            case Crossword.DIRECTION_BOTTOM_LEFT:
                for (let x = startX; x >= 0; x--) {
                    for (let y = startY; y < this._sizeY; y++) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (rx && !rx.test(chars.join(""))) return null; // early skip dead ends (if hint provided)
                        }
                        x--;
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


    /**
     * @param string
     * @returns {string}
     * @private
     */
    static _escapeRegex(string:string):string {
        return (string + '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
}
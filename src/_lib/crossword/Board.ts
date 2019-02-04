import Crossword from './Crossword';
import Word from './Word';

interface Marks {
    [index: string]: Word;
}

export class Board {

    protected _sizeX: number = 0;
    protected _sizeY: number = 0;
    protected _meta: any[][] = [];

    // brute force counter (for debug only)
    public counter: number = 0;

    protected _marks: Marks = {};

    /**
     * @param _board
     */
    constructor(protected _board: string[][]) {

        this._sizeY = this._board.length;
        for (let y = 0; y < this._board.length; y++) {
            this._sizeX = Math.max(this._sizeX, this._board[y].length);
        }

        for (let y = 0; y < this._board.length; y++) {
            this._meta[y] = this._meta[y] || [];
            for (let x = 0; x < this._sizeX; x++) {
                this._meta[y][x] = {};

                // fill x gaps with nulls, so we have normalized x length across the whole matrix
                if (this._board[y][x] === void(0)) {
                    this._board[y][x] = null;
                }
            }
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

    clone() {
        let board = new Board(this.board);
        board._marks = this._marks;
        return board;
    }

    charAt(x, y) {
        if (this._board[y] && this._board[y][x]) {
            return this._board[y][x];
        }
        return null;
    }

    /**
     * Brute force lookup (public api)
     * @param word
     * @returns {any}
     */
    find(word: string) {

        // word must be at least 2 chars long
        if (!word.length || word.length < 2) { return null; }
        if (word.length > this.sizeX && word.length > this.sizeY) { return null; }

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
                    // console.log(x, y, word.length, direction, word);
                    // if there should be multiple matches, first always wins...
                    let found = this.getWord(x, y, word.length, direction, word);
                    if (found) { return found; }
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
    getWord(startX: number, startY: number, length: number, direction: string, expectedMatch?: string) {

        if (startY >= this.sizeY) { throw new Error(`Invalid start y (expected 0 - ${this.sizeY})`); }
        if (startX >= this.sizeX) { throw new Error(`Invalid start x (expected 0 - ${this.sizeX})`); }

        let _escRgx = (str: string): string => {
            return (str + '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        };
        // early skip dead ends (if hint provided)
        let _substrMatch = (_chars: string[], expected): boolean => {
            if (!expected) { return true; }
            return  (new RegExp(`^${_escRgx(_chars.join(''))}`, 'i')).test(expected);
        };

        let coordinates = [];
        let chars = [];
        let y, x;

        switch (direction) {

            case Crossword.DIRECTION_RIGHT:
                y = startY;
                for (x = startX; x < this._sizeX; x++) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (!_substrMatch(chars, expectedMatch)) { return null; }
                    }
                }
                break;

            case Crossword.DIRECTION_LEFT:
                y = startY;
                for (x = startX; x >= 0; x--) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (!_substrMatch(chars, expectedMatch)) { return null; }
                    } else { break; }
                }
                break;

            case Crossword.DIRECTION_BOTTOM:
                x = startX;
                for (y = startY; y < this._sizeY; y++) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (!_substrMatch(chars, expectedMatch)) { return null; }
                    } else { break; }
                }
                break;

            case Crossword.DIRECTION_TOP:
                x = startX;
                for (y = startY; y >= 0; y--) {
                    if (!length || (chars.length < length)) {
                        chars.push(this._board[y][x]);
                        coordinates.push([x, y]);
                        if (!_substrMatch(chars, expectedMatch)) { return null; }
                    } else { break; }
                }
                break;

            case Crossword.DIRECTION_TOP_RIGHT:
                for (x = startX; x < this._sizeX; x++) {
                    for (y = startY; y >= 0; y--) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (!_substrMatch(chars, expectedMatch)) { return null; }
                        } else { break; }
                        if (++x >= this._sizeX) { break; }
                    }
                }
                break;

            case Crossword.DIRECTION_TOP_LEFT:
                for (x = startX; x >= 0; x--) {
                    for (y = startY; y >= 0; y--) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (!_substrMatch(chars, expectedMatch)) { return null; }
                        } else { break; }
                        if (--x < 0) { break; }
                    }
                }
                break;

            case Crossword.DIRECTION_BOTTOM_RIGHT:
                for (x = startX; x < this._sizeX; x++) {
                    for (y = startY; y < this._sizeY; y++) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (!_substrMatch(chars, expectedMatch)) { return null; }
                        } else { break; }
                        if (++x >= this._sizeX) { break; }
                    }
                }
                break;

            case Crossword.DIRECTION_BOTTOM_LEFT:
                for (x = startX; x >= 0; x--) {
                    for (y = startY; y < this._sizeY; y++) {
                        if (!length || (chars.length < length)) {
                            chars.push(this._board[y][x]);
                            coordinates.push([x, y]);
                            if (!_substrMatch(chars, expectedMatch)) { return null; }
                        } else { break; }
                        if (--x < 0) { break; }
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

        return new Word(chars, coordinates);
    }

    /**
     * @param word
     * @returns {boolean}
     */
    markWord(word: Word) {
        if (!this._isValidWord(word)) { return false; }
        this._marks[word.toString()] = word;
        return true;
    }

    /**
     * @param word
     * @returns {boolean}
     */
    unMarkWord(word: Word) {
        if (!this._isValidWord(word)) { return false; }
        delete this._marks[word.toString()];
        return true;
    }

    /**
     * @param wordOrString
     * @returns {boolean}
     */
    isMarked(wordOrString) {
        return !!this._marks[wordOrString.toString()];
    }

    /**
     * @param word
     * @returns {boolean}
     * @private
     */
    _isValidWord(word: Word) {
        let c = word.coordinates;
        let w = this.getWord(c[0][0], c[0][1], c.length, word.direction);

        // quick-n-dirty...
        return (
            w.coordinates.length === word.coordinates.length
            && w.coordinates.join('') === word.coordinates.join('')
            && w.toString() === word.toString()
        );
    }

    /**
     * @returns {Marks}
     */
    get marks() {
        return this._marks;
    }

    getAllMarkedCoordinates() {
        let marked = [];

        // initialize empty board
        for (let y = 0; y < this._board.length; y++) {
            marked[y] = marked[y] || [];
            for (let x = 0; x < this._sizeX; x++) {
                marked[y][x] = 0;
            }
        }

        // loop over marks...
        Object.keys(this._marks).forEach((key) => {
            let w: Word = this._marks[key];
            w.coordinates.forEach((pair) => {
                marked[pair[1]][pair[0]] = 1;
            });
        });

        return marked;
    }

    /**
     * @param startX
     * @param startY
     * @param endX
     * @param endY
     * @returns {any}
     */
    normalizeCoordinatesBetween(startX, startY, endX, endY) {
        let sx = parseInt(startX, 10);
        let ex = parseInt(endX, 10);
        let sy = parseInt(startY, 10);
        let ey = parseInt(endY, 10);

        // sanity checks first
        if (sx < 0 || sx > this.sizeX) { return []; }
        if (sy < 0 || sy > this.sizeY) { return []; }
        if (ex < 0 || ex > this.sizeX) { return []; }
        if (ey < 0 || ey > this.sizeY) { return []; }

        let out = [];

        // easiest: all same
        if (sx === ex && sy === ey) {
            return [[sx, sy]];
        }

        // easy: same x axis
        if (sx === ex) {
            if (ey - sy >= 0) {
                for (let y = sy; y <= ey; y++) { out.push([sx, y]); }
            } else {
                for (let y = sy; y >= ey; y--) { out.push([sx, y]); }
            }
            return out;
        }

        // easy case: same y axis
        if (sy === ey) {
            if (ex - sx >= 0) {
                for (let x = sx; x <= ex; x++) { out.push([x, sy]); }
            } else {
                for (let x = sx; x >= ex; x--) { out.push([x, sy]); }
            }
            return out;
        }

        // still: exact diagonal (same deltas)
        if (Math.abs(ex - sx) === Math.abs(ey - sy)) {
            let x = sx;
            let y = sy;
            let delta = ex - sx;
            for (let i = 0; i <= Math.abs(delta); i++) {
                out.push([x, y]);
                if (ex - sx >= 0) { x++; }
                else { x--; }
                if (ey - sy >= 0) { y++; }
                else { y--; }
            }
            return out;
        }

        // harder: mixed values
        let deltaX = ex - sx;
        let deltaY = ey - sy;
        let x = sx;
        let y = sy;
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            for (let i = 0; i <= Math.abs(deltaX); i++) {
                out.push([x, y]);
                if (deltaX >= 0) { x++; }
                else { x--; }
            }
        } else {
            for (let i = 0; i <= Math.abs(deltaY); i++) {
                out.push([x, y]);
                if (deltaY >= 0) { y++; }
                else { y--; }
            }
        }

        return out;
    }
}
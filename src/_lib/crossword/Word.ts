
import Crossword from './Crossword';
export default class Word {

    constructor(protected _chars: string[], protected _coordinates: number[][]) {
        if (this._chars.length < 2) {
            throw new Error(`Word must be at least 2 chars long`);
        }
        if (this._coordinates.length !== this._chars.length) {
            throw new Error(`Chars and coordinates mismatch`);
        }
    }

    /**
     * @returns {string}
     */
    toString() {
        return this._chars.join('');
    }

    /**
     * @returns {string}
     */
    get direction() {
        let x1 = this._coordinates[0][0];
        let x2 = this._coordinates[1][0];
        let y1 = this._coordinates[0][1];
        let y2 = this._coordinates[1][1];

        // right
        if (x1 < x2) {
            switch (true) {
                case y1 > y2:
                    return Crossword.DIRECTION_TOP_RIGHT;
                case y1 < y2:
                    return Crossword.DIRECTION_BOTTOM_RIGHT;
                default:
                    return Crossword.DIRECTION_RIGHT;
            }
        }
        // left
        else if (x1 > x2) {
            switch (true) {
                case y1 > y2:
                    return Crossword.DIRECTION_TOP_LEFT;
                case y1 < y2:
                    return Crossword.DIRECTION_BOTTOM_LEFT;
                default:
                    return Crossword.DIRECTION_LEFT;
            }
        }
        // top/bottom
        else {
            switch (true) {
                case y1 > y2:
                    return Crossword.DIRECTION_TOP;
                default:
                    return Crossword.DIRECTION_BOTTOM;
            }
        }

    }

    /**
     * @returns {number[][]}
     */
    get coordinates() {
        return this._coordinates;
    }

    /**
     * @returns {string[]}
     */
    get chars() {
        return this._chars.slice();
    }
}
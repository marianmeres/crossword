
export default class Word {

    constructor(protected _chars: string[], protected _coordinates: number[][])
    {
        if (this._chars.length < 2) {
            throw new Error(`Word must be at least 2 chars long`);
        }
        if (this._coordinates.length !== this._chars.length) {
            throw new Error(`Chars and coordinates mismatch`);
        }
    }

    toString() {
        return this._chars.join('');
    }

    get direction() {
        return 'todo: detect from coordinates';
    }

    get coordinates() {
        return this._coordinates;
    }

    get chars() {
        return this._chars.slice();
    }
}
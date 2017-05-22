
export class Word {

    constructor(protected _coordinates:number[][], protected _chars:string[], protected _direction:string)
    {

    }

    toString() {
        return this._chars.join("");
    }

    get direction() {
        return this._direction;
    }

    get coordinates() {
        return this._coordinates;
    }

    get chars() {
        return this._chars.slice();
    }
}
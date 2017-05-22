
export class Word {

    constructor(protected _coordinates:number[][], protected _chars:string[], protected _direction:string)
    {

    }

    toString() {
        return this._chars.join("");
    }

    equals(word:string) {
        return this.toString().toLowerCase() === word.toLowerCase();
    }
}
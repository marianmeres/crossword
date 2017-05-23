"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Word = (function () {
    function Word(_chars, _coordinates) {
        this._chars = _chars;
        this._coordinates = _coordinates;
        if (this._chars.length < 2) {
            throw new Error("Word must be at least 2 chars long");
        }
        if (this._coordinates.length !== this._chars.length) {
            throw new Error("Chars and coordinates mismatch");
        }
    }
    Word.prototype.toString = function () {
        return this._chars.join("");
    };
    Object.defineProperty(Word.prototype, "direction", {
        get: function () {
            return 'todo';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Word.prototype, "coordinates", {
        get: function () {
            return this._coordinates;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Word.prototype, "chars", {
        get: function () {
            return this._chars.slice();
        },
        enumerable: true,
        configurable: true
    });
    return Word;
}());
exports.Word = Word;

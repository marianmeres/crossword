"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Word = (function () {
    function Word(_coordinates, _chars, _direction) {
        this._coordinates = _coordinates;
        this._chars = _chars;
        this._direction = _direction;
    }
    Word.prototype.toString = function () {
        return this._chars.join("");
    };
    Object.defineProperty(Word.prototype, "direction", {
        get: function () {
            return this._direction;
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

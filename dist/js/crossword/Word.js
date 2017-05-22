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
    Word.prototype.equals = function (word) {
        return this.toString().toLowerCase() === word.toLowerCase();
    };
    return Word;
}());
exports.Word = Word;

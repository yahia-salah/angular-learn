"use strict";
exports.__esModule = true;
var Like = /** @class */ (function () {
    function Like(_numberOfLikes) {
        this._numberOfLikes = _numberOfLikes;
        this._selected = false;
    }
    Like.prototype.click = function () {
        if (!this._selected)
            this._numberOfLikes++;
        else
            this._numberOfLikes--;
        this._selected = !this._selected;
    };
    Object.defineProperty(Like.prototype, "numberOfLikes", {
        get: function () {
            return this._numberOfLikes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Like.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    return Like;
}());
exports.Like = Like;

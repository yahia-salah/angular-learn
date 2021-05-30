export class Like {
  private _selected: boolean;
  constructor(private _numberOfLikes?: number) {
    this._selected = false;
  }

  click(): void {
    this._numberOfLikes += this._selected ? -1 : 1;
    this._selected = !this._selected;
  }

  get numberOfLikes() {
    return this._numberOfLikes;
  }

  get selected() {
    return this._selected;
  }
}

export class Agv {
    private _name: string;
    private _id: number;
    private _isOnline: boolean;
    private _delay: number;
    private _MAX_DELAY: number = 100;
    private _disabled: boolean;
    private _selected: boolean;
    private _color: string;

    constructor(name: string, id: number) {
        this._name = name;
        this._id = id;
        this._disabled = false;
        this._selected = false;
        this._color = "";
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get isOnline() {
        return this._isOnline;
    }

    set isOnline(isOnline: boolean) {
        this._isOnline = isOnline;
    }

    get delay() {
        return this._delay;
    }

    set delay(delay: number) {
        this._delay = delay;
    }

    get MAX_DELAY() {
        return this._MAX_DELAY;
    }

    set disabled(disabled: boolean) {
        this._disabled = disabled;
    }

    get disabled() {
        return this._disabled;
    }

    get selected() {
        return this._selected;
    }

    set selected(selected: boolean) {
        this._selected = selected;
    }

    get color() {
        return this._color;
    }

    set color(color: string) {
        this._color = color;
    }
}
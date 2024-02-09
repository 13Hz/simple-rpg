interface IControlable {
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;

    keyDown(e: KeyboardEvent): void;

    keyUp(e: KeyboardEvent): void;
}
import {UiWindow} from "./uiWindow";
import {Point} from "../point";

export class PocketWindow extends UiWindow {
    constructor(point?: Point) {
        super('pocket', point);
    }
}
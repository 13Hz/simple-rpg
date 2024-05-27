import {GameObject} from "../gameObject";

export class Flame extends GameObject
{
    draw() {
        if (this.isAlive) {
            super.draw();
        }
    }
}
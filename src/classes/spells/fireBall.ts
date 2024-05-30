import {DrawManager} from "../../managers/drawManager";
import {DamageDealer} from "../../types/damageDealer";
import {GameObject} from "../gameObject";
import {Point} from "../point";
import {TypedEvent} from "../typedEvent";
import {DirectedSpell} from "./directedSpell";
import {CreatureEffect} from "../creatureEffects/creatureEffect";
import {FiredCreatureEffect} from "../creatureEffects/firedCreatureEffect";

export class FireBall extends DirectedSpell implements DamageDealer {
    initiator: GameObject;
    damage: number = 10;
    effects: CreatureEffect[];
    private _trace: Point[] = [];
    private _traceFrames: number = 0;
    private _traceLength: number = 3;
    private _framesPerTrace: number = 10;
    private readonly _traceSize: number;

    readonly onDealDamage: TypedEvent = new TypedEvent();

    constructor(initiator: GameObject, size: number = 10, color: string = 'red') {
        super(Point.empty, size, color);
        this._traceSize = size / 2;
        this.initiator = initiator;
        this.effects = [
            new FiredCreatureEffect(2, 25, 2.5)
        ];

        this.onDealDamage.on('onDealDamage', () => {
            this.isAlive = false;
        });
    }

    draw() {
        if (this._traceFrames % this._framesPerTrace == 0) {
            this._trace.push(this.getCenter());
        }
        if (this._trace.length > this._traceLength) {
            this._trace = this._trace.slice(-this._traceLength);
        }
        DrawManager.draw((context) => {
            context.fillStyle = 'red';
            context.fillRect(this.point.x, this.point.y, this.width, this.height);
            this._trace.forEach((dot) => {
                context.fillRect(dot.x - this._traceSize / 2, dot.y - this._traceSize / 2, this._traceSize, this._traceSize);
            });
        });

        this._traceFrames++;
    }
}
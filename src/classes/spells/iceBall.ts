import {DirectedSpell} from "./directedSpell";
import {DrawManager} from "../../managers/drawManager";
import {DamageDealer} from "../../types/damageDealer";
import {GameObject} from "../gameObject";
import {Point} from "../point";
import {TypedEvent} from "../typedEvent";
import {CreatureEffect} from "../creatureEffects/creatureEffect";
import {IcingCreatureEffect} from "../creatureEffects/icingCreatureEffect";

export class IceBall extends DirectedSpell implements DamageDealer {
    initiator: GameObject;
    damage: number = 10;
    effects: CreatureEffect[] = [];
    private _orbitAngle: number = 0;
    private _orbitCount: number = 3;
    private _orbitSize: number = 2;
    private _orbitRadius: number = 3;
    private _orbitSpeed: number = 0.025;

    readonly onDealDamage: TypedEvent = new TypedEvent();

    constructor(initiator: GameObject, size: number = 10, color: string = 'blue') {
        super(Point.empty, size, color);
        this.initiator = initiator;
        this.effects = [
            new IcingCreatureEffect(5, 40, 10)
        ];
        this.onDealDamage.on('onDealDamage', () => {
            this.isAlive = false;
        });
    }

    draw() {
        DrawManager.draw((context) => {
            context.fillStyle = 'blue';
            context.fillRect(this.point.x, this.point.y, this.width, this.height);
            for (let i = 0; i < this._orbitCount; i++) {
                const center = this.getCenter();
                const angle = (Math.PI * 2 / this._orbitCount) * i;
                const x = center.x - this._orbitSize / 2 + Math.cos(angle + this._orbitAngle) * (this.width + this._orbitRadius);
                const y = center.y - this._orbitSize / 2 + Math.sin(angle + this._orbitAngle) * (this.height + this._orbitRadius);
                context.fillRect(x, y, this._orbitSize, this._orbitSize);
            }

            this._orbitAngle += this._orbitSpeed;
        });
    }
}
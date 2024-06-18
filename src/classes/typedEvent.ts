import type {OnCollisionEvent, OnCollisionEventPayload} from "../types/events/onCollisionEvent";
import type {OnTakeDamageEvent, OnTakeDamageEventPayload} from "../types/events/onTakeDamageEvent";
import type {OnDealDamageEvent, OnDealDamageEventPayload} from "../types/events/onDealDamageEvent";
import {
    OnMouseClickEvent,
    OnMouseMoveEvent,
    OnMouseEnterEvent,
    OnMouseLeaveEvent,
    OnMouseEventPayload,
    OnObjectClickEvent, OnObjectClickEventPayload
} from "../types/events/mouseEvents";

export interface EventMap {
    [OnCollisionEvent]: OnCollisionEventPayload,
    [OnTakeDamageEvent]: OnTakeDamageEventPayload,
    [OnDealDamageEvent]: OnDealDamageEventPayload,
    [OnMouseMoveEvent]: OnMouseEventPayload,
    [OnMouseClickEvent]: OnMouseEventPayload,
    [OnObjectClickEvent]: OnObjectClickEventPayload,
    [OnMouseEnterEvent]: OnMouseEventPayload,
    [OnMouseLeaveEvent]: OnMouseEventPayload,
}

type EventHandler<Data> = (data?: Data) => void;

type EventListeners<EventMap> = {
    [Key in keyof EventMap]: EventHandler<EventMap[Key]>[];
};

export class TypedEvent {
    private listeners = {} as EventListeners<EventMap>;

    on<Name extends keyof EventMap>(eventName: Name, callback: EventHandler<EventMap[Name]>) {
        if (!(eventName in this.listeners)) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    }

    off<Name extends keyof EventMap>(eventName: Name, callback: EventHandler<EventMap[Name]>) {
        if (this.listeners[eventName] === undefined) {
            return;
        }
        for (let i = this.listeners[eventName].length - 1; i >= 0; i--) {
            if (this.listeners[eventName][i] === callback) {
                delete this.listeners[eventName][i];
            }
        }
    }

    emit<Name extends keyof EventMap>(eventName: Name, data?: EventMap[Name]) {
        if (!this.listeners || !this.listeners[eventName]) {
            return;
        }

        this.listeners[eventName].reduce((previousData, currentHandler) => {
            const newData = currentHandler(previousData);
            return newData !== undefined ? newData : previousData;
        }, data);
    }

    destroy() {
        this.listeners = {} as EventListeners<EventMap>;
    }
}
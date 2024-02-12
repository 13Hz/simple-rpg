/**
 * @jest-environment jsdom
 */

import {GameObject} from "../../classes/gameObject";
import {GameObjectsManager} from "../../managers/gameObjectsManager";

describe('GameObjectsManager class', () => {
    describe('add function', () => {
        test('add object', () => {
            const manager = new GameObjectsManager();
            manager.add(new GameObject({x: 0, y: 0}));
            expect(manager.getObjects().length).toBe(1);
        });
    });
    describe('getObjects function', () => {
        test('get empty objects array', () => {
            const manager = new GameObjectsManager();
            expect(manager.getObjects().length).toBe(0);
        });
        test('get only available objects', () => {
            const manager = new GameObjectsManager();
            const object = new GameObject({x: 0, y: 0});
            object.isAlive = false;
            manager.add(object);
            manager.add(new GameObject({x: 0, y: 0}));
            expect(manager.getObjects().length).toBe(1);
        });
    });
    describe('update function', () => {
        test('update all available objects', () => {
            const manager = new GameObjectsManager();
            manager.add(new GameObject({x: 0, y: 0}));
            manager.add(new GameObject({x: 0, y: 0}));
            manager.update();
            expect(manager.getObjects().length).toBe(2);
            manager.getObjects().forEach((object) => {
                expect(object.isHover).toBe(true);
            });
        });
    });
});
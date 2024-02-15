/**
 * @jest-environment jsdom
 */

import {GameObject} from "../../classes/gameObject";
import {Point} from "../../classes/point";

describe('GameObject class', () => {
    describe('update method', () => {
        test('is mouse hover', () => {
            //default mouse position - 0, 0
            const object = new GameObject({x: 0, y: 0});
            object.update();
            expect(object.isHover).toBe(true);
        });
        test('the object has left the cursor', () => {
            const object = new GameObject({x: 0, y: 0});
            object.update();
            expect(object.isHover).toBe(true);
            object.point = {x: 50, y: 50};
            object.update();
            expect(object.isHover).toBe(false);
        });
    });
    describe('check in room function', () => {
        test('out of room', () => {
            const object = new GameObject({x: -50, y: -50});
            object.checkInRoom();
            expect(object.isAlive).toBe(false);
        });
        test('in room', () => {
            const object = new GameObject({x: 50, y: 50});
            object.checkInRoom();
            expect(object.isAlive).toBe(true);
        });
    });
    describe('check center functions', () => {
        test('get center', () => {
            const object = new GameObject({x: 100, y: 150}, 20);
            const expectedCenter: Point = new Point(110, 160);
            expect(object.getCenter()).toStrictEqual(expectedCenter);
        });
        test('set center', () => {
            const object = new GameObject({x: 100, y: 150});
            object.setCenter(Point.empty);
            expect(object.getCenter()).toStrictEqual(Point.empty);
            expect(object.point).toStrictEqual(new Point(-(object.width / 2), -(object.height / 2)));
        });
    });
});
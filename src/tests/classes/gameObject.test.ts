/**
 * @jest-environment jsdom
 */

import {GameObject} from "../../classes/gameObject";
import {Point} from "../../classes/point";

describe('GameObject class', () => {
    describe('checkCollision function', () => {
        test('two objects intersect', () => {
            const object1 = new GameObject({x: 0, y: 0});
            const object2 = new GameObject({x: 10, y: 0});
            expect(object1.checkCollision(object2)).toBe(true);
        });
        test('two objects do not intersect (end to end)', () => {
            const object1 = new GameObject({x: 0, y: 0});
            const object2 = new GameObject({x: 10.1, y: 0});
            expect(object1.checkCollision(object2)).toBe(false);
        });
        test('two objects do not intersect (far)', () => {
            const object1 = new GameObject({x: 0, y: 0});
            const object2 = new GameObject({x: 500, y: 500});
            expect(object1.checkCollision( object2)).toBe(false);
        });
        test('an object intersects itself', () => {
            const object = new GameObject({x: 0, y: 0});
            expect(object.checkCollision(object)).toBe(true);
        });
    });
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
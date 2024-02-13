/**
 * @jest-environment jsdom
 */

import {GameObject} from "../../classes/gameObject";
import {Point} from "../../types/point";

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
        test('get center function', () => {
            const object = new GameObject({x: 100, y: 150}, 20);
            const expectedCenter: Point = {x: 110, y: 160};
            expect(object.getCenter()).toStrictEqual(expectedCenter);
        });
    });
});
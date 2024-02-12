/**
 * @jest-environment jsdom
 */

import {checkCollision, map, rnd} from "../../utils/functions";
import {GameObject} from "../../classes/gameObject";

describe('utils module', () => {
    describe('map function', () => {
        test('map 0.5 value from 0 to 1 to from 0 to 100 = 50', () => {
            expect(map(0.5, 0, 1, 0, 100).toFixed(50));
        });
    });
    describe('checkCollision function', () => {
        test('two objects intersect', () => {
            const object1 = new GameObject({x: 0, y: 0});
            const object2 = new GameObject({x: 10, y: 0});
            expect(checkCollision(object1, object2)).toBe(true);
        });
        test('two objects do not intersect (end to end)', () => {
            const object1 = new GameObject({x: 0, y: 0});
            const object2 = new GameObject({x: 10.1, y: 0});
            expect(checkCollision(object1, object2)).toBe(false);
        });
        test('two objects do not intersect (far)', () => {
            const object1 = new GameObject({x: 0, y: 0});
            const object2 = new GameObject({x: 500, y: 500});
            expect(checkCollision(object1, object2)).toBe(false);
        });
        test('an object intersects itself', () => {
            const object = new GameObject({x: 0, y: 0});
            expect(checkCollision(object, object)).toBe(true);
        });
    });
    describe('rnd function', () => {
        test('check value between min and max', () => {
            const value = rnd(0, 100);
            expect(value).toBeLessThan(100);
            expect(value).toBeGreaterThanOrEqual(0);
        });
        test('two objects do not intersect (end to end)', () => {
            const object1 = new GameObject({x: 0, y: 0});
            const object2 = new GameObject({x: 10.1, y: 0});
            expect(checkCollision(object1, object2)).toBe(false);
        });
        test('two objects do not intersect (far)', () => {
            const object1 = new GameObject({x: 0, y: 0});
            const object2 = new GameObject({x: 500, y: 500});
            expect(checkCollision(object1, object2)).toBe(false);
        });
        test('an object intersects itself', () => {
            const object = new GameObject({x: 0, y: 0});
            expect(checkCollision(object, object)).toBe(true);
        });
    });
});
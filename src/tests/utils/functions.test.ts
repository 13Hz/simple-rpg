/**
 * @jest-environment jsdom
 */

import {map, rnd} from "../../utils/functions";

describe('utils module', () => {
    describe('map function', () => {
        test('map 0.5 value from 0 to 1 to from 0 to 100 = 50', () => {
            expect(map(0.5, 0, 1, 0, 100).toFixed(50));
        });
    });
    describe('rnd function', () => {
        test('check value between min and max', () => {
            const value = rnd(0, 100);
            expect(value).toBeLessThan(100);
            expect(value).toBeGreaterThanOrEqual(0);
        });
    });
});
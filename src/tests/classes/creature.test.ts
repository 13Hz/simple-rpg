/**
 * @jest-environment jsdom
 */

import {Creature} from "../../classes/creature";

describe('Creature class', () => {
    describe('regeneration method', () => {
        test('successfully health regeneration (stand)', () => {
            const creature = new Creature({x: 0, y: 0});
            creature.forceTakeDamage(50);
            const initHealth = creature.health;

            creature.regeneration();
            expect(creature.health).toBe(initHealth + creature.healthRegenerationRate);
        });
        test('successfully health regeneration (run)', () => {
            const creature = new Creature({x: 0, y: 0});
            creature.forceTakeDamage(50);
            creature.xVelocity = 5;
            const initHealth = creature.health;

            creature.regeneration();
            expect(creature.health).toBe(initHealth + creature.healthRegenerationRate);
        });
        test('health regeneration with full health', () => {
            const creature = new Creature({x: 0, y: 0});
            const initHealth = creature.health;
            creature.regeneration();
            expect(creature.health).toBe(initHealth);
        });
        test('mana regeneration with full mana', () => {
            const creature = new Creature({x: 0, y: 0});
            const initMana = creature.mana;
            creature.regeneration();
            expect(creature.mana).toBe(initMana);
        });
    });
    describe('takeDamage method', () => {
        test('successfully taking damage (without dying)', () => {
            const creature = new Creature({x: 0, y: 0});
            const initialHealth = creature.health;
            expect(creature.forceTakeDamage(10)).toBe(true);
            expect(creature.health).toBe(initialHealth - 10);
            expect(creature.isAlive).toBe(true);
        });
        test('successfully taking damage and dying', () => {
            const creature = new Creature({x: 0, y: 0});
            expect(creature.forceTakeDamage(creature.maxHealth)).toBe(true);
            expect(creature.health).toBeLessThanOrEqual(0);
            expect(creature.isAlive).toBe(false);
        });
    });
});
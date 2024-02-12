/**
 * @jest-environment jsdom
 */

import {Creature} from "../../classes/creature";
import {Bullet} from "../../classes/bullet";

describe('Creature class', () => {
    describe('regeneration method', () => {
        test('successfully health regeneration', () => {
            const creature = new Creature({x: 0, y: 0});
            const initHealth = 50;
            creature.health = initHealth;
            creature.regeneration();
            expect(creature.health).toBe(initHealth + creature.healthRegenerationRate * 2);
            creature.isRunning = true;
            creature.health = initHealth;
            creature.regeneration();
            expect(creature.health).toBe(initHealth + creature.healthRegenerationRate);
        });
        test('health regeneration with full health', () => {
            const creature = new Creature({x: 0, y: 0});
            const initHealth = creature.health;
            creature.regeneration();
            expect(creature.health).toBe(initHealth);
        });
        test('successfully mana regeneration', () => {
            const creature = new Creature({x: 0, y: 0});
            const initMana = 50;
            creature.mana = initMana;
            creature.regeneration();
            expect(creature.mana).toBe(initMana + creature.manaRegenerationRate * 2);
            creature.isRunning = true;
            creature.mana = initMana;
            creature.regeneration();
            expect(creature.mana).toBe(initMana + creature.manaRegenerationRate);
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
            const attackingCreature = new Creature({x: 0, y: 0});
            const defendingCreature = new Creature({x: 0, y: 0});
            const bullet = new Bullet({x: 0, y: 0}, 0, 0, attackingCreature);
            const initialHealth = defendingCreature.health;
            expect(defendingCreature.takeDamage(bullet)).toBe(true);
            expect(defendingCreature.health).toBe(initialHealth - bullet.damage);
            expect(defendingCreature.isAlive).toBe(true);
        });
        test('successfully taking damage and dying', () => {
            const attackingCreature = new Creature({x: 0, y: 0});
            const defendingCreature = new Creature({x: 0, y: 0});
            const bullet = new Bullet({x: 0, y: 0}, 0, 0, attackingCreature);
            bullet.damage = defendingCreature.health;
            expect(defendingCreature.takeDamage(bullet)).toBe(true);
            expect(defendingCreature.health).toBeLessThanOrEqual(0);
            expect(defendingCreature.isAlive).toBe(false);
        });
        test('successfully taking critical damage', () => {
            const attackingCreature = new Creature({x: 0, y: 0});
            const defendingCreature = new Creature({x: 0, y: 0});
            const bullet = new Bullet({x: 0, y: 0}, 0, 0, attackingCreature);
            const initialHealth = defendingCreature.health;
            attackingCreature.criticalChance = 200;
            expect(defendingCreature.takeDamage(bullet)).toBe(true);
            expect(defendingCreature.health).toBe(initialHealth - bullet.damage * attackingCreature.criticalDamageMultiply);
        });
    });
});
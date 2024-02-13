export interface Spell<Target> {
    manaCost: number;

    cast(target: Target): void;

    draw(): void;
}
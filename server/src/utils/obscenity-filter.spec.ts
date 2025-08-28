import { containsProfanity, validateNoProfanity } from './obscenity-filter';

describe('Obscenity Filter', () => {
    describe('containsProfanity', () => {
        it('should return false for clean text', () => {
            expect(containsProfanity('hello world')).toBe(false);
            expect(containsProfanity('My Chess Lobby')).toBe(false);
            expect(containsProfanity('PlayerName123')).toBe(false);
        });

        it('should return true for inappropriate text', () => {
            expect(containsProfanity('fuck')).toBe(true);
            expect(containsProfanity('shit')).toBe(true);
            expect(containsProfanity('ass')).toBe(true);
        });

        it('should handle edge cases', () => {
            expect(containsProfanity('')).toBe(false);
            expect(containsProfanity(null as any)).toBe(false);
            expect(containsProfanity(undefined as any)).toBe(false);
        });

        it('should be case insensitive', () => {
            expect(containsProfanity('FUCK')).toBe(true);
            expect(containsProfanity('Fuck')).toBe(true);
        });
    });

    describe('validateNoProfanity', () => {
        it('should not throw for clean text', () => {
            expect(() => validateNoProfanity('hello world', 'test field')).not.toThrow();
            expect(() => validateNoProfanity('My Chess Lobby', 'lobby name')).not.toThrow();
        });

        it('should throw for inappropriate text', () => {
            expect(() => validateNoProfanity('fuck', 'test field')).toThrow('test field contains inappropriate language');
            expect(() => validateNoProfanity('shit', 'lobby name')).toThrow('lobby name contains inappropriate language');
        });
    });
});
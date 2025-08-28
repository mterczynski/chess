import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';

// Create a matcher using the English dataset and recommended transformers
const dataset = englishDataset.build();
const matcher = new RegExpMatcher({
    blacklistedTerms: dataset.blacklistedTerms,
    whitelistedTerms: dataset.whitelistedTerms,
    blacklistMatcherTransformers: englishRecommendedTransformers.blacklistMatcherTransformers,
    whitelistMatcherTransformers: englishRecommendedTransformers.whitelistMatcherTransformers,
});

/**
 * Checks if the given text contains profanity
 * @param text The text to check
 * @returns true if the text contains profanity, false otherwise
 */
export function containsProfanity(text: string): boolean {
    if (!text || typeof text !== 'string') {
        return false;
    }
    
    return matcher.hasMatch(text);
}

/**
 * Validates that text doesn't contain profanity and throws an error if it does
 * @param text The text to validate
 * @param fieldName The name of the field being validated (for error messages)
 * @throws Error if the text contains profanity
 */
export function validateNoProfanity(text: string, fieldName: string): void {
    if (containsProfanity(text)) {
        throw new Error(`${fieldName} contains inappropriate language`);
    }
}
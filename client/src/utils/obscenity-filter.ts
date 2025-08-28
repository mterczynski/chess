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
 * Validates that text doesn't contain profanity
 * @param text The text to validate
 * @param fieldName The name of the field being validated (for error messages)
 * @returns An error message if profanity is found, null otherwise
 */
export function validateNoProfanityClient(text: string, fieldName: string): string | null {
    if (containsProfanity(text)) {
        return `${fieldName} contains inappropriate language`;
    }
    return null;
}
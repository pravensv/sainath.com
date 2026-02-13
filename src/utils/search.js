export const fuzzySearch = (products, query) => {
    if (!query) return products;

    const searchTokens = query.toLowerCase().trim().split(/\s+/);

    // Levenshtein Implementation
    const getLevenshteinDistance = (a, b) => {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,      // deletion
                    matrix[i][j - 1] + 1,      // insertion
                    matrix[i - 1][j - 1] + cost // substitution
                );
            }
        }
        return matrix[b.length][a.length];
    };

    const isFuzzyMatch = (token, target) => {
        // 1. Check for substring match (e.g. "phone" in "iPhone")
        if (target.includes(token)) return true;

        // 2. Check Levenshtein distance
        const dist = getLevenshteinDistance(token, target);
        // Dynamic threshold: allow 1 error for short words (>=3), 2 for medium (>=5), 3 for long (>=8)
        const threshold = token.length < 5 ? 1 : token.length < 8 ? 2 : 3;
        return dist <= threshold;
    };

    return products.filter(product => {
        const productWords = (product.name + ' ' + product.brand + ' ' + (product.description || '')).toLowerCase().split(/\s+/);

        // Check if EVERY search token matches AT LEAST ONE word in the product
        return searchTokens.every(searchToken =>
            productWords.some(productWord => isFuzzyMatch(searchToken, productWord))
        );
    });
};

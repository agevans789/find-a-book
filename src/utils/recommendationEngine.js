import { darkScrollbar } from "@mui/material";
import { CRITERIA_SCORERS } from "../config/bookParserRules";
import { Description } from "@mui/icons-material";
import { TONES_DICTIONARY } from "../config/tones";

export function rankAndSortBooks(rawApiItems, userPreferences) {
    if (!rawApiItems || rawApiItems.length === 0) return [];

    return rawApiItems.map(item => {
        const bookVector = {};
        Object.keys(CRITERIA_SCORERS).forEach(key => {
            bookVector[key] = CRITERIA_SCORERS[key](item);
        });

        let sumOfSquaredDifferences = 0;

        // compare every dimension against user profile vectors 
        Object.keys(bookVector).forEach(key => {
            // make baseline 0.5
            const userValue = userPreferences[key] !== undefined ? userPreferences[key] : 0.5;
            const diff = bookVector[key] - userValue;

            sumOfSquaredDifferences += Math.pow(diff, 2);
        });

        const totalDistance = Math.sqrt(sumOfSquaredDifferences);

        // with the vector system, the max distance shifts depending on number of dimensions checked, the max distance is always the square root of that number
        const totalDimensions = Object.keys(bookVector).length;
        const maxPossibleDistance = Math.sqrt(totalDimensions);

        const matchPercentage = Math.round((1 - (totalDistance / maxPossibleDistance)) * 100);

        return {
            id: item.id,
            title: item.volumeInfo?.title || "Untitled Book",
            authors: item.volumeInfo?.authors || ["Unknown Author"],
            image: item.volumeInfo?.imageLinks?.thumbnail || "https://placeholder.com",
            description: item.volumeInfo?.description || "No description available.",
            vectors: bookVector,
            matchPercentage: Math.min(100, Math.max(0, matchPercentage))
        };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}

export function findThreeDiverseRecommendations(scoredBooks) {
    if (!scoredBooks || scoredBooks.length < 3) return scoredBooks;

    const perfectMatch = scoredBooks[0];
    const remainingBooks = scoredBooks.filter(b => b.id !== perfectMatch.id);
    const toneKeys = Object.keys(TONES_DICTIONARY);
    const toneMatch = [...remainingBooks].sort((a, b) => {
        const aToneSum = toneKeys.reduce((sum, key) => sum + (a.vectors[key] || 0), 0);
        const bToneSum = toneKeys.reduce((sum, key) => sum + (b.vectors[key] || 0), 0);
        return bToneSum - aToneSum;
    })[0];

    const structuralPool = remainingBooks.filter(b => b.id !== toneMatch.id);

    const structuralKeys = ["pacing", "subjectInternal", "subjectExternal", "subjectSpeculative", "subjectHistorical"];

    const structuralMatch
}
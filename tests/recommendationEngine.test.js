import { rankAndSortBooks, findThreeDiverseRecommendations } from "../src/utils/recommendationEngine";

describe('Euclidean High-Dimensional Recommendation Engine', () => {
    // fake user profile tracking neutral vector values
    const mockUserPreferences = {
        whimsical: 1.0,
        dark: 0.0, 
        pacing: 0.5,
        subjectInternal: 0.5,
        subjectExternal: 0.5,
        subjectSpeculative: 0.5,
        subjectHistorical: 0.5
    };

    test('should award a high match percentage to books near user vector coordinates', () => {
        const rawItems = [
            { id: "1", volumeInfo: { description: "A magical playful story filled with whimsical curious fairies." } }
        ];

        const results = rankAndSortBooks(rawItems, mockUserPreferences);
        expect(results[0].matchPercentage).toBeGreaterThan(70);
    });

    test('should award a low match percentage to books far away from user vector coordinates', () => {
        const rawItems = [
            { id: "2", volumeInfo: { description: "A grim, bleak, and somber twisted macabre war diary." } }
        ];

        const results = rankAndSortBooks(rawItems, mockUserPreferences);

        expect(results[0].id).toBe("high");
        expect(results[1].id).toBe("low");
    });
});
import { CRITERIA_SCORERS } from "../src/config/bookParserRules";

describe('Linguistic Feature Extraction Parsers', () => {
    // fallback safety when descriptions are missing
    test('should handle missing descriptions gracefully with neutral boundaries', () => {
        const mockEmptyItem = { volumeInfo: { description: "" } };

        const whimsicalScore = CRITERIA_SCORERS.whimsical(mockEmptyItem);
        const pacingScore = CRITERIA_SCORERS.pacing(mockEmptyItem);

        expect(whimsicalScore).toBe(0.2);
        expect(pacingScore).toBe(0.5);
    });

    // tone keyword scanning
    test('should increment tone scores based on dictionary keyword density', () => {
        const mockDarkItem = {
            volumeInfo: { description: "This is a grim and somber story featuring a twisted and macabre mystery." }
        };

        const score = CRITERIA_SCORERS.dark(mockDarkItem);
        expect(score).toBe(1.0);
    });

    // syntactic pacing calculations
    test('should score short sentences with few clauses as fast-paced (closer to 1.0)', () => {
        const snappyItem = {
            volumeInfo: { description: "The door opened. He ran fast. No one saw him escape." }
        };

        const score = CRITERIA_SCORERS.pacing(snappyItem);
        expect(score).toBeGreaterThan(0.7);
    });

    test('should score complex clauses as slow-paced (closer to 0.0)', () => {
        const heavyItem = {
            volumeInfo: {
                description: "Although he wanted to stay because the rain was falling heavily, which made travel dangerous, he left anyway."
            }
        };

        const score = CRITERIA_SCORERS.pacing(heavyItem);
        expect(score).toBeLessThan(0.4);
    });
});
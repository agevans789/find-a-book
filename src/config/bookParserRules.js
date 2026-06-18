import { TONES_DICTIONARY } from "./tones";
import { SUBJECT_FACETS } from "./subjects";

// helper function to see how heavily a book matches a tone profile array
function calculateToneScore(descriptionText, keywordArray) {
    if (!descriptionText) return 0.2; // return low neutral score if missing summary

    const text = descriptionText.toLowerCase();
    let matchCount = 0;

    // count how many times words from the list show up
    keywordArray.forEach(word => {
        if (text.includes(word.toLowerCase())) {
            matchCount += 1;
        }
    });

    // scale the score: 0 matches = 0.0, 1 match = 0.4, 2 matches = 0.8, 3+ matches = 1.0
    if (matchCount === 0) return 0.0;
    if (matchCount === 1) return 0.4;
    if (matchCount === 2) return 0.8;
    return 1.0; // max out vector value at or 3 or more keyword matches
};

// list of subordinating conjunctions and relative pronouns that signal dependent clauses
const DEPENDENT_CLAUSE_MARKERS = [
    "although", "because", "since", "unless", "whereas", "while", "which", "though", "whenever", "provided that"
]

function calculatePacingScore(descriptionText) {
    // if API returns no description
    if (!descriptionText || descriptionText.length < 10) return 0.5;

    const text = descriptionText.trim();
    const words = text.split(/\s+/);
    const totalWords = words.length;

    // calculate average sentence length
    // split by sentence-ending punctuation: . ! or ?
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const totalSentences = sentences.length || 1;
    const avgSentenceLength = totalWords / totalSentences;

    // count dependent clause markers
    let clauseCount = 0;
    words.forEach(word => {
        // clean punctuation off the word
        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
        if (DEPENDENT_CLAUSE_MARKERS.includes(cleanWord)) {
            clauseCount += 1;
        }
    });

    // calculate the density of clauses 
    const clauseDensity = clauseCount / totalSentences;

    // 0.0 = slow/heavy, 1.0 = fast/snappy
    // fast pacing = short sentences (< 12 words) and few dependent clauses (< 0.2 per sentence)
    // slow pacing = long sentences (> 25 words) or high clause density (> 1.0 per sentence)

    let lengthScore = 1 - ((avgSentenceLength - 10) / 20); // scale between 10 and 30 words
    let clauseScore = 1 - (clauseDensity / 1.2); // scale between 0 and 1.2 clauses

    // individual scores between 0 and 1
    lengthScore = Math.min(1, Math.max(0, lengthScore));
    clauseScore = Math.min(1, Math.max(0, clauseScore));

    // average two scores to get final score
    return (lengthScore + clauseScore) / 2;
}

function calculateFacetScore(descriptionText, keywordArray) {
    if (!descriptionText) return 0.2;
    const text = descriptionText.toLowerCase();
    let matchCount = 0;

    keywordArray.forEach(word => {
        if (text.includes(word)) matchCount += 1;
    });

    if (matchCount === 0) return 0.0;
    if (matchCount === 1) return 0.5;
    return 1.0; // 2 or more means this book highly features this subject
}

export const CRITERIA_SCORERS = {
    Object.keys(TONES_DICTIONARY).forEach((toneName) => {
        CRITERIA_SCORERS[toneName] = (apiItem) => {
            return calculateToneScore(apiItem.volumeInfo?.description, TONES_DICTIONARY[toneName]);
        }
    })

    pacing: (apiItem) => {
        return calculatePacingScore(apiItem.volumeInfo?.description);
    },
    subjectInternal: (apiItem) => {
        return calculateKeywordDensityScore(apiItem.volumeInfo?.description, SUBJECT_FACETS.internal);
    },
    subjectExternal: (apiItem) => {
        return calculateFacetScore(apiItem.volumeInfo?.description, SUBJECT_FACETS.external);
    },
    subjectSpeculative: (apiItem) => {
        return calculateFacetScore(apiItem.volumeInfo?.description, SUBJECT_FACETS.speculative);
    },
    subjectHistorical: (apiItem) => {
        return calculateFacetScore(apiItem.volumeInfo?.description, SUBJECT_FACETS.historical);
    },
};


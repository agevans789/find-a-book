/* this is where the dictionaries for the criteria are stored 
these will be used to filter and sort the books 
these fall into the categories of tone, subject matter, and pacing */

/* tone is determined by the writing style and the overall mood of the book
using language to determine this, so there will actually be several tones that a book could have
and the profile of a book tone-wise will be determined by the language dictionary here
so a book will have a vector for tone that takes into account the different tones by language to draw a complete profile */

export const TONE = {
    "dark": ["dark", "gloomy", "melancholy", "somber", "depressing"],
    "light": ["light", "cheerful", "upbeat", "optimistic", "joyful"],
    "humorous": ["humorous", "funny", "witty", "satirical", "comedic"],
    "serious": ["serious", "thought-provoking", "intellectual", "philosophical", "reflective"],
    // add more tones as needed
}

/* subject matter is determined by the themes and topics covered in the book
this will be determined by the language used to describe the book and the themes that are present in the book */

export const SUBJECT_MATTER = {
    "romance": ["romance", "love", "relationship", "heartbreak", "passion"],
    "mystery": ["mystery", "suspense", "thriller", "crime", "detective"],
    "fantasy": ["fantasy", "magic", "mythology", "supernatural", "adventure"],
    "science fiction": ["science fiction", "sci-fi", "space", "technology", "future"],
    // add more subject matters as needed
}

/* pacing is determined by the speed at which the plot unfolds and the level of tension in the book
this will be determined by the language used to describe the book and the level of action and suspense present in the book */

export const PACING = {
    "fast": ["fast-paced", "action-packed", "thrilling", "exciting", "adrenaline-fueled"],
    "slow": ["slow-paced", "character-driven", "introspective", "meditative", "thoughtful"],
    // add more pacing options as needed
}

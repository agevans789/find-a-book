import REACT from 'react';

export default function BookCard({ book, showControls = false, onLike, onHate }) {
    const title = book.title || "Untitled Book";
    const authors = book.authors ? book.authors.join(','): "Unknown Author";
    const thumbnail = book.image || "https://placeholder.com";
    const description = book.description || "No description available";

    const getMatchBadgeColor = (score) => {
        if (score >= 80) return '#54d05b'
        if (score >= 50) return '#fba259'
        return '#d32f2f'
    }
}
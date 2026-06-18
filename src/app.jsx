import React, { useState } from 'react';
import { rankAndSortBooks } from './utils/recommendationEngine';

export default function App() {
    // initialize user profile as null, if null show onboarding
    // core states
    const [userProfile, setUserProfile] = useState(null);
    const [favroites, setFavorites] = useState([]);
    const [hated, setHated] = useState([]);
    const [rawApiResults, setRawApiResults] = useState([]);

    // add or move a book to a specific staging tray
    const handleAddToTray = (book, rating) => {
        // remove it from both lists first to prevent a book frfom being in both spots
        setFavorites(prev => prev.filter(b => b.id !== book.id));
        setHated(prev => prev.filter(b => b.id !== book.id));

        if (targetTray === 'love') {
            setFavorites(prev => [...prev, book]);
        } else if (targetTray === 'hate') {
            setHated(prev => [...prev, book]);
        }
    }
};

// mathematical vector aggregator 
const handleCalculateInitiialProfile = () => {
    // starting default coordinates are neutral in the middle
    let baseVectors = {}
    // pull toward favorite books
    favorites.forEach(book => {
        baseVectors. ;
    }
    )

    // pull away from hated books
    hated.forEach(book => {
        baseVectors. ;
    }
    )
}
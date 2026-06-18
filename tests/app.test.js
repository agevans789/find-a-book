import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/app';

// mock global fetch requests
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            items: [
                { id: "m1", volumeInfo: { title: "Test Mock Book 1", description: "Whimsical text "} },
                { id: "m2", volumeInfo: { title: "Test Mock Book 2", description: "Dark text" } }
            ]
        })
    })
);

describe('Single Page Application UI Flow Lifecycle', () => {

    test('should render the loading screen state on immediate mount', () => {
        render(<App />);
        expect(screen.getByText(/Connecting to Google Books Space.../i).toBeInTheDocument());
    });

    test('should transition to view tray screen after successful fetch load', async () => {
        render(<App />);

        // wait for global fetch promise to resolve and update local state
        await waitFor(() => {
            expect(screen.getByText(/Step 1: Calibrate Recommendation Engine/i)).toBeInTheDocument();
        });

        // check if mock API item rendered onto the card components
        expect(screen.getByText("Test Mock Book 1")).toBeInTheDocument();
    });

    test('should keep the submit button disabled until user selects a baseline favorite', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Compute Mathematical Profiles")).toBeDisabled();
        });

        // simulate user clicking the Favorite action button on the first rendered book card component
        const favoriteButtons = screen.getAllByText("Favorite");
        fireEvent.click(favoriteButtons[0]);

        // button should unlock as favorites hook array fills
        expect(screen.getByText("Compute Mathemtatical Profiles")).not.toBeDisabled();
    });
});
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest'
import Game from './Game';

describe('Game Component', () => {
    test('renders the game board', () => {
        render(<Game />);
        const boardElement = screen.getByRole('grid');
        expect(boardElement).toBeTruthy();
    });
});
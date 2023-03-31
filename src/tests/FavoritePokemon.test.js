import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o favoritepokeon', () => {
  describe('testa se contempla 100% dos casos de uso criados pelo Stryker', () => {
    it('exibe na tela um h2 com texto About Pokédex', () => {
      renderWithRouter(<App />);
      const favoriteslink = screen.getByRole('link', {
        name: /favorite pokémon/i,
      });
      userEvent.click(favoriteslink);
      const textEl = screen.getByText(/No favorite Pokémon found/i);
      expect(textEl).toBeInTheDocument();
    });
    it('São exibidos na tela apenas os Pokémon favoritados', () => {
      renderWithRouter(<App />);
      const detailslink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(detailslink);
      const favoritebutton = screen.getByRole('checkbox', {
        name: /pokémon favoritado\?/i,
      });
      userEvent.click(favoritebutton);
      const favoriteslink = screen.getByRole('link', {
        name: /favorite pokémon/i,
      });
      userEvent.click(favoriteslink);
      const favoriteEl = screen.getByText(/Pikachu/i);
      expect(favoriteEl).toBeInTheDocument();
    });
  });
});

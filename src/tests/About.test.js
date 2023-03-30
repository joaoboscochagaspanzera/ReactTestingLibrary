import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o About', () => {
  describe('testa se contempla 100% dos casos de uso criados pelo Stryker', () => {
    it('exibe na tela um h2 com texto About Pokédex', () => {
      renderWithRouter(<App />);
      const aboutlink = screen.getByRole('link', {
        name: /about/i,
      });
      userEvent.click(aboutlink);
      const h2Element = screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      });
      expect(h2Element).toBeInTheDocument();
    });
  });
  describe('testa se contempla 100% dos casos de uso criados pelo Stryker', () => {
    it('exibe na tela um h2 com texto About Pokédex', () => {
      renderWithRouter(<App />);
      const aboutlink = screen.getByRole('link', {
        name: /about/i,
      });
      userEvent.click(aboutlink);
      const imgElement = screen.getByRole('img');
      expect(imgElement.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o App', () => {
  describe('Testa se o link...', () => {
    test('contém o texto Home', () => {
      renderWithRouter(<App />);
      const homeElement = screen.getByRole('link', {
        name: /home/i,
      });
      expect(homeElement).toBeInTheDocument();
    });
    test('contém o texto About', () => {
      renderWithRouter(<App />);
      const aboutElement = screen.getByRole('link', {
        name: /about/i,
      });
      expect(aboutElement).toBeInTheDocument();
    });
    test('contém o texto Favorite Pokémon', () => {
      renderWithRouter(<App />);
      const favoritesElement = screen.getByRole('link', {
        name: /favorite pokémon/i,
      });
      expect(favoritesElement).toBeInTheDocument();
    });
  });
  describe('Testa se a aplicação é redirecionada para a página inicial', () => {
    it('', () => {
      renderWithRouter(<App />);
      const homelink = screen.getByRole('link', {
        name: /home/i,
      });
      userEvent.click(homelink);
      expect(window.location.pathname).toBe('/');
    });
  });
  describe('Teste se a aplicação é redirecionada para a página de About', () => {
    it('', () => {
      const { history } = renderWithRouter(<App />);
      const aboutlink = screen.getByRole('link', {
        name: /about/i,
      });
      userEvent.click(aboutlink);
      expect(history.location.pathname).toBe('/about');
    });
  });
  describe('Teste se a aplicação é redirecionada para a página de favorite pokemons', () => {
    it('', () => {
      const { history } = renderWithRouter(<App />);
      const favoriteslink = screen.getByRole('link', {
        name: /favorite pokémon/i,
      });
      userEvent.click(favoriteslink);
      expect(history.location.pathname).toBe('/favorites');
    });
  });
});

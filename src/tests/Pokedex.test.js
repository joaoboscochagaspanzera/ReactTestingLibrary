import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';
import pokemonList from '../data';

const isPokemonFavorite = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
    const encounteredPokemonTitle = screen.getByRole('heading', { name: 'Encountered Pokémon' });
    expect(encounteredPokemonTitle).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextBtn);
    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const buttonTypes = pokemonList.map(({ type }) => type);
    expect(buttons).toHaveLength(7);
    buttons.forEach((button) => expect(buttonTypes).toContain(button.innerHTML));
    userEvent.click(buttons[1]);
    const pikachu = screen.queryByText(/pikachu/i);
    expect(pikachu).not.toBeInTheDocument();
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeVisible();
    userEvent.click(allButton);
    const pikachu2 = screen.getByText(/pikachu/i);
    expect(pikachu2).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeVisible();

    userEvent.click(allButton);
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemonList.forEach((pokemon) => {
      expect(screen.getByText(`${pokemon.name}`)).toBeInTheDocument();
      userEvent.click(nextBtn);
    });
  });
});

import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const { screen } = require('@testing-library/react');

describe('Testes do componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const averageWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(averageWeight).toBeInTheDocument();
    expect(pokemonImg).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveProperty('alt', 'Pikachu sprite');
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink.href).toContain('/pokemon/25');
    expect(detailsLink).toBeInTheDocument();
  });
  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const sumaryTitleEl = screen.getByRole('heading', { name: /summary/i });
    const gameLocationsTitleEl = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(sumaryTitleEl).toBeInTheDocument();
    expect(gameLocationsTitleEl).toBeInTheDocument();
  });
  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    const invisibleStarIcon = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
    expect(invisibleStarIcon).toBe(null);
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    const visibleStarIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(checkbox).toBeChecked();
    expect(visibleStarIcon.src).toContain('/star-icon.svg');
    expect(visibleStarIcon.alt).toContain('Pikachu is marked as favorite');
  });
});

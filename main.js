console.log('Hello, World!');


// fetch their data
async function fetchPokemonData(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
      }
      const pokemonData = await response.json();
      return pokemonData;
  } catch (error) {
      console.error('Error fetching Pokémon data:', error);
  }
}

// all the info stuff
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('pokemon-select');
  const infoDiv = document.getElementById('pokemon-info');
  const nameElem = document.getElementById('pokemon-name');
  const imageElem = document.getElementById('pokemon-image');
  const typesElem = document.getElementById('pokemon-types');
  const abilitiesElem = document.getElementById('pokemon-abilities');
  const heightElem = document.getElementById('pokemon-height');
  const weightElem = document.getElementById('pokemon-weight');

  // fetching pokemon
  fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(response => response.json())
      .then(data => {
          data.results.forEach(pokemon => {
              const option = document.createElement('option');
              option.text = pokemon.name;
              option.value = pokemon.url;
              select.appendChild(option);
          });
      });

  // selection of pokemon to display the stuff
  select.addEventListener('change', async () => {
      const selectedPokemonUrl = select.value;
      if (selectedPokemonUrl) {
          try {
              const pokemon = await fetchPokemonData(selectedPokemonUrl);
              nameElem.textContent = pokemon.name.toUpperCase();
              imageElem.src = pokemon.sprites.front_default;
              typesElem.textContent = pokemon.types.map(type => type.type.name).join(', ');
              abilitiesElem.textContent = pokemon.abilities.map(ability => ability.ability.name).join(', ');
              heightElem.textContent = pokemon.height;
              weightElem.textContent = pokemon.weight;
              infoDiv.style.display = 'block';
          } catch (error) {
              console.error('Error displaying Pokémon data:', error);
          }
      } else {
          infoDiv.style.display = 'none';
      }
  });
});

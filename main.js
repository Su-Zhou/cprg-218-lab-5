console.log('Hello, World!');


 // fetching the data
async function fetchPokemonData(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching Pokémon data:', error);
  }
}

// getting the the dropdown data?
async function populatePokemonDropdown(url) {
  try {
      const data = await fetchPokemonData(url);
      const select = document.getElementById('pokemon-select');
      data.results.forEach(pokemon => {
          const option = document.createElement('option');
          option.text = pokemon.name.toUpperCase();
          option.value = pokemon.url;
          select.appendChild(option);
      });
  } catch (error) {
      console.error('Error populating Pokémon dropdown:', error);
  }
}

// All the info I want w/ the selection plus button//
document.addEventListener('DOMContentLoaded', async () => {
  const select = document.getElementById('pokemon-select');
  const submitButton = document.getElementById('submit-button');
  const infoDiv = document.getElementById('pokemon-info');
  const nameElem = document.getElementById('pokemon-name');
  const imageElem = document.getElementById('pokemon-image');
  const typesElem = document.getElementById('pokemon-types');
  const abilitiesElem = document.getElementById('pokemon-abilities');
  const heightElem = document.getElementById('pokemon-height');
  const weightElem = document.getElementById('pokemon-weight');

  // showing the actual names
  await populatePokemonDropdown('https://pokeapi.co/api/v2/pokemon?limit=88');

  // the info displaying after pressing the submit button
  submitButton.addEventListener('click', async () => {
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

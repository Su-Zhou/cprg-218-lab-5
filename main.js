console.log('Hello, World!');

//fetching the pokemon data?
const fetchPokemonData = async (url) => {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching Pokémon data:', error);
  }
};

//dropdownn
const populatePokemonDropdown = async (url) => {
  try {
      const data = await fetchPokemonData(url);
      const select = document.querySelector('#pokemon-select');
      data.results.forEach(pokemon => {
          const option = document.createElement('option');
          option.textContent = pokemon.name.toUpperCase();
          option.value = pokemon.url;
          select.appendChild(option);
      });
  } catch (error) {
      console.error('Error populating Pokémon dropdown:', error);
  }
};

//setting up ALL THE DATA that needs to be fetched?
document.addEventListener('DOMContentLoaded', async () => {
  const select = document.querySelector('#pokemon-select');
  const submitButton = document.querySelector('#submit-button');
  const infoDiv = document.querySelector('#pokemon-info');
  const nameElem = document.querySelector('#pokemon-name');
  const imageElem = document.querySelector('#pokemon-image');
  const typesElem = document.querySelector('#pokemon-types');
  const abilitiesElem = document.querySelector('#pokemon-abilities');
  const heightElem = document.querySelector('#pokemon-height');
  const weightElem = document.querySelector('#pokemon-weight');
  const hpElem = document.querySelector('#pokemon-hp');
  const defElem = document.querySelector('#pokemon-def');
  const atkElem = document.querySelector('#pokemon-atk');

  await populatePokemonDropdown('https://pokeapi.co/api/v2/pokemon?limit=150'); //actually fetching 150

  //displaying the info after select and submit
  submitButton.addEventListener('click', async () => { 
      const selectedPokemonUrl = select.value;
      if (selectedPokemonUrl) {
          try {
              const pokemon = await fetchPokemonData(selectedPokemonUrl); //getting the specific the stats!//
              nameElem.textContent = pokemon.name.toUpperCase();
              imageElem.src = pokemon.sprites.front_default;
              typesElem.textContent = pokemon.types.map(type => type.type.name).join(', ');
              abilitiesElem.textContent = pokemon.abilities.map(ability => ability.ability.name).join(', ');
              heightElem.textContent = pokemon.height;
              weightElem.textContent = pokemon.weight;

              const hp = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat; hpElem.textContent = hp;

              const def = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat; defElem.textContent = def;

              const atk = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat; atkElem.textContent = atk;
              

              const typeColors = { //little easter egg of changing the Bg to match the pokemon type//
                  fire: '#FFA07A',
                  water: '#ADD8E6',
                  ice: '#BFF3F7',
                  grass: '#C0EFB4',
                  bug: '#CBDA9E',
                  electric: '#FFD700',
                  psychic: '#FFC0CB',
                  fighting: '#D4BCB7',
                  poison: '#C3AADE',
                  ghost: '#9DA1FE',
                  rock: '#B9B7A6',
                  ground: '#DCD695',
                  dragon: '#9C96FF',
                  fairy: '#FFD4D4',
              };
              const backgroundColor = pokemon.types[0].type.name in typeColors ? typeColors[pokemon.types[0].type.name] : '#f0f0f0';
              infoDiv.style.backgroundColor = backgroundColor;

              infoDiv.style.display = 'block';
          } catch (error) {
              console.error('Error displaying Pokémon data:', error);
          }
      } else {
          infoDiv.style.display = 'none';
      }
  });
});

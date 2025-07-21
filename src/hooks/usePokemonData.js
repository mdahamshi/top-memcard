import { useEffect, useState } from 'react';
export function usePokemonData(limit = 12) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const LOCAL_STORAGE_KEY = `pokemonData_${limit}`;

  useEffect(() => {
    async function fetchPokemons() {
      setLoading(true);

      try {
        // 1. Check localStorage first
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          setPokemonList(JSON.parse(cached));
          setLoading(false);
          return;
        }

        // 2. Fetch from API if not cached
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        );
        const data = await res.json();

        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              name: pokemon.name,
              image: details.sprites.other['official-artwork'].front_default,
            };
          })
        );

        // 3. Save to state and localStorage
        setPokemonList(detailedData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(detailedData));
      } catch (err) {
        console.error('Failed to fetch Pokémon:', err);
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, [limit]);

  return { pokemonList, loading };
}

import { Pokemon } from "./pokeapi_types";
import type { State } from "./state";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const pokemonName: string = args[0];

    if (!(pokemonName in state.pokedex)) {
        console.log(`${pokemonName} is not in your pokedex!`);
        return;
    }

    const pokemon: Pokemon = state.pokedex[pokemonName];

    console.log(`
        Name: ${pokemon.name}
        Base XP: ${pokemon.base_experience}
        Stats:
            - hp ${pokemon.stats[0].base_stat}
            - attack ${pokemon.stats[1].base_stat}
            - defense ${pokemon.stats[2].base_stat}
            - special attack ${pokemon.stats[3].base_stat}
            - special defense ${pokemon.stats[4].base_stat}
        `);
}
import { State } from "./state";
import type { Pokemon } from "./pokeapi_types";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {

    const pokemonName = args[0];
    if (!pokemonName || pokemonName === "") {
        console.log("You must specify a Pokemon to catch");
        return;
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const pokemon: Pokemon = await state.pokeapi.fetchPokemon(pokemonName);
    const caught: boolean = randomCatch(pokemon.base_experience);
    
    if (caught) {
        console.log(`${pokemon.name} was caught!`);
        state.pokedex[pokemon.name] = pokemon;
    } else {
        console.log(`${pokemon.name} escaped!`);
    }
}

function randomCatch(baseExperience: number): boolean {
    let expression: number;
    if (baseExperience < 100) {
        expression = 0;
    } else if (baseExperience >= 100 && baseExperience < 200) {
        expression = 1;
    } else if (baseExperience >= 200 && baseExperience < 300) {
        expression = 2;
    } else {
        expression = 3;
    }

    switch(expression) {
        case 0:
            return (Math.floor(Math.random() * 2) === 1);
        case 1:
            return (Math.floor(Math.random() * 4) === 1);
        case 2:
            return (Math.floor(Math.random() * 6) === 1);
        default:
            return (Math.floor(Math.random() * 8) === 1);
    }
}
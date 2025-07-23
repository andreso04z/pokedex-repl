import type { State } from "./state.js";
import type { Location } from "./pokeapi_types.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const locationName = args[0];
    
    if (!locationName || locationName === "") {
        console.log("You must specify a location to explore");
        return;
    }

    const location: Location = await state.pokeapi.fetchLocation(locationName);

    console.log(`Exploring ${location.name}...\nFound Pokemon:`);
    for (let encounter of location.pokemon_encounters) {
        console.log(`- ${encounter.pokemon.name}`);
    }
}
import type { State } from "./state.js";
import type { ShallowLocations } from "./pokeapi_types.js";

export async function commandMapb(state: State) {

    if (!state.prevLocationsURL && state.nextLocationsURL) {
        console.log("you're on the first page");
        return;
    }

    let locationsResponse: ShallowLocations;

    if (!state.prevLocationsURL) {
        locationsResponse = await state.pokeapi.fetchLocations();
    } else {
        locationsResponse = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    }

    if (!locationsResponse) {
        throw new Error("Locations response obtained is empty or missing!");
    }

    state.nextLocationsURL = locationsResponse.next;
    if (locationsResponse.previous) {
        state.prevLocationsURL = locationsResponse.previous;
    }

    for (const location of locationsResponse.results) {
        console.log(location.name);
    }
}
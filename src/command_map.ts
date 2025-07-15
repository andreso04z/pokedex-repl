import type { State } from "./state.js";
import type { ShallowLocations } from "./pokeapi_types.js";

export async function commandMap(state: State) {

    if (!state.nextLocationsURL && state.prevLocationsURL) {
        console.log("You've reached the end of the map!");
        return;
    }

    let locationsResponse: ShallowLocations

    if (!state.nextLocationsURL) {
        locationsResponse = await state.pokeapi.fetchLocations();
    } else {
        locationsResponse = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    }

    if (!locationsResponse) {
        throw new Error("Locations response obtained is empty or missing!");
    }

    state.prevLocationsURL = locationsResponse.previous;
    if (locationsResponse.next) {
        state.nextLocationsURL = locationsResponse.next;
    }


    for (const location of locationsResponse.results) {
        console.log(location.name);
    }

}
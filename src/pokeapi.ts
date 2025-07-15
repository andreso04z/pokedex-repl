import type { ShallowLocations, Location } from "./pokeapi_types";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

        if (!pageURL) {
            pageURL = `${PokeAPI.baseURL}/location-area`;
        }

        const response = await fetch(pageURL, { method: "GET" });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const parsedResponse = await response.json();
        return parsedResponse as ShallowLocations;
    }

    async fetchLocation(locationName: string): Promise<Location> {

        const response = await fetch(`https://pokeapi.co/api/v2/location-area/${locationName}`, { method: "GET" });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const parsedResponse = await response.json();
        return parsedResponse as Location;
    }
}
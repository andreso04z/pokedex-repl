import type { ShallowLocations, Location } from "./pokeapi_types.js";
import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache;

    constructor() {
        this.cache = new Cache(60000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (!pageURL) {
            pageURL = `${PokeAPI.baseURL}/location-area`;
        }

        const cacheEntry = this.cache.get<ShallowLocations>(pageURL);
        if (cacheEntry && cacheEntry) {
            console.log("From cache");
            return cacheEntry;
        }

        const response = await fetch(pageURL, { method: "GET" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const parsedResponse = await response.json();
        this.cache.add(pageURL, parsedResponse as ShallowLocations);
        return parsedResponse as ShallowLocations;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const pageURL = `https://pokeapi.co/api/v2/location-area/${locationName}`;

        const cacheEntry = this.cache.get<Location>(pageURL);
        if (cacheEntry && cacheEntry) {
            console.log("From cache");
            return cacheEntry;
        }

        const response = await fetch(pageURL, { method: "GET" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const parsedResponse = await response.json();
        this.cache.add(pageURL, parsedResponse as Location);
        return parsedResponse as Location;
    }
}
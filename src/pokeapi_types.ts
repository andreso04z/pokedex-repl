// Shallow Locations
export type LocationAreaResult = {
  name: string;
  url: string;
};

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: LocationAreaResult[]
};

// Specific Location

export type Location = {
  id: number;
  name: string;
  location: { name: string; url: string };
  pokemon_encounters: PokemonEncounter[];
};

export type PokemonEncounter = {
  pokemon: Pokemon;
};

export type Pokemon = {
  name: string;
  url: string;
  base_experience: number;
};
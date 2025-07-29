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
  stats: [
    {
      base_stat: number;
      stat: {
        name: "hp";
      }
    },
    {
      base_stat: number;
      stat: {
        name: "attack";
      }
    },
    {
      base_stat: number;
      stat: {
        name: "defense";
      }
    },
    {
      base_stat: number;
      stat: {
        name: "special-attack";
      }
    },
    {
      base_stat: number;
      stat: {
        name: "special-defense";
      }
    }
  ];
};
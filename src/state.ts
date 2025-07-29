import { createInterface, Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import type { Pokemon } from "./pokeapi_types.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./ command_pokedex.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => void;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });

    const registry: Record<string, CLICommand> = {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays the next 20 map locations",
            callback: commandMap
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 map locations",
            callback: commandMapb
        },
        explore: {
            name: "explore",
            description: "Displays Pokemon in a specified location",
            callback: commandExplore
        },
        catch: {
            name: "catch",
            description: "Attempts to catch a specified pokemon",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "Displays information about a specified caught pokemon",
            callback: commandInspect
        },
        pokedex: {
            name: "pokedex",
            description: "Displays all caught pokemon",
            callback: commandPokedex
        }
    };

    return {
        rl: rl,
        commands: registry,
        pokeapi: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokedex: {}
    };
}
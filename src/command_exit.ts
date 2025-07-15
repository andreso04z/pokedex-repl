import { exit } from 'node:process';
import type { State } from "./state.js";

export async function commandExit(state: State): Promise<void> {
    state.rl.close();
    console.log("Closing the Pokedex... Goodbye!");
    exit(0);
}
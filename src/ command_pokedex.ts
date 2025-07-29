import { State } from "./state";

export async function commandPokedex(state: State): Promise<void> {
    console.log("Your Pokedex:");
    for (let pokemon in state.pokedex) {
        console.log(`- ${state.pokedex[pokemon].name}`);
    }
}
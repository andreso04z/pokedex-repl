import { initState } from './state.js';

export function startREPL() {
    const state = initState();
    state.rl.prompt();
    state.rl.on("line", async (input) => {
        const command = cleanInput(input)[0];
        if (!command) {
            state.rl.prompt();
            return;
        }
        if (command in state.commands) {
            try {
                const commandStored = state.commands[command];
                await commandStored.callback(state, ...cleanInput(input).slice(1));
            } catch (error) {
                console.log(`An internal error occurred: ${error}`);
            }
        } else {
            console.log("Unknown command");
        }
        state.rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(/\s+/);
}
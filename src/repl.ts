import { initState } from './state.js';

export function startREPL() {
    const state = initState();
    state.rl.prompt();
    state.rl.on("line", (input) => {
        const command = cleanInput(input)[0];
        if (!command) {
            state.rl.prompt();
            return;
        }
        if (command in state.commands) {
            const commandStored = state.commands[command];
            commandStored.callback(state);
        } else {
            console.log("Unknown command");
        }
        state.rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(/\s+/);
}
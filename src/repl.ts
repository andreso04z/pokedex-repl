import { createInterface } from 'node:readline';
import { getCommands } from './registry.js';

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
});

export function startREPL() {
    rl.prompt();
    rl.on("line", (input) => {
        const command = cleanInput(input)[0];
        if (!command) {
            rl.prompt();
            return;
        }
        if (command in getCommands()) {
            const commandStored = getCommands()[command];
            commandStored.callback(getCommands());
        } else {
            console.log("Unknown command");
        }
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(/\s+/);
}
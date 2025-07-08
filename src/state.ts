import { createInterface, Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
};

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export function initState() {
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
        }    
    }

    return {
        rl: rl,
        commands: registry
    };
}
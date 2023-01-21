/**
 * representation of a game entry on a fictional website
 */
export interface GameEntry extends Record<string, any>{
    name: string;
    launchedAt: Date;
}

/**
 * a well-known game entry, useful for tests
 */
export const defaultGameEntry: GameEntry = {
    name: "Ring of the Elder",
    launchedAt: new Date()
}
/**
 * representation of a game entry on a fictional website
 */
export interface GameEntry extends Record<string, unknown> {
  /**
   * name of the game.
   */
  name: string;
  /**
   * when it was launched.
   */
  launchedAt: Date;
  /**
   * comments about this game.
   */
  comments: string[];
}

/**
 * a well-known game entry, useful for tests
 */
export const defaultGameEntry: GameEntry = {
  name: "Ring of the Elder",
  launchedAt: new Date(),
  comments: [
    "such elden much ring",
    "wow",
  ],
};

/**
 * A very dummy representation of a Movie.
 */
export interface Movie {
  title: string;
}

/**
 * A smartmovie implements Movie but adds some extra functionality.
 */
export class SmartMovie implements Movie {
  readonly title: string;
  constructor(inputTitle: string) {
    this.title = inputTitle.toUpperCase();
  }

  doSomething(): string {
    return this.title;
  }

  static fromJson(jsonString: string): SmartMovie {
    const gotMovie = JSON.parse(jsonString) as Movie;
    return new SmartMovie(gotMovie.title);
  }
}

/**
 * returns the upper of the input, just it.
 * @param input
 */
export function returnUpper(input: string): string {
  return input.toUpperCase();
}

export function screamWithExclamation(
  input: string,
  upperCaser: (x: string) => string,
) {
  return `${upperCaser(input)}!`;
}

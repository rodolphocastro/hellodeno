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

  doSomething() {
    // Do nothing at all
  }
}

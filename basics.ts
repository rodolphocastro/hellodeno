/**
 * just a simple, hard-coded message!
 */
export const aConstValue = "hello, from deno, with love"    // the export keyword means this may be imported by other files

/**
 * a hard-coded hello!
 */
export const hello = "hello!"

/**
 * returns the "hello" const, no matter what.
 */
export function returnsHello() {        // the export keyword may also be used for functions.
    return hello
}

/**
 * a representation of a Living Being, which can be either alive or dead.
 */
export class LivingBeing {      // the export keyword may also be used for classes.
    /**
     * flags whenever this being is alive or not. Defaults to true.
     */
    isAlive: boolean = true

    /**
     * mutates the living being into being dead.
     */
    die() {
        this.isAlive = false
    }
}

/**
 * a representation of a Person, inheriting Living Being and expanding it for human purposes.
 */
export class Person extends LivingBeing {   // the extends keyword allows us to inherit from other classes and expand them
    constructor(public readonly name: string) { //readonly denotes this property cannot be written to
        super();    // ^ also note that by specifying the accessibility Typescript automatically creates this property for this class
    }
}

/**
 * an interface describing anything that is scoreable.
 */
export interface Scoreable {
    /**
     * the current score for this object.
     */
    get score(): number // the "get" keyword allows this to be used as a getter - no need to use () when reading from this

    /**
     * increases the current score.
     */
    increaseScore(): void

    /**
     * decreases the current score.
     */
    decreaseScore(): void
}

/**
 * a representation of a The Sims celebrity, extending a Person and implementing the Scoreable interface.
 */
export class SimsCelebrity extends Person implements Scoreable {
    get score() {
        return this.currentScore
    }

    constructor(name: string, private currentScore: number) {
        super(name);
    }

    decreaseScore() {
        let result = this.score - 1
        this.currentScore = result < 0 ? 0 : result
    }

    increaseScore() {
        let result = this.score + 1
        this.currentScore = result > 5 ? 5 : result
    }
}
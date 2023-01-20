import {assertEquals, assertNotEquals} from "https://deno.land/std/testing/asserts.ts"
import {aConstValue, hello, LivingBeing, Person, returnsHello, Scoreable, SimsCelebrity} from "./basics.ts";

Deno.test("a const never changes", () => {
    // Given
    const expected = aConstValue    // const are immutable variables
    let actual = aConstValue        // let or vars are mutable

    // When
    actual = "something else"

    // Then
    assertNotEquals(actual, expected)
    assertEquals(expected, aConstValue)
})

Deno.test("functions can return something", () => {
    // Given
    const expected = hello

    // When
    const got = returnsHello()

    // Then
    assertEquals(got, expected)
})

Deno.test("classes can be used to organize data", () => {
    // Given
    const expected = false
    const subject = new LivingBeing()

    subject.isAlive = expected  // since "name" is a public get/set we can just write to it

    // When
    const got = subject.isAlive

    // Then
    assertEquals(got, expected)
})

Deno.test("classes and their properties may be mutated", () => {
    // Given
    const expected = false
    const subject = new LivingBeing()

    // When
    subject.die()   // note how this isn't reassigned anywhere
    const got = subject.isAlive

    // Then
    assertEquals(got, expected)
})

Deno.test("classes may be extended (ie: inherited) by using the extends keyword", () => {
    // Given
    const expected = "John Doe"
    const expectedAliveness = false

    // When
    const person = new Person(expected)
    person.die()

    // Then
    assertEquals(person.name, expected)
    assertEquals(person instanceof LivingBeing, true)
    assertEquals(person.isAlive, expectedAliveness)
})

Deno.test("interfaces may be used to describe APIs and Data Contracts", () => {
    // Given
    const name = "Doe, John"
    const startingScore = 3
    // note how we're telling this should be treated as a Scoreable object rather than a SimsCelebrity
    const subject: Scoreable = new SimsCelebrity(name,  startingScore)

    // When
    subject.decreaseScore()
    const lowestScore = subject.score
    subject.increaseScore()
    subject.increaseScore()
    const highestScore = subject.score

    // Then
    assertEquals(lowestScore, startingScore - 1)
    assertEquals(highestScore, startingScore + 1)
    // assertEquals(subject.name, name)    // errors out: Scoreable doesn't have a name!
    assertEquals(subject instanceof SimsCelebrity, true)
    assertEquals((subject as SimsCelebrity).name, name) // works but this could error out if subject wasn't really this type
})
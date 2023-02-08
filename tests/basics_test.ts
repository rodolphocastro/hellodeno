// noinspection JSUnusedAssignment

import { assertEquals, assertNotEquals } from "std-asserts";
import {
  aConstValue,
  hello,
  LivingBeing,
  Person,
  returnsHello,
  Scoreable,
  SimsCelebrity,
  Todo,
} from "../src/basics.ts";

Deno.test("a const never changes", () => {
  // Given
  const expected = aConstValue; // const are immutable variables
  let actual = aConstValue; // let or vars are mutable

  // When
  actual = "something else";

  // Then
  assertNotEquals(actual, expected);
  assertEquals(expected, aConstValue);
});

Deno.test("functions can return something", () => {
  // Given
  const expected = hello;

  // When
  const got = returnsHello();

  // Then
  assertEquals(got, expected);
});

Deno.test("classes can be used to organize data", () => {
  // Given
  const expected = false;
  const subject = new LivingBeing();

  subject.isAlive = expected; // since "name" is a public get/set we can just write to it

  // When
  const got = subject.isAlive;

  // Then
  assertEquals(got, expected);
});

Deno.test("classes and their properties may be mutated", () => {
  // Given
  const expected = false;
  const subject = new LivingBeing();

  // When
  subject.die(); // note how this isn't reassigned anywhere
  const got = subject.isAlive;

  // Then
  assertEquals(got, expected);
});

Deno.test("classes may be extended (ie: inherited) by using the extends keyword", () => {
  // Given
  const expected = "John Doe";
  const expectedAliveness = false;

  // When
  const person = new Person(expected);
  person.die();

  // Then
  assertEquals(person.name, expected);
  assertEquals(person instanceof LivingBeing, true);
  assertEquals(person.isAlive, expectedAliveness);
});

Deno.test("interfaces may be used to describe APIs and Data Contracts", () => {
  // Given
  const name = "Doe, John";
  const startingScore = 3;
  // note how we're telling this should be treated as a Scoreable object rather than a SimsCelebrity
  const subject: Scoreable = new SimsCelebrity(name, startingScore);

  // When
  subject.decreaseScore();
  const lowestScore = subject.score;
  subject.increaseScore();
  subject.increaseScore();
  const highestScore = subject.score;

  // Then
  assertEquals(lowestScore, startingScore - 1);
  assertEquals(highestScore, startingScore + 1);
  // assertEquals(subject.name, name)    // errors out: Scoreable doesn't have a name!
  assertEquals(subject instanceof SimsCelebrity, true);
  assertEquals((subject as SimsCelebrity).name, name); // works but this could error out if subject wasn't really this type
});

Deno.test("interfaces are a perfect fit to deserialize information into", () => {
  // Given
  const expected = "temporary title";
  const source = `{"title": "${expected}"}`;

  // When
  const got: Todo = JSON.parse(source);

  // Then
  assertEquals(got.title, expected);
  assertEquals(got.body, undefined);
});

Deno.test("both classes and interfaces can be used to create JSONs", () => {
  // Given
  const expected: Todo = {
    title: "lorem ipsum",
    body: "an awesome body",
  };
  const expectedPerson = new Person("nameson");

  // When
  const got = JSON.stringify(expected);
  const gotPerson = JSON.stringify(expectedPerson);

  // Then
  assertEquals(got.includes(expected.title), true);
  assertEquals(got.includes(expected.body ?? ""), true);
  assertEquals(gotPerson.includes(expectedPerson.name), true);
  assertEquals(gotPerson.includes(expectedPerson.isAlive.toString()), true);
});

Deno.test("but when using a class to deserialize into methods won't work!", () => {
  // Given
  const expectedPerson = new Person("nameson");
  const personJson = JSON.stringify(expectedPerson);

  // When
  const parsedPerson: Person = JSON.parse(personJson);

  // Then
  assertEquals(parsedPerson.name, expectedPerson.name);
  try {
    parsedPerson.die(); // this will error out because the method is lost when parsing back to a class
    assertEquals(false, true); // dummy assert just to prove this doesn't get executed
  } catch (e) {
    assertEquals(e != undefined, true);
  }
});

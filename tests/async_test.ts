import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.173.0/testing/asserts.ts";
import { doSomething, returnSomethingInUpper } from "../src/async.ts";

Deno.test("deno supports async-await out of the box, simply use await on an async call to wait for it to complete", async () => {
  // Given
  const expected = "hello, async";
  let myValue = "wrong answer"; // note how we initialize with an unexpected value

  // When
  await doSomething(100, () => {
    myValue = expected;
    console.debug("did something");
  });

  // Then
  assertEquals(myValue, expected);
});

Deno.test("deno has all the Typescript perks - thus async-await is actually a sugar for dealing with Promises", async () => {
  // Given
  const base = "hello, can i has caps";

  // When
  const got = await returnSomethingInUpper(base); // note how returnSomethingInUpper actually returns a Promise<string>

  // Then
  assertEquals(got, base.toUpperCase());
});

Deno.test("Promise.all can be used to ensure all Promises are executed", async () => {
  // Given
  const expected = "I did it, Adrian!";
  let firstGot: string | undefined;
  let secondGot: string | undefined;
  const first = doSomething(100, () => {
    firstGot = expected;
  });
  const second = doSomething(150, () => {
    secondGot = expected;
  });

  // When
  await Promise.all([first, second]); // note how we're actually awaiting Promise.all

  // Then
  assertEquals(firstGot, secondGot);
  assertEquals(firstGot, expected);
});

Deno.test("Promise.any returns the first fulfilled Promise but allows others to continue executing", async () => {
  // Given
  const expected = "I did it again, Adrian!";
  let firstGot: string | undefined;
  let secondGot: string | undefined;
  const first = doSomething(100, () => {
    firstGot = expected;
  });
  const second = doSomething(250, () => {
    secondGot = expected;
  });

  // When
  await Promise.any([first, second]);

  // Then
  assertEquals(firstGot, expected);
  assertNotEquals(firstGot, secondGot);
  // workaround to give some time for the second promise to finish
  await new Promise((r) =>
    setTimeout(() => r(assertEquals(firstGot, secondGot)), 175)
  );
});

Deno.test("Promise.race returns the first fulfilled Promise and rejects the others", async () => {
  // Given
  const expected = "I did it again, Adrian!";
  let firstGot: string | undefined;
  const first = doSomething(1, () => {
    firstGot = expected;
  });
  const second = doSomething(2, () => {
    throw "oh no!";
  });

  // When
  await Promise.race([first, second]); // note how little time there is between both promises!

  // Then
  assertEquals(firstGot, expected);
});

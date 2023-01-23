import { assertEquals } from "https://deno.land/std@0.173.0/testing/asserts.ts";
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

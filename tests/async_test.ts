import { assertEquals } from "https://deno.land/std@0.173.0/testing/asserts.ts";
import { doSomething } from "../src/async.ts";

Deno.test("deno suports async-await out of the box, simply use await on an async call to wait for it to complete", async () => {
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

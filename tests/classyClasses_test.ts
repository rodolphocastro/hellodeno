import { describe, it } from "https://deno.land/std@0.173.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.173.0/testing/asserts.ts";
import { Movie } from "../src/classyClasses.ts";

describe("Movie", function () {
  const expectedTitle = "Saw II";
  const systemUnderTest: Movie = {
    title: expectedTitle,
  };

  it("should have a title", function () {
    assertEquals(systemUnderTest.title, expectedTitle);
  });

  const expectedJson = `{"title":"${expectedTitle}"}`;

  it("should be parseable from a json", function () {
    const got = JSON.parse(expectedJson) as Movie;
    assertEquals(got, systemUnderTest);
  });

  it("should be able to stringify to a json", function () {
    const got = JSON.stringify(systemUnderTest);
    assertEquals(got, expectedJson);
  });
});

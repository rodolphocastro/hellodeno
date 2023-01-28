import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.173.0/testing/bdd.ts";
import {
  assertEquals,
  assertNotEquals,
  assertThrows,
} from "https://deno.land/std@0.173.0/testing/asserts.ts";
import {
  Movie,
  returnUpper,
  screamWithExclamation,
  SmartMovie,
} from "../src/classyClasses.ts";
import {
  assertSpyCalls,
  returnsNext,
  spy,
  stub,
} from "https://deno.land/std@0.173.0/testing/mock.ts";

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

describe("SmartMovie", () => {
  const inputTitle = "Saw IV";
  let testSubject: SmartMovie;

  // beforeEach runs before each and every step (it) within the scenario.
  beforeEach(() => {
    testSubject = new SmartMovie(inputTitle);
  });

  it("its constructor should always ask for a title", function () {
    const got = new SmartMovie(inputTitle);
    assertNotEquals(got.title, undefined);
  });

  it("its title should always be uppercase", function () {
    const got = testSubject.title;
    assertEquals(got, inputTitle.toUpperCase());
  });

  // demonstrating that parsing from a json into a class doesn't work that well on Typescript.
  it("should not be recoverable from a json", function () {
    const gotJson = JSON.stringify(testSubject);
    const recoveredObjected = JSON.parse(gotJson) as SmartMovie;
    assertThrows(() => recoveredObjected.doSomething());
  });

  it("should have a method to recover from a json string", function () {
    const gotJson = JSON.stringify(testSubject);
    const got = SmartMovie.fromJson(gotJson);
    assertEquals(got, testSubject);
    got.doSomething(); // should not throw given we just recovered it into a class
  });
});

describe("Mocking can be achieved with native libraries", function () {
  const expectedInput = "leroy jenkins";
  const expectedOutputUpper = expectedInput.toUpperCase();
  const expectedOutputScream = `${expectedOutputUpper}!`;

  it("returnUpper returns an uppercase of an input", function () {
    const got = returnUpper(expectedInput);
    assertEquals(got, expectedOutputUpper);
  });

  it("screamWithExclamation returns an uppercase with !", function () {
    const got = screamWithExclamation(expectedInput, returnUpper);
    assertEquals(got, expectedOutputScream);
  });

  it("screamWithExclamation always calls the input lambda", function () {
    const spiedReturnUpper = spy(returnUpper);
    const got = screamWithExclamation(expectedInput, spiedReturnUpper);
    assertEquals(got, expectedOutputScream);
    assertSpyCalls(spiedReturnUpper, 1);
  });

  it("uppercaser from screamWithExclamation is mockable", function () {
    const wellKnownSmartMovie = new SmartMovie(expectedInput);
    const gotPudim = "pudim";
    const stubbedMovie = stub(
      wellKnownSmartMovie,
      "doSomething",
      returnsNext([expectedInput, gotPudim]),
    );
    assertEquals(wellKnownSmartMovie.doSomething(), expectedInput);
    assertEquals(wellKnownSmartMovie.title, expectedOutputUpper);
    assertEquals(wellKnownSmartMovie.doSomething(), gotPudim);
    stubbedMovie.restore();
    assertNotEquals(wellKnownSmartMovie.doSomething(), expectedInput);
    assertEquals(wellKnownSmartMovie.doSomething(), expectedOutputUpper);
  });
});

import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.173.0/testing/asserts.ts";
import {
  parse,
  stringify,
} from "https://deno.land/std@0.173.0/encoding/toml.ts";

import { defaultGameEntry, GameEntry } from "../src/serialization.ts";

Deno.test("deno has native support to serialize objects to TOML", () => {
  // Given
  const subject: GameEntry = defaultGameEntry;

  // When
  const got = stringify(subject);

  // Then
  assert(got.includes(subject.name));
});

Deno.test("deno also has native support to parse TOML strings into objects", () => {
  // Given
  const subject = `
    name = "${defaultGameEntry.name}"
    launchedAt = ${defaultGameEntry.launchedAt.toISOString()}
    `;

  // When
  const got = parse(subject) as GameEntry;

  // Then
  assertEquals(got.name, defaultGameEntry.name);
  assertEquals(got.launchedAt, defaultGameEntry.launchedAt);
});

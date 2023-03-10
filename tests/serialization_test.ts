import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.173.0/testing/asserts.ts";
import {
  parse,
  stringify,
} from "https://deno.land/std@0.173.0/encoding/toml.ts";
import {
  parse as parseYaml,
  stringify as stringYaml,
} from "https://deno.land/std@0.173.0/encoding/yaml.ts";
import * as base64 from "https://deno.land/std@0.173.0/encoding/base64.ts";

import { defaultGameEntry, GameEntry } from "../src/serialization.ts";

Deno.test("deno has native support to serialize objects to TOML", () => {
  // Given
  const subject: GameEntry = defaultGameEntry;

  // When
  const got = stringify(subject);
  console.debug(got);

  // Then
  assert(got.includes(subject.name));
});

Deno.test("deno also has native support to parse TOML strings into objects", () => {
  // Given
  const subject = `
    name = "${defaultGameEntry.name}"
    launchedAt = ${defaultGameEntry.launchedAt.toISOString()}
    comments = [${defaultGameEntry.comments.map((c) => `"${c}"`)}]
    `;

  // When
  const got = parse(subject) as GameEntry;

  // Then
  assertEquals(got.name, defaultGameEntry.name);
  assertEquals(got.launchedAt, defaultGameEntry.launchedAt);
  assertEquals(got.comments, defaultGameEntry.comments);
});

Deno.test("deno has native support to serialize objects to YAML", () => {
  // Given
  const subject: GameEntry = defaultGameEntry;

  // When
  const got = stringYaml(subject);
  console.debug(got);

  // Then
  assert(got.includes(subject.name));
});

Deno.test("deno has native support to parse YAML strings into objects", () => {
  // Given
  const subject = `
  name: ${defaultGameEntry.name}
  launchedAt: ${defaultGameEntry.launchedAt.toISOString()}
  comments: ${defaultGameEntry.comments.map((c) => `\n    - ${c}`)}
  `;

  // When
  const got = parseYaml(subject) as GameEntry;

  // Then
  assertEquals(got.name, defaultGameEntry.name);
});

Deno.test("standard libraries also allow serializing and deserializing from JSON", () => {
  // Given

  // When
  const gotJson = JSON.stringify(defaultGameEntry);
  const gotFromJson = JSON.parse(gotJson) as GameEntry;

  // Then
  assertEquals(gotFromJson.name, defaultGameEntry.name);
  assert(gotJson.includes(gotFromJson.name));
});

Deno.test("it's also possible to encode a string into and from base64", () => {
  // Given
  const aJson = JSON.stringify(defaultGameEntry);

  // When
  const gotEncoded = base64.encode(aJson);
  const gotDecoded = base64.decode(gotEncoded);
  const got = JSON.parse(new TextDecoder().decode(gotDecoded));

  // Then
  assertEquals(got.name, defaultGameEntry.name);
  assertEquals(got.comments, defaultGameEntry.comments);
  assertNotEquals(gotEncoded, null);
  assertNotEquals(gotDecoded, null);
});

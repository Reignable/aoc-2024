import { describe, expect, it } from "vitest";
import { hello } from "./hello";

describe("hello", () => {
  it("Returns the default", () => {
    expect(hello()).toBe("Hello world!");
  });
});

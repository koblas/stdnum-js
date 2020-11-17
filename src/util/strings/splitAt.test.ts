import { splitAt } from "./splitAt";

describe("splitAt", () => {
  it("basic", () => {
    expect(splitAt("abcdefghij", 3, 6)).toEqual(["abc", "def", "ghij"]);
  });
});

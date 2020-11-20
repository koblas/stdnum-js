import { luhnChecksumDigit, luhnChecksumValue } from "./checksum";

describe("util/checksum", () => {
  describe("luhnChecksumValue", () => {
    it("basic", () => {
      expect(luhnChecksumValue("7894")).toEqual(6);
    });
  });

  describe("luhnChecksumDigit", () => {
    it("basic", () => {
      expect(luhnChecksumDigit("7894")).toEqual("9");
    });
  });
});

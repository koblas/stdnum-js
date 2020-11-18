import { validate, format } from "./nit";
import { InvalidLength, InvalidChecksum } from "../exceptions";

describe("co/nit", () => {
  it("format:213.123.4321", () => {
    const result = format("213.123.4321");

    expect(result).toEqual("213.123.432-1");
  });

  it("validate:213.123.432-1", () => {
    const result = validate("213.123.432-1");

    expect(result.isValid && result.compact).toEqual("2131234321");
  });

  it("validate:21312", () => {
    const result = validate("21312");

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it("validate:2131234325", () => {
    const result = validate("2131234325");

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

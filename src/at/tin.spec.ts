import { validate, format } from "./tin";
import { InvalidLength, InvalidChecksum, InvalidComponent } from "../exceptions";

describe("at/tin", () => {
  it("format:591199013", () => {
    const result = format("591199013");

    expect(result).toEqual("59-119/9013");
  });

  it("validate:59-119/9013", () => {
    const result = validate("59-119/9013");

    expect(result.isValid && result.compact).toEqual("591199013");
  });

  it("validate:660-3", () => {
    const result = validate("660-3");

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it("validate:59-119/9012", () => {
    const result = validate("59-119/9012");

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it("validate:00-119/9012", () => {
    const result = validate("00-119/9012");

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

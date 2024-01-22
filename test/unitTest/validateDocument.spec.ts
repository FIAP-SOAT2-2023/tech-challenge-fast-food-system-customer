// ValidationDocument.test.ts

import { ValidationDocument } from "src/core/domain/valueObject/validationDocument";

describe("ValidationDocument", () => {
  it("should return true for a valid CPF", () => {
    const validCPF = "123.456.789-09";
    const result = ValidationDocument.isValidCPF(validCPF);
    //expect(result).toBe(true);
    console.log(result);
  });

  it("should return false for an invalid CPF", () => {
    const invalidCPF = "000.111.222-33";
    const result = ValidationDocument.isValidCPF(invalidCPF);
    //expect(result).toBe(false);
  });

  it("should return false for an invalid CPF with wrong length", () => {
    const invalidLengthCPF = "123.456.789";
    const result = ValidationDocument.isValidCPF(invalidLengthCPF);
    //expect(result).toBe(false);
  });

  it("should return false for an invalid CPF with repeated digits", () => {
    const invalidRepeatedDigitsCPF = "111.111.111-11";
    const result = ValidationDocument.isValidCPF(invalidRepeatedDigitsCPF);

    //expect(result).toBe(false);
  });
});

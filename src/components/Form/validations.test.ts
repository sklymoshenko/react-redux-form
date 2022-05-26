//@ts-nocheck
import { required, acceptOnlyNumber, maxFileSize, numberRange } from "./validations";

describe("Required", () => {
  test("Returns error without value", () => {
    const req = required("");
    expect(req).not.toBe(undefined);
  });

  test("Returns undefined with value", () => {
    const req = required("test");
    expect(req).toBe(undefined);
  });
});

describe("Only number", () => {
  test("Returns error when value isnt a number", () => {
    const req = acceptOnlyNumber("test");
    expect(req).not.toBe(undefined);
  });

  test("Returns undefined with value type number", () => {
    const req = acceptOnlyNumber(50);
    expect(req).toBe(undefined);
  });
});

describe("Max File Size", () => {
  test("Returns error when size is more than 10MB", () => {
    const file = new File([""], "test.png");
    Object.defineProperty(file, "size", { value: 1024 * 1024 * 10 + 1 });

    const req = maxFileSize(file);
    expect(req).not.toBe(undefined);
  });

  test("Returns undefined with file size less than 10MB", () => {
    const file = new File([""], "test.png");
    Object.defineProperty(file, "size", { value: 1024 * 1024 });

    const req = maxFileSize(file);
    expect(req).toBe(undefined);
  });
});

describe("Number Range", () => {
  test("Returns error if number isnt in range", () => {
    let req = numberRange(501);
    expect(req).not.toBe(undefined);

    req = numberRange(-1);
    expect(req).not.toBe(undefined);
  });

  test("Returns undefined if number is in range", () => {
    let req = numberRange(500);
    expect(req).toBe(undefined);

    req = numberRange(0);
    expect(req).toBe(undefined);

    req = numberRange(10);
    expect(req).toBe(undefined);
  });
});

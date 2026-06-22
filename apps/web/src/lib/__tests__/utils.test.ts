import { describe, expect, it } from "vitest";
import { formatDate, formatPeriod, isPresent, slugify } from "../utils";

describe("isPresent", () => {
  it("returns true for 'present'", () => {
    expect(isPresent("present")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(isPresent("Present")).toBe(true);
    expect(isPresent("PRESENT")).toBe(true);
  });

  it("returns false for a date string", () => {
    expect(isPresent("2023-06")).toBe(false);
  });
});

describe("slugify", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(slugify("My Project")).toBe("my-project");
  });

  it("removes special characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("collapses multiple spaces", () => {
    expect(slugify("a   b")).toBe("a-b");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  hello  ")).toBe("hello");
  });
});

describe("formatDate", () => {
  it("formats a YYYY-MM string as 'Mon YYYY'", () => {
    expect(formatDate("2022-01")).toBe("Jan 2022");
    expect(formatDate("2023-12")).toBe("Dec 2023");
  });

  it("handles single-digit months", () => {
    expect(formatDate("2020-03")).toBe("Mar 2020");
  });
});

describe("formatPeriod", () => {
  it("formats a date range with month names", () => {
    expect(formatPeriod("2022-06", "2023-01")).toBe("Jun 2022 – Jan 2023");
  });

  it("shows '至今' when end is present", () => {
    expect(formatPeriod("2022-06", "present")).toBe("Jun 2022 – 至今");
  });

  it("handles single-digit months", () => {
    expect(formatPeriod("2020-01", "2020-09")).toBe("Jan 2020 – Sep 2020");
  });
});

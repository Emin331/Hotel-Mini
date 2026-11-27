import { describe, expect, it } from "vitest";
import { calculateTotal, countNights, validateBooking, type BookingData } from "./booking";

const today = "2026-12-01";
const valid: BookingData = {
  name: "Anna Kowalska",
  email: "anna@example.com",
  roomId: "deluxe",
  guests: 2,
  checkIn: "2026-12-10",
  checkOut: "2026-12-13",
};

describe("countNights", () => {
  it("counts nights between dates", () => {
    expect(countNights("2026-12-10", "2026-12-13")).toBe(3);
  });

  it("returns 0 for missing or reversed dates", () => {
    expect(countNights("", "2026-12-13")).toBe(0);
    expect(countNights("2026-12-13", "2026-12-10")).toBe(0);
  });
});

describe("calculateTotal", () => {
  it("multiplies nightly price by nights", () => {
    expect(calculateTotal("deluxe", 3)).toBe(360);
  });

  it("returns 0 for an unknown room", () => {
    expect(calculateTotal("penthouse", 3)).toBe(0);
  });
});

describe("validateBooking", () => {
  it("accepts a valid booking", () => {
    expect(validateBooking(valid, today)).toEqual({});
  });

  it("rejects bad name, email and missing room", () => {
    const errors = validateBooking({ ...valid, name: "A", email: "nope", roomId: "" }, today);
    expect(Object.keys(errors).sort()).toEqual(["email", "name", "roomId"]);
  });

  it("rejects past check-in and check-out before check-in", () => {
    const errors = validateBooking(
      { ...valid, checkIn: "2026-11-20", checkOut: "2026-11-19" },
      today,
    );
    expect(errors.checkIn).toBeDefined();
    expect(errors.checkOut).toBeDefined();
  });

  it("rejects too many guests for the room", () => {
    expect(validateBooking({ ...valid, roomId: "standard", guests: 3 }, today).guests).toBeDefined();
  });
});

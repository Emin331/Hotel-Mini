import { findRoom } from "../data/rooms";

export type BookingData = {
  name: string;
  email: string;
  roomId: string;
  guests: number;
  checkIn: string;
  checkOut: string;
};

export type BookingErrors = Partial<Record<keyof BookingData, string>>;

const DAY_MS = 24 * 60 * 60 * 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Local date as YYYY-MM-DD (the format <input type="date"> uses). */
export function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Number of nights between two YYYY-MM-DD dates; 0 if invalid or not after check-in. */
export function countNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  return Math.max(0, Math.round((end - start) / DAY_MS));
}

export function calculateTotal(roomId: string, nights: number): number {
  const room = findRoom(roomId);
  return room ? room.pricePerNight * nights : 0;
}

export function validateBooking(data: BookingData, today: string): BookingErrors {
  const errors: BookingErrors = {};
  const room = findRoom(data.roomId);

  if (data.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(data.email.trim())) errors.email = "Please enter a valid email.";
  if (!room) errors.roomId = "Please select a room.";

  if (!data.checkIn) errors.checkIn = "Please choose a check-in date.";
  else if (data.checkIn < today) errors.checkIn = "Check-in can't be in the past.";

  if (!data.checkOut) errors.checkOut = "Please choose a check-out date.";
  else if (data.checkIn && countNights(data.checkIn, data.checkOut) < 1)
    errors.checkOut = "Check-out must be after check-in.";

  if (room && (data.guests < 1 || data.guests > room.maxGuests))
    errors.guests = `${room.name} fits up to ${room.maxGuests} guests.`;

  return errors;
}

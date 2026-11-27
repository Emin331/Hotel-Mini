import { useState, type ChangeEvent, type FormEvent } from "react";
import { findRoom, rooms } from "../data/rooms";
import {
  calculateTotal,
  countNights,
  toDateInputValue,
  validateBooking,
  type BookingData,
  type BookingErrors,
} from "../utils/booking";

type BookingFormProps = {
  selectedRoomId: string;
};

const emptyForm: BookingData = {
  name: "",
  email: "",
  roomId: "",
  guests: 1,
  checkIn: "",
  checkOut: "",
};

type Confirmation = { name: string; roomName: string; nights: number; total: number };

function BookingForm({ selectedRoomId }: BookingFormProps) {
  const [form, setForm] = useState<BookingData>(emptyForm);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const [lastSelectedRoomId, setLastSelectedRoomId] = useState(selectedRoomId);

  const today = toDateInputValue(new Date());

  // A "Book" click on a room card preselects that room here
  // (state adjusted during render instead of in an effect).
  if (selectedRoomId !== lastSelectedRoomId) {
    setLastSelectedRoomId(selectedRoomId);
    if (selectedRoomId) {
      setForm((prev) => ({ ...prev, roomId: selectedRoomId }));
      setErrors((prev) => ({ ...prev, roomId: undefined }));
    }
  }

  const room = findRoom(form.roomId);
  const nights = countNights(form.checkIn, form.checkOut);
  const total = calculateTotal(form.roomId, nights);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === "guests" ? Number(value) : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setConfirmation(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateBooking(form, today);
    setErrors(found);
    if (Object.keys(found).length > 0 || !room) return;

    setConfirmation({ name: form.name.trim(), roomName: room.name, nights, total });
    setForm(emptyForm);
  }

  const fieldError = (field: keyof BookingData) =>
    errors[field] ? (
      <span className="field-error" id={`${field}-error`} role="alert">
        {errors[field]}
      </span>
    ) : null;

  const errorProps = (field: keyof BookingData) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <section id="booking" className="booking">
      <div className="booking-content">
        <p className="small-title">BOOK YOUR STAY</p>
        <h2>Reserve your room</h2>

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <label>
            Full name
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              {...errorProps("name")}
            />
            {fieldError("name")}
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              {...errorProps("email")}
            />
            {fieldError("email")}
          </label>

          <label>
            Room
            <select name="roomId" value={form.roomId} onChange={handleChange} {...errorProps("roomId")}>
              <option value="" disabled>
                Select room
              </option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — ${r.pricePerNight}/night
                </option>
              ))}
            </select>
            {fieldError("roomId")}
          </label>

          <label>
            Guests
            <input
              name="guests"
              type="number"
              min={1}
              max={room?.maxGuests ?? 4}
              value={form.guests}
              onChange={handleChange}
              {...errorProps("guests")}
            />
            {fieldError("guests")}
          </label>

          <label>
            Check-in
            <input
              name="checkIn"
              type="date"
              min={today}
              value={form.checkIn}
              onChange={handleChange}
              {...errorProps("checkIn")}
            />
            {fieldError("checkIn")}
          </label>

          <label>
            Check-out
            <input
              name="checkOut"
              type="date"
              min={form.checkIn || today}
              value={form.checkOut}
              onChange={handleChange}
              {...errorProps("checkOut")}
            />
            {fieldError("checkOut")}
          </label>

          {room && nights > 0 && (
            <div className="booking-summary" aria-live="polite">
              <span>
                {room.name} · {nights} {nights === 1 ? "night" : "nights"} × ${room.pricePerNight}
              </span>
              <strong>Total: ${total}</strong>
            </div>
          )}

          <button type="submit">Book Now</button>

          {confirmation && (
            <p className="booking-success" role="status">
              Thank you, {confirmation.name}! Your {confirmation.roomName} is reserved for{" "}
              {confirmation.nights} {confirmation.nights === 1 ? "night" : "nights"} — total $
              {confirmation.total}.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default BookingForm;

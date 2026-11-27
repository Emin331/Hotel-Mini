export type Room = {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  image: string;
  features: string[];
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const rooms: Room[] = [
  {
    id: "standard",
    name: "Standard Room",
    description: "Comfortable room for 1–2 guests.",
    pricePerNight: 80,
    maxGuests: 2,
    image: unsplash("photo-1611892440504-42a792e24d32"),
    features: ["Queen bed", "Free Wi-Fi", "City view"],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    description: "Spacious room with modern facilities.",
    pricePerNight: 120,
    maxGuests: 3,
    image: unsplash("photo-1590490360182-c33d57733427"),
    features: ["King bed", "Work desk", "Breakfast included"],
  },
  {
    id: "suite",
    name: "Luxury Suite",
    description: "Premium room for a special stay.",
    pricePerNight: 190,
    maxGuests: 4,
    image: unsplash("photo-1582719478250-c89cae4dc85b"),
    features: ["Living area", "Bathtub", "Late checkout"],
  },
];

export const findRoom = (id: string) => rooms.find((room) => room.id === id);

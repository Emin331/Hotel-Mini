import type { Room } from "../data/rooms";

type RoomCardProps = {
  room: Room;
  onBook: (roomId: string) => void;
};

function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <article className="room-card">
      <img className="room-image" src={room.image} alt={room.name} loading="lazy" />

      <div className="room-content">
        <h3>{room.name}</h3>
        <p>{room.description}</p>

        <ul className="room-features">
          <li>Up to {room.maxGuests} guests</li>
          {room.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="room-bottom">
          <strong>${room.pricePerNight} / night</strong>
          <button type="button" onClick={() => onBook(room.id)}>
            Book
          </button>
        </div>
      </div>
    </article>
  );
}

export default RoomCard;

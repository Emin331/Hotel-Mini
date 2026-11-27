import { rooms } from "../data/rooms";
import RoomCard from "./RoomCard";

type RoomsProps = {
  onBook: (roomId: string) => void;
};

function Rooms({ onBook }: RoomsProps) {
  return (
    <section id="rooms" className="rooms-section">
      <div className="section-title">
        <p className="small-title">OUR ROOMS</p>
        <h2>Choose your room</h2>
      </div>

      <div className="rooms">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onBook={onBook} />
        ))}
      </div>
    </section>
  );
}

export default Rooms;

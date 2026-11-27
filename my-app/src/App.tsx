import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Rooms from "./components/Rooms";
import BookingForm from "./components/BookingForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [selectedRoomId, setSelectedRoomId] = useState("");

  function handleBookRoom(roomId: string) {
    setSelectedRoomId(roomId);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Rooms onBook={handleBookRoom} />
        <BookingForm selectedRoomId={selectedRoomId} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

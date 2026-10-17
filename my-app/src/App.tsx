import "./App.css";
import hotelImage from "./assets/images.jpg";

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">GrandStay</div>

        <nav>
          <a href="#home">Home</a>
          <a href="#rooms">Rooms</a>
          <a href="#booking">Booking</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#booking" className="nav-btn">
          Book Now
        </a>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.45),
            rgba(0, 0, 0, 0.45)
          ), url(${hotelImage})`,
        }}
      >
        <div className="hero-content">
          <p className="small-title">WELCOME TO GRANDSTAY</p>

          <h1>
            Simple comfort.
            <br />
            Better stays.
          </h1>

          <p>
            A cozy hotel with comfortable rooms and everything
            you need for a relaxing stay.
          </p>

          <a href="#rooms" className="primary-btn">
            View Rooms
          </a>
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="rooms-section">
        <div className="section-title">
          <p className="small-title">OUR ROOMS</p>
          <h2>Choose your room</h2>
        </div>

        <div className="rooms">
          {/* Room 1 */}
          <div className="room-card">
            <div className="room-image room-one"></div>

            <div className="room-content">
              <h3>Standard Room</h3>

              <p>
                Comfortable room for 1–2 guests.
              </p>

              <div className="room-bottom">
                <strong>$80 / night</strong>

                <a href="#booking">
                  Book
                </a>
              </div>
            </div>
          </div>

          {/* Room 2 */}
          <div className="room-card">
            <div className="room-image room-two"></div>

            <div className="room-content">
              <h3>Deluxe Room</h3>

              <p>
                Spacious room with modern facilities.
              </p>

              <div className="room-bottom">
                <strong>$120 / night</strong>

                <a href="#booking">
                  Book
                </a>
              </div>
            </div>
          </div>

          {/* Room 3 */}
          <div className="room-card">
            <div className="room-image room-three"></div>

            <div className="room-content">
              <h3>Luxury Suite</h3>

              <p>
                Premium room for a special stay.
              </p>

              <div className="room-bottom">
                <strong>$190 / night</strong>

                <a href="#booking">
                  Book
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="booking">
        <div className="booking-content">
          <p className="small-title">
            BOOK YOUR STAY
          </p>

          <h2>
            Reserve your room
          </h2>

          <form className="booking-form">
            <input
              type="text"
              placeholder="Your name"
            />

            <input
              type="email"
              placeholder="Your email"
            />

            <select defaultValue="">
              <option value="" disabled>
                Select room
              </option>

              <option>
                Standard Room
              </option>

              <option>
                Deluxe Room
              </option>

              <option>
                Luxury Suite
              </option>
            </select>

            <input
              type="date"
            />

            <input
              type="date"
            />

            <button type="submit">
              Book Now
            </button>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div>
          <p className="small-title">
            CONTACT
          </p>

          <h2>
            Need help?
          </h2>

          <p>
            Contact us if you have any questions
            about your stay.
          </p>
        </div>

        <div className="contact-info">
          <p>📍 Warsaw, Poland</p>
          <p>📞 +48 123 456 789</p>
          <p>✉️ hello@grandstay.com</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="logo">
          GrandStay
        </div>

        <p>
          © 2026 GrandStay Hotel
        </p>
      </footer>
    </div>
  );
}

export default App;
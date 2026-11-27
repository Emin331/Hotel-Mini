function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="small-title">WELCOME TO GRANDSTAY</p>

        <h1>
          Simple comfort.
          <br />
          Better stays.
        </h1>

        <p>A cozy hotel with comfortable rooms and everything you need for a relaxing stay.</p>

        <div className="hero-actions">
          <a href="#rooms" className="primary-btn">
            View Rooms
          </a>
          <a href="#booking" className="secondary-btn">
            Book a Stay
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

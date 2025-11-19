export default function Home() {
  return (
    <>
      {/* FULL-WIDTH hero */}
      <section className="hero-section d-flex align-items-center text-center" style={{ minHeight: "80vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-white py-5">
              <h1 className="fw-bold display-4 mb-3">
                Craft Unforgettable Itineraries <br />
                <span className="hero-accent">with AI Trip Planner</span>
              </h1>
              <p className="lead mb-4">
                Your personal trip planner and travel curator, creating custom itineraries
                tailored to your interests and budget.
              </p>
              <a href="/tripplanner" className="btn btn-primary btn-lg">Start Planning</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features strip --- */}
<section className="py-5 bg-light border-top border-bottom">
  <div className="container">
    <div className="row text-center g-4">

      <div className="col-md-4">
        <div className="h-100 p-4">
          <div className="display-5 mb-2">🛠️</div>
          <h4 className="fw-bold mb-2">Adjust your itinerary</h4>
          <p className="text-muted mb-0">
            Reorder, add, or remove locations, all on a single page with ease.
          </p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="h-100 p-4">
          <div className="display-5 mb-2">🤖</div>
          <h4 className="fw-bold mb-2">AI Travel</h4>
          <p className="text-muted mb-0">
            Personalized accommodation suggestions and smart recommendations for your trip.
          </p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="h-100 p-4">
          <div className="display-5 mb-2">📄</div>
          <h4 className="fw-bold mb-2">Offline Access</h4>
          <p className="text-muted mb-0">
            Download and save your itinerary as PDF to access anytime, anywhere.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

{/* --- Big centered CTA --- */}
<section className="py-5">
  <div className="container text-center">
    <h2 className="fw-bold mb-3">Everything you need for planning your trip</h2>
    <p className="text-muted mb-4">
      Skip the manual trip planning and start your effortless journey with Trip Planner AI today, at no cost.
    </p>
    <a href="/tripplanner" className="btn btn-primary btn-lg">Try Now</a>
  </div>
</section>


      {/* Map + FAQ keep using containers below */}
      {/* ... (rest of your sections) ... */}
    </>
  );
}

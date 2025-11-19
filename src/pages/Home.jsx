// src/pages/Home.jsx
import React from "react";
import WeatherStrip from "../components/WeatherStrip";
import "../components/weather-strip.css";
import MapSection from "../components/MapSection";
import "../components/map-section.css";


export default function Home() {
  return (
    <>
      {/* FULL-WIDTH hero */}
      <section
        className="hero-section d-flex align-items-center text-center"
        style={{
          minHeight: "80vh",
          background: "linear-gradient(135deg,#0f0f0f,#111) center/cover no-repeat",
          color: "#fff"
        }}
      >
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
              <a href="/tripplanner.html" className="btn btn-primary btn-lg">Start Planning</a>
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
                <p className="text-muted mb-0">Reorder, add, or remove locations, all on a single page with ease.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="h-100 p-4">
                <div className="display-5 mb-2">🤖</div>
                <h4 className="fw-bold mb-2">AI Travel</h4>
                <p className="text-muted mb-0">Personalized accommodation suggestions and smart recommendations for your trip.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="h-100 p-4">
                <div className="display-5 mb-2">📄</div>
                <h4 className="fw-bold mb-2">Offline Access</h4>
                <p className="text-muted mb-0">Download and save your itinerary as PDF to access anytime, anywhere.</p>
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
          <a href="/tripplanner.html" className="btn btn-primary btn-lg">Try Now</a>
        </div>
      </section>

      {/* --- Weather strip (placed here, before the map) --- */}
      <WeatherStrip />

      {/* --- Map embed --- */}
      <MapSection />
      
      {/* --- FAQ --- */}
      <section id="faq" className="py-5">
        <div className="container">
          <h3 className="fw-bold mb-4 text-center">Frequently Asked Questions</h3>
          <div className="accordion" id="faqAccordion">

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq1">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                  What is Traverly?
                </button>
              </h2>
              <div id="collapse1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body">Traverly is an AI-powered trip planner that creates customized travel itineraries based on your destination, budget, dates, and interests.</div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq2">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                  Is Traverly free to use?
                </button>
              </h2>
              <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">Yes, Traverly is currently free for all users.</div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq3">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                  Can I save my itinerary offline?
                </button>
              </h2>
              <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">Absolutely! You can download your trip plan as a PDF and access it without an internet connection.</div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq4">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
                  How does AI Travel work?
                </button>
              </h2>
              <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">The AI analyzes your preferences, dates, and budget to recommend optimal destinations, accommodations, and activities.</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

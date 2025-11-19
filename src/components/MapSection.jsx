// src/components/MapSection.jsx
import React, { useState } from "react";
import "./map-section.css";

export default function MapSection({
  // default center set to New Delhi (like original). Format: "lat,lon" or address query.
  embedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.84396701747!2d77.0688995!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd36d2ad1c8d%3A0xc28d8f0eb3cf7018!2sNew%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1698691922394!5m2!1sen!2sin",
  height = 480,
  title = "Traverly map",
}) {
  const [loaded, setLoaded] = useState(false);

  // small thumbnail: while iframe not loaded show a lightweight placeholder
  return (
    <section className="map-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="map-card shadow-sm overflow-hidden rounded-3">
              {/* placeholder area — shows while iframe loading */}
              {!loaded && (
                <div className="map-placeholder d-flex align-items-center justify-content-center">
                  <div>
                    <div className="placeholder-title fw-bold">Explore destinations</div>
                    <div className="small text-muted">Interactive map loading…</div>
                    <div className="mt-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("New Delhi, India")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-primary btn-sm"
                      >
                        View larger map
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* actual iframe */}
              <div className="ratio ratio-16x9 map-iframe-wrap" style={{ height }}>
                <iframe
                  title={title}
                  src={embedSrc}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setLoaded(true)}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

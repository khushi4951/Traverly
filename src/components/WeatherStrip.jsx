// src/components/WeatherStrip.jsx
import React, { useEffect, useRef, useState } from "react";
import "./weather-strip.css";

const CITIES = [
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Dubai", lat: 25.276987, lon: 55.296249 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Rome", lat: 41.9028, lon: 12.4964 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
  { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "Toronto", lat: 43.6532, lon: -79.3832 },
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
];

function emojiFor(weathercode) {
  if (weathercode === 0) return "☀️";
  if (weathercode >= 1 && weathercode <= 3) return "⛅";
  if (weathercode >= 45 && weathercode <= 48) return "🌫️";
  if ((weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 82)) return "🌧️";
  if ((weathercode >= 71 && weathercode <= 77) || (weathercode >= 85 && weathercode <= 86)) return "❄️";
  if (weathercode >= 95) return "⛈️";
  return "🌤️";
}

export default function WeatherStrip({ cities = CITIES }) {
  const [items, setItems] = useState([]); // { name, temp, windspeed, winddir, code, time, error }
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const results = [];
      for (const c of cities) {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true`
          );
          if (!res.ok) throw new Error("fetch failed");
          const j = await res.json();
          const w = j.current_weather || null;
          results.push({
            name: c.name,
            temp: w ? Math.round(w.temperature) : null,
            windspeed: w ? Math.round(w.windspeed) : null,
            winddir: w ? Math.round(w.winddirection) : null,
            code: w ? w.weathercode : null,
            time: w ? w.time : null,
            error: null,
          });
        } catch (err) {
          results.push({ name: c.name, error: err.message });
        }
        if (!mounted) break;
      }
      if (mounted) setItems(results);
    })();
    return () => { mounted = false; };
  }, [cities]);

  // scroll controls
  const scrollByAmount = (amount) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollLeft = () => {
    const w = containerRef.current?.firstElementChild?.clientWidth || 240;
    scrollByAmount(-Math.round(w + 16)); // card + gap
  };
  const scrollRight = () => {
    const w = containerRef.current?.firstElementChild?.clientWidth || 240;
    scrollByAmount(Math.round(w + 16));
  };

  return (
    <section className="weather-section py-5 bg-white">
      <div className="container position-relative">
        <h2 className="fw-semibold mb-1 text-center" style={{ color: "#1f8a52" }}>⁘ Live Weather In Top Cities ⁘</h2>
        <p className="text-muted text-center mb-4">Scroll through live weather updates from around the world</p>

        <button
          className="btn btn-light weather-nav left-btn shadow-sm"
          onClick={scrollLeft}
          aria-label="Scroll left"
          title="Previous"
        >‹</button>

        <div
          className="weather-row d-flex gap-4 pb-3 px-2 mx-5 overflow-auto"
          ref={containerRef}
          role="list"
        >
          {items.length === 0 && (
            // placeholder skeleton items
            Array.from({ length: 5 }).map((_, i) => (
              <div className="weather-card skeleton" key={i}>
                <div className="weather-icon mb-2">⛅</div>
                <h5 className="fw-semibold mb-1">Loading…</h5>
                <div className="weather-temp mb-1">—°C</div>
                <p className="small text-muted mb-0">— • — km/h</p>
              </div>
            ))
          )}

          {items.map((it, i) => (
            <div className="weather-card" key={i} role="listitem">
              <div className="weather-icon mb-2">{it.code != null ? emojiFor(it.code) : "⛅"}</div>
              <h5 className="fw-semibold mb-1">{it.name}</h5>
              <div className="weather-temp mb-1">{it.temp != null ? `${it.temp}°C` : "—°C"}</div>
              <p className="small text-muted mb-0">
                {it.winddir != null ? `${it.winddir}° wind • ${it.windspeed} km/h` : "—"}
              </p>
              {it.time && <div className="small text-muted mt-2">Last update: {it.time}</div>}
              {it.error && <div className="text-danger small mt-2">{it.error}</div>}
            </div>
          ))}
        </div>

        <button
          className="btn btn-light weather-nav right-btn shadow-sm"
          onClick={scrollRight}
          aria-label="Scroll right"
          title="Next"
        >›</button>
      </div>
    </section>
  );
}

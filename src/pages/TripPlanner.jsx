// src/pages/TripPlanner.jsx
import { useState } from "react";
import Summary from "../components/Summary";

const ALL_ACTIVITIES = ["Museum", "Adventure", "Nightlife", "Shopping", "Nature", "Food"];

export default function TripPlanner() {
  const [trip, setTrip] = useState(null);

  // local form state
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    companion: "",
    diet: "",
    activities: [],
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === "activities") {
      const next = new Set(form.activities);
      checked ? next.add(value) : next.delete(value);
      setForm((f) => ({ ...f, activities: Array.from(next) }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // simple validation
    if (!form.destination || !form.startDate || !form.endDate || !form.budget || !form.companion || !form.diet) {
      alert("Please fill all required fields.");
      return;
    }
    setTrip(form); // show summary
    // later we’ll also trigger suggestions here
  }

  return (
    <div className="row g-4">
      {/* Left column: Summary */}
      <div className="col-lg-4 order-lg-1 order-2">
        <Summary trip={trip} />
      </div>

      {/* Right column: Form */}
      <div className="col-lg-8 order-lg-2 order-1">
        <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
          <h4 className="fw-bold mb-3">Plan your trip</h4>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Destination</label>
              <input
                name="destination"
                className="form-control"
                value={form.destination}
                onChange={handleChange}
                placeholder="e.g., Paris"
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Budget</label>
              <select
                name="budget"
                className="form-select"
                value={form.budget}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Companion</label>
              <select
                name="companion"
                className="form-select"
                value={form.companion}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Solo</option>
                <option>Friends</option>
                <option>Family</option>
                <option>Couple</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Diet</label>
              <select
                name="diet"
                className="form-select"
                value={form.diet}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Veg</option>
                <option>Non-Veg</option>
                <option>Vegan</option>
                <option>Jain</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">Activities</label>
              <div className="d-flex flex-wrap gap-3">
                {ALL_ACTIVITIES.map((a) => (
                  <div className="form-check" key={a}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={a}
                      name="activities"
                      value={a}
                      checked={form.activities.includes(a)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={a}>
                      {a}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary">Generate Plan</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// src/components/Summary.jsx
export default function Summary({ trip }) {
  if (!trip) return null;

  return (
    <div className="card border-0 shadow-sm p-3">
      <h5 className="fw-bold text-primary mb-2">Your Trip Summary</h5>
      <ul className="list-unstyled mb-0">
        <li><strong>Destination:</strong> {trip.destination}</li>
        <li><strong>Dates:</strong> {trip.startDate} → {trip.endDate}</li>
        <li><strong>Budget:</strong> {trip.budget}</li>
        <li><strong>Companion:</strong> {trip.companion}</li>
        <li><strong>Diet:</strong> {trip.diet}</li>
        <li><strong>Activities:</strong> {trip.activities?.join(", ") || "—"}</li>
      </ul>
    </div>
  );
}

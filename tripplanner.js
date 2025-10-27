document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tripForm');
  const resultSection = document.getElementById('resultSection');
  const summaryDiv = document.getElementById('tripSummary');
  const hotelDiv = document.getElementById('hotelSuggestions');
  const spotsDiv = document.getElementById('touristSpots');

  let selectedBudget = '';
  let selectedCompanion = '';
  let selectedActivities = [];

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.selectable');
    if (!card) return;

    if (card.classList.contains('budget-card')) {
      document.querySelectorAll('.budget-card').forEach(c => c.classList.remove('border-primary', 'bg-light'));
      card.classList.add('border-primary', 'bg-light');
      selectedBudget = card.dataset.budget;
    }

    if (card.classList.contains('companion-card')) {
      document.querySelectorAll('.companion-card').forEach(c => c.classList.remove('border-success', 'bg-light'));
      card.classList.add('border-success', 'bg-light');
      selectedCompanion = card.dataset.companion;
    }

    if (card.classList.contains('activity-card')) {
      const activity = card.dataset.activity;
      if (selectedActivities.includes(activity)) {
        selectedActivities = selectedActivities.filter(a => a !== activity);
        card.classList.remove('border-warning', 'bg-light');
      } else {
        selectedActivities.push(activity);
        card.classList.add('border-warning', 'bg-light');
      }
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const destination = document.getElementById('destination').value.trim();
    const travelDate = document.getElementById('travelDate').value;
    const days = document.getElementById('days').value;
    const nonVeg = document.getElementById('nonVeg').checked;
    const veg = document.getElementById('veg').checked;

    if (!destination || !travelDate || !days || !selectedBudget || !selectedCompanion || selectedActivities.length === 0 || (!nonVeg && !veg)) {
      return alert('Please complete all fields before submitting.');
    }

    const tripData = {
      destination,
      travelDate,
      days,
      budget: selectedBudget,
      companion: selectedCompanion,
      activities: selectedActivities,
      dietary: nonVeg && veg ? 'Non Veg & Veg' : nonVeg ? 'Non Vegetarian' : 'Vegetarian'
    };

    displaySummary(tripData);
    showSuggestions(tripData);
    resultSection.style.display = 'block';
  });

  function displaySummary(data) {
    summaryDiv.innerHTML = `
      <ul class="list-unstyled mb-3">
        <li><strong>Destination:</strong> ${data.destination}</li>
        <li><strong>Travel Date:</strong> ${data.travelDate}</li>
        <li><strong>Duration:</strong> ${data.days} days</li>
        <li><strong>Budget:</strong> ${data.budget}</li>
        <li><strong>Companion:</strong> ${data.companion}</li>
        <li><strong>Activities:</strong> ${data.activities.join(', ')}</li>
        <li><strong>Dietary:</strong> ${data.dietary}</li>
      </ul>
    `;
  }

  function showSuggestions(data) {
    hotelDiv.innerHTML = `
      <div class="card p-3 mb-2">🏨 ${data.destination} Grand Hotel</div>
      <div class="card p-3 mb-2">🛏️ Comfort Stay ${data.destination}</div>
      <div class="card p-3 mb-2">🌇 Budget Inn ${data.destination}</div>
    `;
    spotsDiv.innerHTML = `
      <div class="card p-3 mb-2">📍 Central Park ${data.destination}</div>
      <div class="card p-3 mb-2">📍 Historic Museum ${data.destination}</div>
      <div class="card p-3 mb-2">📍 City Tower ${data.destination}</div>
    `;
  }
});

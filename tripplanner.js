document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const summaryDiv = document.getElementById('tripSummary');

  let selectedBudget = '';
  let selectedCompanion = '';
  let selectedActivities = [];

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.selectable');
    if (!card) return; // not a clickable card

    // ---- Budget ----
    if (card.classList.contains('budget-card')) {
      document.querySelectorAll('.budget-card').forEach(c => c.classList.remove('border-primary', 'bg-light'));
      card.classList.add('border-primary', 'bg-light');
      selectedBudget = card.dataset.budget;
    }

    // ---- Companion ----
    if (card.classList.contains('companion-card')) {
      document.querySelectorAll('.companion-card').forEach(c => c.classList.remove('border-success', 'bg-light'));
      card.classList.add('border-success', 'bg-light');
      selectedCompanion = card.dataset.companion;
    }

    // ---- Activities ----
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

  // ---- Form submit ----
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const destination = document.getElementById('destination').value.trim();
    const travelDate = document.getElementById('travelDate').value;
    const days = document.getElementById('days').value;
    const nonVeg = document.getElementById('nonVeg').checked;
    const veg = document.getElementById('veg').checked;

    // Validation
    if (!destination) return alert('Please enter a destination.');
    if (!travelDate) return alert('Please select a travel date.');
    if (!days || days < 1) return alert('Please enter valid days.');
    if (!selectedBudget) return alert('Please select a budget range.');
    if (!selectedCompanion) return alert('Please select a travel companion.');
    if (selectedActivities.length === 0) return alert('Please select at least one activity.');
    if (!nonVeg && !veg) return alert('Please select at least one dietary preference.');

    const tripData = {
      destination,
      travelDate,
      days,
      budget: selectedBudget,
      companion: selectedCompanion,
      activities: selectedActivities,
      dietary: nonVeg && veg ? 'Non Veg & Veg' : nonVeg ? 'Non Vegetarian' : 'Vegetarian'
    };

    localStorage.setItem('tripData', JSON.stringify(tripData));
    displaySummary(tripData);
  });

  // ---- Display ----
  function displaySummary(data) {
    summaryDiv.innerHTML = `
      <div class="card shadow-sm p-4 mt-4 border-0">
        <h4 class="fw-bold mb-3 text-primary">Your Trip Summary</h4>
        <ul class="list-unstyled">
          <li><strong>Destination:</strong> ${data.destination}</li>
          <li><strong>Travel Date:</strong> ${data.travelDate}</li>
          <li><strong>Duration:</strong> ${data.days} days</li>
          <li><strong>Budget:</strong> ${data.budget}</li>
          <li><strong>Travel Companion:</strong> ${data.companion}</li>
          <li><strong>Activities:</strong> ${data.activities.join(', ')}</li>
          <li><strong>Dietary Preferences:</strong> ${data.dietary}</li>
        </ul>
      </div>
    `;
  }
});


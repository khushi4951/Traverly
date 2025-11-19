document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tripForm');
  const resultSection = document.getElementById('resultSection');
  const summaryDiv = document.getElementById('tripSummary');
  const suggestionsDiv = document.getElementById('suggestions');

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


  form.addEventListener('submit', async (e) => {
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

// Tell React that the data is ready
window.dispatchEvent(new CustomEvent('TRIP_DATA_READY', { detail: tripData }));

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

  async function fetchSuggestions(destination) {
    suggestionsDiv.innerHTML = `<p class="text-muted">Fetching hotels and tourist spots for ${destination}...</p>`;

    try {
      const [hotelsRes, spotsRes] = await Promise.all([
        fetch(`http://localhost:3000/hotels?destination=${encodeURIComponent(destination)}`),
        fetch(`http://localhost:3000/spots?destination=${encodeURIComponent(destination)}`)
      ]);

      const hotels = await hotelsRes.json();
      const spots = await spotsRes.json();

      if (hotels.length === 0 && spots.length === 0) {
        suggestionsDiv.innerHTML = `<p class="text-danger">No data found for "${destination}". Try another location.</p>`;
        return;
      }

      suggestionsDiv.innerHTML = `
        <div class="card shadow-sm border-0 p-3 mb-4">
          ${hotels.length ? `
            <h4 class="fw-bold mb-3 text-primary">🏨 Hotel Suggestions</h4>
            <div class="row g-3">
              ${hotels.map(h => `
                <div class="col-12">
                  <div class="card border-0 shadow-sm mb-3">
                    <div class="row g-0">
                      <div class="col-4">
                        <img src="${h.imageUrl || 'assets/default-hotel.jpg'}" class="img-fluid rounded-start" alt="${h.name}">
                      </div>
                      <div class="col-8">
                        <div class="card-body">
                          <h6 class="card-title mb-1">${h.name}</h6>
                          <p class="small text-muted mb-1">${h.description || ''}</p>
                          <p class="mb-1"><strong>${h.price}</strong> • ⭐ ${h.rating}</p>
                          ${h.mapUrl ? `<a href="${h.mapUrl}" target="_blank" class="btn btn-sm btn-outline-primary">📍 View Map</a>` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${spots.length ? `
            <h4 class="fw-bold mt-4 mb-3 text-primary">🗺️ Tourist Highlights</h4>
            <div class="row g-3">
              ${spots.map(s => `
                <div class="col-12">
                  <div class="card border-0 shadow-sm mb-3">
                    <div class="row g-0">
                      <div class="col-4">
                        <img src="${s.imageUrl || 'assets/default-spot.jpg'}" class="img-fluid rounded-start" alt="${s.place}">
                      </div>
                      <div class="col-8">
                        <div class="card-body">
                          <h6 class="card-title mb-1">${s.place}</h6>
                          <p class="small text-muted mb-1">${s.desc || ''}</p>
                          ${s.category ? `<span class="badge bg-info text-dark">${s.category}</span>` : ''}
                          ${s.mapUrl ? `<a href="${s.mapUrl}" target="_blank" class="btn btn-sm btn-outline-primary ms-2">📍 Map</a>` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      suggestionsDiv.innerHTML = `<p class="text-danger">Failed to load suggestions. Please check your server.</p>`;
    }
  }
});

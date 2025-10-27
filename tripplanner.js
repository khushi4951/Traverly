// document.addEventListener('DOMContentLoaded', () => {

//   const form = document.querySelector('form');
//   const summaryDiv = document.getElementById('tripSummary');
//   // ---- STATE VARIABLES ----
//   let selectedBudget = '';
//   let selectedCompanion = '';
//   let selectedActivities = [];

//   // ---- CLICKABLE SELECTION HANDLERS ----
//   // Budget cards
//   const budgetCards = document.querySelectorAll('.budget-card');
//   budgetCards.forEach(card => {
//     card.addEventListener('click', () => {
//       budgetCards.forEach(c => c.classList.remove('border-primary', 'bg-light'));
//       card.classList.add('border-primary', 'bg-light');
//       selectedBudget = card.dataset.budget;
//     });
//   });

//   // Companion cards
//   const companionCards = document.querySelectorAll('.companion-card');
//   companionCards.forEach(card => {
//     card.addEventListener('click', () => {
//       companionCards.forEach(c => c.classList.remove('border-success', 'bg-light'));
//       card.classList.add('border-success', 'bg-light');
//       selectedCompanion = card.dataset.companion;
//     });
//   });

//   // Activity cards
//   const activityCards = document.querySelectorAll('.activity-card');
//   activityCards.forEach(card => {
//     card.addEventListener('click', () => {
//       const activity = card.dataset.activity;

//       // Toggle selection
//       if (selectedActivities.includes(activity)) {
//         selectedActivities = selectedActivities.filter(a => a !== activity);
//         card.classList.remove('border-warning', 'bg-light');
//       } else {
//         selectedActivities.push(activity);
//         card.classList.add('border-warning', 'bg-light');
//       }
//     });
//   });

//   // ---- LOAD EXISTING DATA ----
//   const savedData = JSON.parse(localStorage.getItem('tripData'));
//   if (savedData) {
//     displaySummary(savedData);
//   }

//   // ---- FORM SUBMIT ----
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const destination = document.getElementById('destination').value.trim();
//     const travelDate = document.getElementById('travelDate').value;
//     const days = document.getElementById('days').value;
//     const nonVeg = document.getElementById('nonVeg').checked;
//     const veg = document.getElementById('veg').checked;

//     // ---- VALIDATION ----
//     if (!destination) return alert('Please enter a destination.');
//     if (!travelDate) return alert('Please select a travel date.');
//     if (!days || days < 1) return alert('Please enter a valid number of days.');
//     if (!selectedBudget) return alert('Please select a budget range.');
//     if (!selectedCompanion) return alert('Please select a travel companion.');
//     if (selectedActivities.length === 0) return alert('Please select at least one activity.');
//     if (!nonVeg && !veg) return alert('Please select at least one dietary preference.');

//     // ---- BUILD DATA OBJECT ----
//     const tripData = {
//       destination,
//       travelDate,
//       days,
//       budget: selectedBudget,
//       companion: selectedCompanion,
//       activities: selectedActivities,
//       dietary: nonVeg && veg ? 'Non Veg & Veg' : nonVeg ? 'Non Vegetarian' : 'Vegetarian'
//     };

//     // Save to localStorage
//     localStorage.setItem('tripData', JSON.stringify(tripData));

//     // Display summary
//     displaySummary(tripData);
//   });

//   const clearBtn = document.getElementById('clearTrip');

// clearBtn.addEventListener('click', () => {
//   localStorage.removeItem('tripData');
//   summaryDiv.innerHTML = '<p class="text-muted">Trip data cleared.</p>';
// });

//   function displaySummary(data) {
//   summaryDiv.innerHTML = `
//     <div class="card shadow-sm p-4 mt-4 border-0">
//       <h4 class="fw-bold mb-3 text-primary">Your Trip Summary</h4>
//       <ul class="list-unstyled">
//         <li><strong>Destination:</strong> ${data.destination}</li>
//         <li><strong>Travel Date:</strong> ${data.travelDate}</li>
//         <li><strong>Duration:</strong> ${data.days} days</li>
//         <li><strong>Dietary Preferences:</strong> ${data.dietary}</li>
//       </ul>
//     </div>
//   `;
// }

  // function displaySummary(data) {
  //   summaryDiv.innerHTML = `
  //     <h4 class="fw-bold">Your Trip Summary</h4>
  //     <p><strong>Destination:</strong> ${data.destination}</p>
  //     <p><strong>Travel Date:</strong> ${data.travelDate}</p>
  //     <p><strong>Duration:</strong> ${data.days} days</p>
  //     <p><strong>Dietary Preferences:</strong> ${data.dietary}</p>
  //   `;
  // }

// });

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const summaryDiv = document.getElementById('tripSummary');

  let selectedBudget = '';
  let selectedCompanion = '';
  let selectedActivities = [];

  // Event Delegation: Capture clicks on all "selectable" elements
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
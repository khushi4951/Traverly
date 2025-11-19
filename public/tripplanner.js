document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tripForm');
  const resultSection = document.getElementById('resultSection');
  const summaryDiv = document.getElementById('tripSummary');
  const suggestionsDiv = document.getElementById('suggestions');
  const pdfBtn = document.getElementById('downloadPdfBtn');

  let selectedBudget = '';
  let selectedCompanion = '';
  let selectedActivities = [];
  let lastTripData = null; // store trip info for PDF

  /* CARD SELECTION */
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.selectable');
    if (!card) return;

    if (card.classList.contains('budget-card')) {
      document.querySelectorAll('.budget-card').forEach(c => c.classList.remove('border-primary'));
      card.classList.add('border-primary');
      selectedBudget = card.dataset.budget;
    }

    if (card.classList.contains('companion-card')) {
      document.querySelectorAll('.companion-card').forEach(c => c.classList.remove('border-success'));
      card.classList.add('border-success');
      selectedCompanion = card.dataset.companion;
    }

    if (card.classList.contains('activity-card')) {
      const activity = card.dataset.activity;
      if (selectedActivities.includes(activity)) {
        selectedActivities = selectedActivities.filter(a => a !== activity);
        card.classList.remove('border-warning');
      } else {
        selectedActivities.push(activity);
        card.classList.add('border-warning');
      }
    }
  });

  /* FORM SUBMIT */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const destination = document.getElementById('destination').value.trim();
    const travelDate = document.getElementById('travelDate').value;
    const days = document.getElementById('days').value;
    const nonVeg = document.getElementById('nonVeg').checked;
    const veg = document.getElementById('veg').checked;

    if (!destination || !travelDate || !days || !selectedBudget ||
        !selectedCompanion || selectedActivities.length === 0 ||
        (!nonVeg && !veg)) {
      return alert('Please complete all fields before submitting.');
    }

    const tripData = {
      destination,
      travelDate,
      days,
      budget: selectedBudget,
      companion: selectedCompanion,
      activities: selectedActivities,
      dietary: nonVeg && veg ? 'Non Veg & Veg' :
                nonVeg ? 'Non Vegetarian' : 'Vegetarian'
    };

    lastTripData = tripData;
    displaySummary(tripData);

    // Notify React component
    window.dispatchEvent(new CustomEvent('TRIP_DATA_READY', { detail: tripData }));

    resultSection.style.display = 'block';
  });

  /* DISPLAY SUMMARY IN HTML */
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

  /* =============== PDF GENERATION ================== */
  pdfBtn.addEventListener('click', async () => {
    if (!lastTripData) return alert("Generate your itinerary first.");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "pt", format: "a4" });

    let y = 40;

    pdf.setFontSize(18);
    pdf.text("Travel Itinerary", 40, y);
    y += 25;

    pdf.setFontSize(12);
    pdf.text(`Destination: ${lastTripData.destination}`, 40, y); y += 18;
    pdf.text(`Travel Date: ${lastTripData.travelDate}`, 40, y); y += 18;
    pdf.text(`Days: ${lastTripData.days}`, 40, y); y += 18;
    pdf.text(`Budget: ${lastTripData.budget}`, 40, y); y += 18;
    pdf.text(`Companion: ${lastTripData.companion}`, 40, y); y += 18;
    pdf.text(`Activities: ${lastTripData.activities.join(", ")}`, 40, y); y += 18;
    pdf.text(`Dietary: ${lastTripData.dietary}`, 40, y);
    y += 30;

    /* HOTEL & SPOT LIST FROM REACT SECTION */
    const textContent = document.getElementById("react-suggestions-root").innerText.split("\n");

    pdf.setFontSize(14);
    pdf.text("Recommendations", 40, y);
    y += 20;

    pdf.setFontSize(11);

    textContent.forEach(line => {
      if (y > 780) { // new page
        pdf.addPage();
        y = 40;
      }
      pdf.text(line, 40, y);
      y += 16;
    });

    pdf.save(`itinerary_${lastTripData.destination}.pdf`);
  });

});

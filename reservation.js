// Define seating areas and tables with capacity
const areas = {
  window: [
    { id: 1, capacity: 4 },
    { id: 2, capacity: 2 },
    { id: 3, capacity: 6 }
  ],
  patio: [
    { id: 4, capacity: 4 },
    { id: 5, capacity: 2 },
    { id: 6, capacity: 6 }
  ]
};

// (Currently unused) Could be used to track reserved table IDs
const reservedTables = [];

// Create and append a table element to the specified area
function createTable(areaId, tableInfo) {
  const table = document.createElement('div');
  table.className = 'table available';
  table.textContent = `Table ${tableInfo.id}`;
  table.title = `Seats ${tableInfo.capacity} people`;
  table.dataset.id = tableInfo.id;

  // Toggle table selection on click unless it's reserved
  table.addEventListener('click', () => {
    if (table.classList.contains('reserved')) return;
    table.classList.toggle('selected');
  });

  document.getElementById(areaId).appendChild(table);
}

// When the DOM is fully loaded
// - Render all tables based on defined areas
// - Set up the confirm reservation button behavior
document.addEventListener('DOMContentLoaded', () => {
  for (const [area, tables] of Object.entries(areas)) {
    const containerId = 'area-' + area;
    tables.forEach(table => createTable(containerId, table));
  }

  document.getElementById('confirmBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const time = document.getElementById('time').value;
    const selectedTables = document.querySelectorAll('.table.selected');

    // Validate inputs and selection
    if (!name || !time || selectedTables.length === 0) {
      alert('Please fill all fields and select at least one table.');
      return;
    }

    // Lock selected tables and show confirmation
    selectedTables.forEach(table => {
      table.classList.remove('selected', 'available');
      table.classList.add('reserved');
      table.innerHTML = `${table.textContent.split(' ')[0]} <i class="fas fa-lock"></i>`;
    });

    alert(`Reservation confirmed for ${name} at ${time}`);
    document.getElementById('name').value = '';
    document.getElementById('time').value = '';
  });
});

// Show table layout and form on "Select Table" button click
document.getElementById("startBtn").addEventListener("click", () => {
  document.querySelector(".card-section").style.display = "flex";
  document.querySelector(".table-legend").style.display = "flex";
  document.querySelector(".reservation-section").style.display = "block";
  document.querySelector(".start-reservation").style.display = "none";
});

// Automatically show form when a table is selected
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("table") && e.target.classList.contains("selected")) {
    document.querySelector(".reservation-form").style.display = "flex";
  }
});


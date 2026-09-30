(function() {
  const $ = q => document.querySelector(q);
  const nameInput = $('input#name');
  const licensePlateInput = $('input#license_plate');
  const sendButton = $('button#send');
  const garageBody = $('tbody#garage');

  const STORAGE_KEY = 'garage';

  let cars = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  }

  function addRow(car) {
    const row = document.createElement('tr');
    row.dataset.id = car.id;

    [car.name, car.licensePlate, car.time].forEach(value => {
      const td = document.createElement('td');
      td.textContent = value;
      row.appendChild(td);
    });

    const actionTd = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.className = 'remove';
    removeButton.textContent = 'Remove';
    actionTd.appendChild(removeButton);
    row.appendChild(actionTd);

    garageBody.appendChild(row);
  }

  cars.forEach(addRow);

  sendButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const licensePlate = licensePlateInput.value.trim();
    const time = new Date().toLocaleTimeString();

    if (name && licensePlate) {
      const car = { id: Date.now(), name, licensePlate, time };

      cars.push(car);
      save();
      addRow(car);

      nameInput.value = '';
      licensePlateInput.value = '';
    }
  });

  garageBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      const row = e.target.closest('tr');
      const id = Number(row.dataset.id);

      cars = cars.filter(car => car.id !== id);
      save();
      row.remove();
    }
  });
})();
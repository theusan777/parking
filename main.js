(function() {
  const $ = q => document.querySelector(q);
  const nameInput = $('input#name');
  const licensePlateInput = $('input#license_plate');
  const sendButton = $('button#send');
  const garageBody = $('tbody#garage');

  sendButton.addEventListener('click', () => {
    const name = nameInput.value;
    const licensePlate = licensePlateInput.value;
    const time = new Date().toLocaleTimeString();

    if (name && licensePlate) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${name}</td>
        <td>${licensePlate}</td>
        <td>${time}</td>
        <td><button class="remove">Remove</button></td>
      `;
      garageBody.appendChild(row);

      nameInput.value = '';
      licensePlateInput.value = '';
    }
  });

  garageBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      e.target.parentElement.parentElement.remove();
    }
  });
})();
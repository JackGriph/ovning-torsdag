import people from '../people.json' with { type: 'json' };

(function() {
  const select = document.querySelector('.sort-field');
  const container = document.querySelector('.people');

  // Render function
  const renderPeople = (list) => {
    const html = list.map(({ firstName, lastName, email, birthDate }) => `
      <section class="person">
        <p><b>First name:</b> ${firstName}</p>
        <p><b>Last name:</b> ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Birthday:</b> ${birthDate}</p>
      </section>
    `).join('');
    container.innerHTML = html;
  };

  // Function to sort based on selected value
  const sortPeople = (order) => {
    const sorted = [...people].sort((a, b) => {
      const dateA = new Date(a.birthDate);
      const dateB = new Date(b.birthDate);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    renderPeople(sorted);
  };

  // Initial render (ascending by default)
  sortPeople('asc');

  // Listen for dropdown changes
  select.addEventListener('change', (e) => {
    sortPeople(e.target.value);
  });
})();

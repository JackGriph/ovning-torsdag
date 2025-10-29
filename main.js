async function init() {
  try {
    const peopleRaw = await fetch('people.json');
    const people = await peopleRaw.json();

    function render(search = '') {
      let html = people
        .filter(({ firstName }) => search === '' ||
          firstName.toLowerCase().startsWith(search.toLowerCase()))
        .toSorted((a, b) => a.firstName > b.firstName ? 1 : -1)
        .map(({ firstName, lastName, email }) => `
          <section class="person">
            <p><b>First name:</b> ${firstName}</p>
            <p><b>Last name:</b> ${lastName}</p>
            <p><b>Email:</b> ${email}</p>
          </section>
        `)
        .join('');

      const peopleContainer = document.querySelector('.people');
      if (peopleContainer) peopleContainer.innerHTML = html;
    }

    const searchField = document.querySelector('.search-field');
    if (searchField) {
      searchField.addEventListener('keyup', e => render(e.target.value));
    }

    render();
  } catch (err) {
    console.error("Fel i main.js:", err);
  }
}

init(); // kör allt

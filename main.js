// read json from a url using fetch and get the response
const peopleRaw = await fetch('people.json');

// unpack the json into a data structure in memory ('deserialize')
const people = await peopleRaw.json();

// Global variables for current state
let currentSort = 'firstName';
let currentFilterType = 'firstName';
let showAge = false;
let ageFilter = { min: 0, max: 150 };

// Function to calculate age from birth date
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

function render(search = '') {
  let filteredPeople = [...people];

  // Apply text search filter
  if (search !== '') {
    const searchLower = search.toLowerCase();
    filteredPeople = filteredPeople.filter(person => {
      switch (currentFilterType) {
        case 'firstName':
          return person.firstName.toLowerCase().includes(searchLower);
        case 'lastName':
          return person.lastName.toLowerCase().includes(searchLower);
        case 'email':
          return person.email.toLowerCase().includes(searchLower);
        default:
          return person.firstName.toLowerCase().includes(searchLower);
      }
    });
  }

  // Apply age filter
  filteredPeople = filteredPeople.filter(person => {
    const age = calculateAge(person.birthDate);
    return age >= ageFilter.min && age <= ageFilter.max;
  });

  // Apply sorting
  filteredPeople.sort((a, b) => {
    switch (currentSort) {
      case 'firstName':
        return a.firstName.localeCompare(b.firstName);
      case 'lastName':
        return a.lastName.localeCompare(b.lastName);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'age':
        return calculateAge(a.birthDate) - calculateAge(b.birthDate);
      default:
        return a.firstName.localeCompare(b.firstName);
    }
  });

  // Generate HTML
  const html = filteredPeople.map(({ firstName, lastName, email, birthDate }) => {
    const age = calculateAge(birthDate);
    const ageDisplay = showAge ? `<p><b>Age:</b> ${age} år</p>` : '';

    return `
      <section class="person">
        <p><b>First name:</b> ${firstName}</p>
        <p><b>Last name:</b> ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        ${ageDisplay}
      </section>
    `;
  }).join('');

  document.querySelector('.people').innerHTML = html;
}

// add a keyup event handler to our search field
document.querySelector('#search-field')
  .addEventListener('keyup', event => {
    render(event.target.value);
  });

// Menu event listeners
document.getElementById('sort-firstname').addEventListener('click', (e) => {
  e.preventDefault();
  currentSort = 'firstName';
  render(document.getElementById('search-field').value);
  document.getElementById('nav-links').classList.remove('active');
});

document.getElementById('sort-lastname').addEventListener('click', (e) => {
  e.preventDefault();
  currentSort = 'lastName';
  render(document.getElementById('search-field').value);
  document.getElementById('nav-links').classList.remove('active');
});

document.getElementById('sort-age').addEventListener('click', (e) => {
  e.preventDefault();
  currentSort = 'age';
  render(document.getElementById('search-field').value);
  document.getElementById('nav-links').classList.remove('active');
});

document.getElementById('sort-email').addEventListener('click', (e) => {
  e.preventDefault();
  currentSort = 'email';
  render(document.getElementById('search-field').value);
  document.getElementById('nav-links').classList.remove('active');
});

document.getElementById('filter-firstname').addEventListener('click', (e) => {
  e.preventDefault();
  currentFilterType = 'firstName';
  document.getElementById('search-field').placeholder = 'Search by first name';
  document.getElementById('nav-links').classList.remove('active');
});

document.getElementById('filter-lastname').addEventListener('click', (e) => {
  e.preventDefault();
  currentFilterType = 'lastName';
  document.getElementById('search-field').placeholder = 'Search by last name';
  document.getElementById('nav-links').classList.remove('active');
});

document.getElementById('filter-email').addEventListener('click', (e) => {
  e.preventDefault();
  currentFilterType = 'email';
  document.getElementById('search-field').placeholder = 'Search by email';
  document.getElementById('nav-links').classList.remove('active');
});

document.getElementById('filter-age').addEventListener('click', (e) => {
  e.preventDefault();
  const filterControls = document.getElementById('filter-controls');
  filterControls.style.display = filterControls.style.display === 'none' ? 'flex' : 'none';
  document.getElementById('nav-links').classList.remove('active');
});

document.getElementById('show-age').addEventListener('click', (e) => {
  e.preventDefault();
  showAge = !showAge;
  e.target.textContent = showAge ? 'Hide ages' : 'Show ages';
  render(document.getElementById('search-field').value);
  document.getElementById('nav-links').classList.remove('active');
});

// Age filter controls
document.getElementById('apply-age-filter').addEventListener('click', () => {
  const minAge = parseInt(document.getElementById('min-age').value) || 0;
  const maxAge = parseInt(document.getElementById('max-age').value) || 150;
  ageFilter = { min: minAge, max: maxAge };
  render(document.getElementById('search-field').value);
});

document.getElementById('clear-age-filter').addEventListener('click', () => {
  ageFilter = { min: 0, max: 150 };
  document.getElementById('min-age').value = '';
  document.getElementById('max-age').value = '';
  render(document.getElementById('search-field').value);
});


// initial rendering of list of people to screen
render();
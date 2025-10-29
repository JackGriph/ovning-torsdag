import people from '../people.json' with { type: 'json' }

(async function() {
  const sorted = people.sort((a, b) => a.firstName.localeCompare(b.firstName))

  const html = sorted.map(({ firstName, lastName, email, birthDate }) => `
    <section class="person">
      <p><b>First name:</b> ${firstName}</p>
      <p><b>Last name:</b> ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Birthday: ${birthDate}</b></p>
    </section>
  `).join('')

  document.querySelector('.people').innerHTML = html
})()
// Load people from JSON and find by birth year
document.getElementById('calculateAge').addEventListener('click', function () {
    const birthYear = parseInt(document.getElementById('birthYear').value);
    const currentYear = new Date().getFullYear();
    if (isNaN(birthYear) || birthYear < 1200 || birthYear > currentYear) {
        alert('Please enter a valid birth year.');
        return;
    }

    // Show loading message
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading people data...</p>';

    // Load people.json
    fetch('people.json')
        .then(response => {
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();
        })
        .then(people => {
            console.log('People loaded:', people.length);

            // Find people born in the specified year
            const matchingPeople = people.filter(person => {
                const personBirthYear = new Date(person.birthDate).getFullYear();
                return personBirthYear === birthYear;
            });

            console.log('Matching people found:', matchingPeople.length);

            if (matchingPeople.length === 0) {
                resultsDiv.innerHTML = `
                    <div style="padding: 20px; background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;">
                        <h3 style="color: #6c757d;">Inga personer hittades</h3>
                        <p>Det finns inga personer födda år <strong>${birthYear}</strong> i databasen.</p>
                        <p><small>Totalt antal personer i databasen: ${people.length}</small></p>
                    </div>
                `;
            } else {
                const age = currentYear - birthYear;
                let html = `<h3>Personer födda år ${birthYear} (${matchingPeople.length} personer hittades):</h3>`;

                matchingPeople.forEach(person => {
                    // Calculate exact age for each person
                    const birthDate = new Date(person.birthDate);
                    const today = new Date();
                    let exactAge = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();

                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        exactAge--;
                    }

                    html += `
                        <div class="person-card" style="border: 1px solid #ccc; margin: 10px 0; padding: 15px; border-radius: 5px; background-color: #f9f9f9;">
                            <div style="font-weight: bold; margin-bottom: 5px;">${person.firstName} ${person.lastName}</div>
                            <div>Email: ${person.email}</div>
                            <div>Födelsedatum: ${person.birthDate}</div>
                            <div style="color: #007bff; font-weight: bold;">Ålder: ${exactAge} år</div>
                        </div>
                    `;
                });

                resultsDiv.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            resultsDiv.innerHTML = `
                <div style="color: red; padding: 20px; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px;">
                    <h3>❌ Fel vid laddning av data</h3>
                    <p><strong>Felmeddelande:</strong> ${error.message}</p>
                    <p><strong>Möjliga orsaker:</strong></p>
                    <ul>
                        <li>Filen people.json finns inte i samma mapp</li>
                        <li>Du måste köra från en webbserver (inte öppna filen direkt)</li>
                        <li>CORS-problem - testa med Live Server i VS Code</li>
                    </ul>
                    <p><strong>Lösning:</strong> Högerklicka på index.html och välj "Open with Live Server" i VS Code</p>
                </div>
            `;
        });
});
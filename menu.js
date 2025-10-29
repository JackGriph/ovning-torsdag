
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-links a');
  const content = document.getElementById('content');
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');

  // Öppna/stäng menyn när man klickar på knappen
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // När man klickar på en meny-länk
  links.forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();

      const page = link.dataset.page;
      if (!page) return;

      try {
        const response = await fetch(page);
        if (!response.ok) throw new Error('Kunde inte ladda ' + page);
        const html = await response.text();
        content.innerHTML = html;

        // Stäng menyn efter klick
        navLinks.classList.remove('active');

      } catch (error) {
        content.innerHTML = `<p style="color:red;">Fel: ${error.message}</p>`;
      }
    });
  });
});


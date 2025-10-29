class Header extends HTMLElement {

  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    this.shadow.innerHTML = `
      <style>
        .navbar {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          background-color: #f0f0f0;
          padding: 10px;
        }
        .nav-links {
          display: none;
        }
        .nav-links.open {
          display: block;
        }
      </style>
      <header>
        <nav class="navbar">
          <div class="logo">Meny</div>
          <button class="menu-btn" id="menu-btn">&#9776;</button>
          <ul class="nav-links" id="nav-links">
            <li><a href="index.html" data-page="index.html">Home</a></li>
            <li><a href="pages/firstname.html" data-page="pages/firstname.html">Sort by first name</a></li>
            <li><a href="pages/lastname.html" data-page="pages/lastname.html">Sort by last name</a></li>
            <li><a href="pages/age.html" data-page="pages/age.html">Sort by age</a></li>
            <li><a href="pages/email.html" data-page="pages/email.html">Sort by e-mail</a></li>
            <li><a href="pages/filter-first.html" data-page="pages/filter-first.html">Filter by first name</a></li>
            <li><a href="pages/filter-last.html" data-page="pages/filter-last.html">Filter by last name</a></li>
            <li><a href="pages/filter-age.html" data-page="pages/filter-age.html">Filter by age</a></li>
            <li><a href="pages/filter-email.html" data-page="pages/filter-email.html">Filter by e-mail</a></li>
            <li><a href="age-calculator.html" data-page="age-calculator.html">Calculate age</a></li>
            
          </ul>
        </nav>
      </header>
    `
  }

  connectedCallback() {
    const btn = this.shadow.querySelector('#menu-btn');
    const nav = this.shadow.querySelector('#nav-links');
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
}

customElements.define('my-header', Header);
const toggleMobileNav = function () {
  const el = document.querySelector('.main-navbar')
  el.classList.toggle('hidden-sm-down')
}

/**
 * Header shows the header and also takes car of the nav (and what nav items are
 * shown based on the logged in state)
 *
 * @param showLoginControls {boolean} creates controls for managing login icons and event
 */
export default class Header {
  constructor(mainNavItems, showLoginControls) {
    this._showLoginControls = showLoginControls;

    let loginControls = ''
    if (this._showLoginControls) {
      loginControls =
        `<ul class='right'>
           <li>
            <a id='account-toggle' href='#'>OPTIONS</a>
            https://placekitten.com/120/70
            <article id='account-info' aria-label='Account Information' style='display: none'>
              <p>Signed in as Nikos</p>
              <a href='#logout'>Logout</a>
            </article>
          </li>
      </ul>`
    }

    mainNavItems = mainNavItems.map(item=>`<li><a href='${item.href}'>${item.text}</a></li>`).join('  ')

    const template =
      `<header>
         <nav>
            <article class='logo'>
              <a href='#'><h3>Quantum</h3>
              <span>Workshop</span></a>
            </article>
            <ul class='main-navbar hidden-sm-down'>
              ${mainNavItems}
            </ul>
            <button id="toggleMobileNav" class="hidden-sm-up" >&#x2261;</button>
            ${loginControls}
          </nav>
        </header>`

    var el = document.createElement('DIV')
    el.innerHTML = template
    this._element = el.firstChild
    // document.getElementById('header-container').appendChild(this._element)
    this.addListeners()
  }

  getElement() {
    return this._element
  }

  addListeners() {
    const contactEl = this._element.querySelector('a[href="#contact"]')
    contactEl.addEventListener('click', function () {
      const newEvent = new CustomEvent(eventTypes.REQUEST_CONTACT_FORM, {
        bubbles: true
      })
      this._element.dispatchEvent(newEvent)
    }.bind(this))

    //hide mobile nav
    const navEl = this._element.querySelector('ul.main-navbar')
    navEl.addEventListener('click', function () {
      if (window.innerWidth < constants.BREAKPOINTS.SM)
        toggleMobileNav()
    }.bind(this))

    const toggleMobileNavEl = this._element.querySelector('#toggleMobileNav')
    toggleMobileNavEl.addEventListener('click', toggleMobileNav)

    if (this._showLoginControls) {
      //here we open and close the account dropdown for clicking on the logged in icon or the body
      const accountToggleEl = this._element.querySelector("#account-toggle")
      const accountInfoEl = this._element.querySelector("#account-info")

      accountToggleEl.addEventListener("click", function toggleAccount(event) {
        if ((window.getComputedStyle(accountInfoEl).display === "none")) {
          accountInfoEl.style.display = "block"
          document.addEventListener("click", function closeAccount(event) {
            accountInfoEl.style.display = "none"
            document.removeEventListener('click', closeAccount)
          })
        } else {
          accountInfoEl.style.display = "none"
        }
        event.stopPropagation()
      })
    }
  }
}


import Header from './components/header/header'
import 'node_modules/normalize.css/normalize.css'
import './styles/index.less!'

/**
 * Insert header into the div in index.html
 */
function assembleHeader() {

  const items = [
    {
      text: "Nav1",
      href: "#nav1"
    },
    {
      text: "Nav2",
      href: "#nav2"
    },
    {
      text: "Contact",
      href: "#contact",
      onclick: function () {
        alert("You can call some function here")
      }
    }
  ]

  const header = new Header(items, true)
  document.querySelector('#header-container').appendChild(header.getElement())
}

function init() {
  assembleHeader()
}

init()

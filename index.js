// Declare variables globally for access in other functions
let navTop, headerHeight, mainTop;
const navbar = document.querySelector("nav");
const header = document.querySelector("header");
const main = document.querySelector("main");

const largeScreenQuery = window.matchMedia("(min-width: 850px)");

//Get current year
function setYear() {
  const currentYear = new Date().getFullYear();
  document.getElementById("footer-text").textContent += ` ${currentYear}`;
}

//Scroll to section from nav link
function scrollToSection(target) {
  let navElement;
  if (target.textContent === "PROJECTS") {
    navElement = document.querySelector("#projects");
  } else if (target.textContent === "ABOUT") {
    navElement = document.querySelector("#bio");
  } else if (target.textContent === "CONTACT") {
    navElement = document.querySelector("footer");
  }
  const compStyle = window.getComputedStyle(navElement);
  const padding = parseInt(compStyle.getPropertyValue("padding-top"));
  const topLoc = navElement.offsetTop + headerHeight - padding;
  window.scroll({ top: topLoc, left: 0, behavior: "smooth" });
}

//Calculate & set heights when the window is loaded or resized
function setHeights() {
  navTop = navbar.offsetTop;
  headerHeight = header.offsetHeight;
  navbar.style.marginTop = `${headerHeight}px`;
  mainTop = main.offsetTop;
}

//Move project links on screen size larger than 850px
function adjustProjectLinks() {
  const linksArray = document.getElementsByClassName("project-links");
  if (largeScreenQuery.matches) {
    const projectsInfoArray = document.getElementsByClassName("project-info");
    for (let i = 0; i < linksArray.length; i++) {
      projectsInfoArray[i].appendChild(linksArray[i]);
    }
  } else {
    const projectsArray = document.getElementsByClassName("project");
    for (let i = 0; i < linksArray.length; i++) {
      projectsArray[i].appendChild(linksArray[i]);
    }
  }
}

//Update contact text based on which contact link is hovered over
function changeContactText(linkId) {
  let contactText = "Get in touch";
  if (linkId === "github") {
    contactText = "Find My Work on Github";
  } else if (linkId === "linkedin") {
    contactText = "Connect With Me on LinkedIn";
  } else if (linkId === "email") {
    contactText = "Contact Me Via Email";
  }
  document.getElementById("contact-text").textContent = contactText;
}

function resetContactText() {
  document.getElementById("contact-text").textContent = "Get in touch";
}

window.addEventListener("load", () => {
  setYear();
  setHeights();
});

//Event Listeners

window.addEventListener("resize", setHeights);
largeScreenQuery.addListener(adjustProjectLinks);

document.addEventListener("click", event => {
  if (event.target.classList.contains("nav-links")) {
    scrollToSection(event.target);
  }
});

document
  .getElementById("github")
  .addEventListener("mouseover", () => changeContactText("github"));
document
  .getElementById("linkedin")
  .addEventListener("mouseover", () => changeContactText("linkedin"));
document
  .getElementById("email")
  .addEventListener("mouseover", () => changeContactText("email"));

document
  .getElementById("github")
  .addEventListener("focus", () => changeContactText("github"));
document
  .getElementById("linkedin")
  .addEventListener("focus", () => changeContactText("linkedin"));
document
  .getElementById("email")
  .addEventListener("focus", () => changeContactText("email"));

document
  .getElementById("contact-list")
  .addEventListener("mouseleave", resetContactText);
document
  .getElementById("contact-list")
  .addEventListener("focusout", resetContactText);

//Functions executed immediately on page load
adjustProjectLinks();

consoleText(
  ["My name is Ricardo", "A Software Engineer...", "From Las Vegas"],
  "text",
  ["tomato", "rebeccapurple", "lightblue"]
);

//banner animation

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ["#fff"];
  var visible = true;
  var con = document.getElementById("console");
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id);
  target.setAttribute("style", "color:" + colors[0]);
  window.setInterval(function() {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount);
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute("style", "color:" + colors[0]);
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount);
      letterCount += x;
    }
  }, 120);
  window.setInterval(function() {
    if (visible === true) {
      con.className = "console-underscore hidden";
      visible = false;
    } else {
      con.className = "console-underscore";

      visible = true;
    }
  }, 400);
}

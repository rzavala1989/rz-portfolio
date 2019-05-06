// Declare variables globally for access in other functions
let navTop, headerHeight, mainTop
const navbar = document.querySelector("nav");
const header = document.querySelector("header");
const main = document.querySelector("main");

const largeScreenQuery = window.matchMedia("(min-width: 850px)");

//Get current year
function setYear(){
  const currentYear = new Date().getFullYear();
  document.getElementById("footer-text").textContent += ` ${currentYear}`;
}

//Scroll to section from nav link
function scrollToSection(target){
  let navElement;
  if (target.textContent === "PROJECTS"){
    navElement = document.querySelector('#projects');
  } else if (target.textContent === "ABOUT"){
    navElement = document.querySelector('#bio');
  } else if (target.textContent === "CONTACT"){
    navElement = document.querySelector('footer');
  }
  const compStyle = window.getComputedStyle(navElement);
  const padding = parseInt(compStyle.getPropertyValue('padding-top'));
  const topLoc = navElement.offsetTop + headerHeight - padding;
  window.scroll({top: topLoc, left: 0, behavior: "smooth"});
}

//Calculate & set heights when the window is loaded or resized
function setHeights() {
  navTop = navbar.offsetTop;
  headerHeight = header.offsetHeight;
  navbar.style.marginTop = `${headerHeight}px`;
  mainTop = main.offsetTop;
}

//Move project links on screen size larger than 850px
function adjustProjectLinks(){
  const linksArray = document.getElementsByClassName("project-links");
  if (largeScreenQuery.matches){
    const projectsInfoArray = document.getElementsByClassName("project-info");
    for (let i = 0; i< linksArray.length; i++){
      projectsInfoArray[i].appendChild(linksArray[i]);
    }
  } else {
    const projectsArray = document.getElementsByClassName("project");
    for (let i = 0; i< linksArray.length; i++){
      projectsArray[i].appendChild(linksArray[i]);
    }
  }
}

//Update contact text based on which contact link is hovered over
function changeContactText(linkId) {
  let contactText = "Get in touch";
  if (linkId === "github"){
    contactText = "Find My Work on Github";
  } else if (linkId === "linkedin"){
    contactText = "Connect With Me on LinkedIn";
  } else if (linkId === "email"){
    contactText = "Contact Me Via Email";
  }
  document.getElementById('contact-text').textContent = contactText;
}

function resetContactText(){
  document.getElementById('contact-text').textContent = "Get in touch";
}

window.addEventListener('load', () => {
  setYear();
  setHeights();
});

//Event Listeners

window.addEventListener('resize', setHeights);
largeScreenQuery.addListener(adjustProjectLinks);

document.addEventListener('click', event =>  {
  if (event.target.classList.contains('nav-links')) {
    scrollToSection(event.target);
  }
})

document.getElementById("github").addEventListener("mouseover", () => changeContactText("github"));
document.getElementById("linkedin").addEventListener("mouseover", () => changeContactText("linkedin"));
document.getElementById("email").addEventListener("mouseover", () => changeContactText("email"));

document.getElementById("github").addEventListener("focus", () => changeContactText("github"));
document.getElementById("linkedin").addEventListener("focus", () => changeContactText("linkedin"));
document.getElementById("email").addEventListener("focus", () => changeContactText("email"));

document.getElementById("contact-list").addEventListener("mouseleave", resetContactText);
document.getElementById("contact-list").addEventListener("focusout", resetContactText);

//Functions executed immediately on page load
adjustProjectLinks();
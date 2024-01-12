// LOADER
const loaderContainer = document.querySelector('.loader-container');
const loader = document.querySelector('.loader');
window.addEventListener('load', () => {
  loader.style.opacity = 0.1;
  setTimeout(() => {
    document.body.removeAttribute('.hide-scrollbar');
    document.body.setAttribute("class", 'show-scrollbar');
    loaderContainer.style.display = 'none';
  }, 100);
});


// SCROLL SMOOTH
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);


// SCROLL MENU EFFECT
const heroSection = document.getElementById('section-hero-banner');
const presentationSection = document.getElementById('section-presentation');
const projectSection = document.getElementById('section-projets');
const contactSection = document.getElementById('section-contact');
const sectionsArray = [heroSection, presentationSection, projectSection, contactSection];
const presentationAnchor = document.querySelectorAll('.link-to-presentation');
const projectAnchor = document.querySelectorAll('.link-to-projets');
const contactAnchor = document.querySelectorAll('.link-to-contact');
const anchorsArray = [presentationAnchor, projectAnchor, contactAnchor];
anchorsArray.forEach((anchors, i) => {
  anchors.forEach(anchor => {
    gsap.to(anchor, {
      scrollTrigger: {
        trigger: sectionsArray[i + 1],
        start: "top 30%",
        end: "bottom 30%",
        toggleClass: {targets: anchor, className: "active-menu-link"},
        scrub: true,
        markers: false,
      },
    })
  });
});


// SCROLL TITLE EFFECT
const titles = document.querySelectorAll(".reveal-type");

titles.forEach((title, i) => {
  gsap.to(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 60%",
      end: "top 50%",
      scrub: true,
      markers: false,
    },
    textDecorationColor: "#033F63",
  });
});

const cards = document.querySelectorAll(".card");

cards.forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "center 100%",
      end: "bottom 90%",
      scrub: true,
      markers: false,
    },
    scaleX: 0.8,
    scaleY: 0.8,
    opacity: 0.2,
    stagger: 0.1,
  });
});

const sections = document.querySelectorAll(".sections");
sections.forEach((section) => {
  const bg = section.dataset.bgImage;
  const fg = section.dataset.fgImage;

  gsap.fromTo(
    section,
    {
      backgroundImage: bg,
    },
    {
      backgroundImage: fg,
      duration: 0.8,
      stagger: 0.02,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 80%",
        scrub: false,
        markers: false,
        toggleActions: "play play reverse reverse",
      },
    }
  );
});



// Menu Effect
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0
  );
}


// Skills
const skillDivs = document.getElementsByClassName("skills-title-div");
const clickInstruction = document.getElementById('skill-click-instruction');
for (let div of skillDivs) {
  div.addEventListener("click", function () {
    clickInstruction.style.display = "none";
    const ul = div.nextElementSibling;
    const displayStyle = ul.style.getPropertyValue("display");
    displayStyle === "none"
      ? (ul.style.display = "block")
      : (ul.style.display = "none");
    ScrollTrigger.refresh();
  });
}


//Contact Form in PHP
const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");
form.onsubmit = (e)=>{
  e.preventDefault();
  // statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Envoie du message...";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "mail.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById('header')
  if (this.scrollY >= 50) {
    header.classList.add('scroll-header')
  } else {
    header.classList.remove('scroll-header')
  }
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER POPULAR ===============*/
var swiper = new Swiper(".popular__container", {
  spaceBetween: 32,
  grabCursor: true,
  centeredSlides: true,
  slidePerView: 'auto',
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
/*=============== VALUE ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.value__accordion-item')

accordionItems.forEach((item) => {
  const accordionHeader = item.querySelector('.value__accordion-header')

  accordionHeader.addEventListener('click', () => {
    const openItem = document.querySelector('.accordion-open')
    toggleItem(item)
    if (openItem && openItem != item) {
      toggleItem(openItem)
    }
  })
})
const toggleItem = (item) => {
  const accordionContent = item.querySelector('.value__accordion-content')
  if (item.classList.contains('accordion-open')) {
    accordionContent.removeAttribute('style')
    item.classList.remove('accordion-open')
  } else {
    accordionContent.style.height = accordionContent.scrollHeight + 'px'
    item.classList.add('accordion-open')
  }
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const section = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.pageYOffset

  section.forEach(current => {
    const sectionHeigth = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeigth) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')

    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up')
  if (this.scrollY >= 350) scrollUp.classList.add('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/


/*=============== SCROLL REVEAL ANIMATION ===============*/


/*=============== GET DATA BY JSON ===============*/

var divinsert = document.getElementById('divinsert')

function obtenerJSON(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        reject(
          "No hemos podido recuperar ese json. El código de respuesta del servidor es: " +
          response.status
        );
      })
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

var html = ""
obtenerJSON("https://api.jsonbin.io/v3/b/6391fd7c6a51bc4f704a819b")
  .then((json) => {
    //console.log("el json de respuesta es:", json.record.baterias);
    for (let propierties of json.record.baterias) {
      html += `
        <article class="popular__card swiper-slide">
            <img class ="popular__img" src="${propierties.imagen}" alt="">
            <div class="popular__data">
                <h2 class="popular__price">
                    <span>$</span>${propierties.precio}
                </h2>
                <h3 class="popular__title">
                    ${propierties.marca}
                </h3>
                <p class="popular_description">
                    ${propierties.descripcion}
                </p>
            </div>
        </article>
        `
    }
    //console.log(html)
    divinsert.innerHTML = html
  })
  .catch((err) => {
    console.log("Error encontrado:", err);
  });

function ventanaSecundaria(URL) {
  window.open(URL)
}



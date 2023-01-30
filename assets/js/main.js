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
  spaceBetween: 35,
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
var iDivInsertComentariosPrevio = document.getElementById('iDivInsertComentariosPrevio')
var iDivInsertComentarioActual = document.getElementById('iDivInsertComentarioActual')
var iDivInsertComentarioSiguiente = document.getElementById('iDivInsertComentarioSiguiente')
var idivComentarioGlobal = document.getElementById('global')

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
                <img src="assets/img/batteriepng.png"
                width="35px" height="25px">
                    ${propierties.descripcion}
                </p>
                <a href="javascript:ventanaSecundaria('https://api.whatsapp.com/send?phone=+5491169761257&text=Hola!%20Te%20consulto%20por%20una%20bateria?%20seria%20la%20${propierties.descripcion}')">
                <button type="button" class="btn btn-danger btn-block"><small>CONTACTAR</small></button>
              </a>
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


var htmlComentariosPrevio = ""
var htmlComentariosActual = ""
var htmlComentariosSiguiente = ""

function llenarHTMLComentariosActual(htmlAInsertar, json,) {
  htmlAInsertar = ""
  for (let propierties of json) {
        switch (propierties.tipocomentario){
        case "actual":
          htmlAInsertar += `
              <div class="card border-0 py-3 px-4">
                <div class="row justify-content-center">
                  <img src="${propierties.imagen}" class="img-fluid profile-pic mb-4 mt-3">
                </div>
              <h6 class="mb-3 mt-2">${propierties.nombre}</h6>
              <p class="content mb-5 mx-2">"${propierties.comentario}"</p>
              <span>⭐⭐⭐⭐⭐</span>
              </div>
            `
            break
      }
  }
  return htmlAInsertar
}

function llenarHTMLComentariosSiguiente(htmlAInsertar, json) {
  htmlAInsertar = ""
  for (let propierties of json) {
    switch (propierties.tipocomentario){
      case "siguiente":
        htmlAInsertar += `
            <div class="card border-0 py-3 px-4">
              <div class="row justify-content-center">
                <img src="${propierties.imagen}" class="img-fluid profile-pic mb-4 mt-3">
              </div>
            <h6 class="mb-3 mt-2">${propierties.nombre}</h6>
            <p class="content mb-5 mx-2">"${propierties.comentario}"</p>
            </div>
          `
          break
    }
  }
  return htmlAInsertar
}

function llenarHTMLComentariosPrevio(htmlAInsertar, json,) {
  htmlAInsertar = ""
  for (let propierties of json) {
    switch (propierties.tipocomentario){
      case "previo":
        htmlAInsertar += `
           <div class="card border-0 py-3 px-4">
              <div class="row justify-content-center">
                <img src="${propierties.imagen}" class="img-fluid profile-pic mb-4 mt-3">
              </div>
            <h6 class="mb-3 mt-2">${propierties.nombre}</h6>
            <p class="content mb-5 mx-2">"${propierties.comentario}"</p>
            </div>
          `
          break
    }

  }
  return htmlAInsertar
}



obtenerJSON("https://api.jsonbin.io/v3/b/63d571faebd26539d06a4b5f")
  .then((json) => {
    //console.log("el json de respuesta es:", json.record.baterias);
    var arrayFilter = json.record.comentarios
    console.log(arrayFilter)
    // htmlComentariosPrevio = llenarHTMLComentariosPrevio(htmlComentariosPrevio, arrayFilter)
    htmlComentariosActual = llenarHTMLComentariosActual(htmlComentariosActual,arrayFilter)
    // htmlComentariosSiguiente =  llenarHTMLComentariosSiguiente(htmlComentariosSiguiente,arrayFilter)

    // console.log(htmlComentarios)
    // iDivInsertComentariosPrevio.innerHTML = htmlComentariosPrevio
    iDivInsertComentarioActual.innerHTML = htmlComentariosActual
    // iDivInsertComentarioSiguiente.innerHTML = htmlComentariosSiguiente
  })
  .catch((err) => {
    console.log("Error encontrado:", err);
  });


  $(document).ready(function () {

    $('.owl-carousel').owlCarousel({
      mouseDrag: false,
      loop: true,
      margin: 2,
      nav: true,
      margin:10,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        1000: {
          items: 3
        }
      }
    });
  
    $('.owl-prev').click(function () {
      $active = $('.owl-item .item.show');
      $('.owl-item .item.show').removeClass('show');
      $('.owl-item .item').removeClass('next');
      $('.owl-item .item').removeClass('prev');
      $active.addClass('next');
      if ($active.is('.first')) {
        $('.owl-item .last').addClass('show');
        $('.first').addClass('next');
        $('.owl-item .last').parent().prev().children('.item').addClass('prev');
      }
      else {
        $active.parent().prev().children('.item').addClass('show');
        if ($active.parent().prev().children('.item').is('.first')) {
          $('.owl-item .last').addClass('prev');
        }
        else {
          $('.owl-item .show').parent().prev().children('.item').addClass('prev');
        }
      }
    });
  
    $('.owl-next').click(function () {
      $active = $('.owl-item .item.show');
      $('.owl-item .item.show').removeClass('show');
      $('.owl-item .item').removeClass('next');
      $('.owl-item .item').removeClass('prev');
      $active.addClass('prev');
      if ($active.is('.last')) {
        $('.owl-item .first').addClass('show');
        $('.owl-item .first').parent().next().children('.item').addClass('prev');
      }
      else {
        $active.parent().next().children('.item').addClass('show');
        if ($active.parent().next().children('.item').is('.last')) {
          $('.owl-item .first').addClass('next');
        }
        else {
          $('.owl-item .show').parent().next().children('.item').addClass('next');
        }
      }
    });
  
  });
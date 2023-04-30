
divinsertproductos = document.getElementById('divinsertproductos')
var htmlProductos = ""

function ventanaSecundaria(URL) {
  window.open(URL)
}

function obtenerJSON(url) {
  return new Promise((resolve, reject) => {
    fetch(url,{
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2b$10$OUBjLRQYYpa3cTlEbeSUY.SQUYM73UoNSO9S3v.CQaLJq2h9qwo9K'
      },
    })
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


obtenerJSON("https://api.jsonbin.io/v3/b/64454a088e4aa6225e8f5935")
.then((json) => {
  var arrayFilter = json.record.baterias
  htmlProductos = llenarHTML(htmlProductos,arrayFilter)
  divinsertproductos.innerHTML = htmlProductos
})
.catch((err) => {
  console.log("Error encontrado:", err);
});
  
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

const section = document.querySelectorAll('section[id]')

// function scrollActive() {
//   const scrollY = window.pageYOffset

//   section.forEach(current => {
//     const sectionHeigth = current.offsetHeight,
//       sectionTop = current.offsetTop - 58,
//       sectionId = current.getAttribute('id')

//     if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeigth) {
//       document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')

//     } else {
//       document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
//     }
//   })
// }
// window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up')
  if (this.scrollY >= 350) scrollUp.classList.add('show-scroll')
}
window.addEventListener('scroll', scrollUp)


function filterByMarca(marca) {
  if (marca != null){
    obtenerJSON("https://api.jsonbin.io/v3/b/64454a088e4aa6225e8f5935")
    .then((json) => {
      var arrayFilter = json.record.baterias.filter(function (entry) {
        return entry.marca === marca;
      });
      htmlProductos = llenarHTML(htmlProductos,arrayFilter)
      divinsertproductos.innerHTML = htmlProductos
    })
    .catch((err) => {
      console.log("Error encontrado:", err);
    });}
    else{
      obtenerJSON("https://api.jsonbin.io/v3/b/64454a088e4aa6225e8f5935")
      .then((json) => {
        var arrayFilter = json.record.baterias
        htmlProductos = llenarHTML(htmlProductos,arrayFilter)
        divinsertproductos.innerHTML = htmlProductos
      })
      .catch((err) => {
        console.log("Error encontrado:", err);
      });
    }
  }


function llenarHTML(htmlAInsertar,json){
  htmlAInsertar = ""
  for (let propierties of json) {
    htmlAInsertar += `
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
                <a href="https://api.whatsapp.com/send?phone=+5491169761257&text=Hola!%20Te%20consulto%20por%20una%20bateria?%20seria%20la%20${propierties.descripcion}">
                <button type="button" class="btn btn-danger btn-block"><small>CONTACTAR</small></button>
              </a>
            </div>
        </article>
    `
  }
  return htmlAInsertar
}
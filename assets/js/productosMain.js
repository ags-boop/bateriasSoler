
divinsertproductos = document.getElementById('divinsertproductos')
var htmlProductos = ""

function ventanaSecundaria(URL) {
  window.open(URL)
}

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


obtenerJSON("https://api.jsonbin.io/v3/b/63b9717215ab31599e2fd923")
  .then((json) => {
    //console.log("el json de respuesta es:", json.record.baterias);
    for (let propierties of json.record.baterias) {
      htmlProductos += `
        <div style="padding-bottom:10px;" class="col-sm">
          <div class="card">
            <img src="${propierties.imagen}" class="card-img-top" width="100%">
            <div class="card-body pt-0 px-0">
                <div class="d-flex flex-row justify-content-between mb-0 px-3">
                    <span class="text-muted mt-1">Precio</span>
                    <h6>$ ${propierties.precio}</h6>
                </div>
                <div class="d-flex flex-row justify-content-between p-3 mid">
                    <div class="d-flex flex-column"><span style="color:red!important;" class="text-muted mb-1">Modelo: ${propierties.marca}</span>
                        <div class="d-flex flex-row"><img src="assets/img/batteriepng.png"
                          width="35px" height="25px">
                        <div class="d-flex flex-column ml-1">
                          <small class="ghj">
                            ${propierties.descripcion}
                          </small>
                        </div>
                      </div>
                </div>
                </div>
                <div class="mx-3 mt-3 mb-2">
                  <a href="javascript:ventanaSecundaria('https://api.whatsapp.com/send?phone=+5491168034340&text=Hola!%20Te%20consulto%20por%20una%20bateria?%20seria%20la%20${propierties.descripcion}')">
                    <button type="button" class="btn btn-danger btn-block"><small>CONTACTAR</small></button>
                  </a>
                </div>
            </div>
          </div>
      </div>
      `
    }
    //console.log(html)
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
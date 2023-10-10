const BateriaObj = {
  descripcion: "",
  imagen: "",
  marca: "",
  precio: "",
  especial:"",
  orden:""
};

divinsertproductos = document.getElementById('divinsertproductos')
var htmlProductos = ""

function ventanaSecundaria(URL) {
  window.open(URL)
}


function getSheetData() {
  var jsonADevolver
  var responseOK = new Boolean(false);
  const sheetId = "1L2U5w5ldAgEjVMfuAoEnZsnFsLNZTqh5fuLH_y7qYR4";
  const apiKey = "AIzaSyA9hpVGy4uzlhess_WZ8zZ1K9HKklQfYK0";
  const range = "PreciosProductos!2:1000"; // Rango de celdas que se desea obtener
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      jsonADevolver = buildJson(data.values)
      responseOK = true
      if (responseOK == true){
        htmlProductos = llenarHTML(htmlProductos,jsonADevolver)
        divinsertproductos.innerHTML = htmlProductos
      }
    })
    .catch(error => {
      console.error(error);
    });

 }


 function obtenerDataFiltrada(marca) {
  var jsonAFiltrar
  var responseOK = new Boolean(false);
  const sheetId = "1L2U5w5ldAgEjVMfuAoEnZsnFsLNZTqh5fuLH_y7qYR4";
  const apiKey = "AIzaSyA9hpVGy4uzlhess_WZ8zZ1K9HKklQfYK0";
  const range = "PreciosProductos!2:1000"; // Rango de celdas que se desea obtener
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.values)
      jsonAFiltrar = buildJson(data.values)
      responseOK = true
      if (responseOK == true){
        console.log(jsonAFiltrar)
        console.log(marca)
        var arrayFilter = data.values.filter(function (entry) {
        return entry[2] === marca;
      });
    }

    if(responseOK == true){
      arrayFilter = buildJson(arrayFilter)
      htmlProductos = llenarHTML(htmlProductos,arrayFilter)
      divinsertproductos.innerHTML = htmlProductos
    }
    
  })
    .catch(error => {
      console.error(error);
      return "vacio"
    });
    return "vacio"

 }


function arrayToJson(arr) {
  let jsonArr = [];
  for (let i = 1; i < arr.length; i++) {
    let obj = arr[i];
    let json = {};
    let keys = Object.keys(obj);
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j];
      json[key] = obj[key];
    }
    jsonArr.push(json);
  }
  // var index = jsonArr.indexOf("[");
  // var index2 = jsonArr.indexOf("]");

  // if (index !== -1 && index2 !== -1) {
  //   jsonArr[index] = '';
  //   jsonArr[index2] = '';
  // }  
  return jsonArr;
}


function buildJson(data) {
  let jsonArr = arrayToJson(data);
  let newJsonArr = [];
  for (var i = 0; i < jsonArr.length; i++) { 
    BateriaObj.descripcion = jsonArr[i][0]
    BateriaObj.imagen = jsonArr[i][1]
    BateriaObj.marca = jsonArr[i][2]
    BateriaObj.precio = jsonArr[i][3]
    BateriaObj.especial = jsonArr[i][4]
    BateriaObj.orden = jsonArr[i][5]
    newJsonArr.push({...BateriaObj})
  }  
  let json = {
      baterias: [
        ...newJsonArr
      ]
  };
  return json
}

  
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
  var jsonAFiltrar
  if (marca != null){
      obtenerDataFiltrada(marca)
    }
    else{
      getSheetData()
    }
  }

function llenarHTML(htmlAInsertar,json){
  htmlAInsertar = ""
  for (let propierties of json.baterias) {
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
                <a href="javascript:ventanaSecundaria('https://api.whatsapp.com/send?phone=+5491169761257&text=Hola!%20Te%20consulto%20por%20una%20bateria?%20seria%20la%20${propierties.descripcion}')">
                <button type="button" class="btn btn-danger btn-block"><small>CONTACTAR</small></button>
              </a>
            </div>
        </article>
    `
  }
  return htmlAInsertar
}
getSheetData()
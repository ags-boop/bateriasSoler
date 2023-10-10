let req = new XMLHttpRequest();
let BIN_ID = "64454a088e4aa6225e8f5935";

const BateriaObj = {
  descripcion: "",
  imagen: "",
  marca: "",
  precio: "",
  especial:"",
  orden:""
};

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    //console.log(req.responseText);
  }
};


function actualizar(json) {
  req.open("PUT", `https://api.jsonbin.io/v3/b/${BIN_ID}`, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2b$10$OUBjLRQYYpa3cTlEbeSUY.SQUYM73UoNSO9S3v.CQaLJq2h9qwo9K");
  req.send(json);
  //console.log(req.response)
}


//3600000 -> 1hs


function getSheetData() {

  const sheetId = "1L2U5w5ldAgEjVMfuAoEnZsnFsLNZTqh5fuLH_y7qYR4";
  const apiKey = "AIzaSyA9hpVGy4uzlhess_WZ8zZ1K9HKklQfYK0";
  const range = "PreciosProductos!2:1000"; // Rango de celdas que se desea obtener
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      buildJson(data.values)
    })
    .catch(error => {
      console.error(error);
    });
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

  actualizar(JSON.stringify(json))
 
}

getSheetData()

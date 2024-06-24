document.addEventListener("DOMContentLoaded", getTotalData);
document.addEventListener("click", dataActions);

let btnañadir = document.getElementById("btnañadir");
btnañadir.addEventListener("click", postData);

let btnmodificar = document.getElementById("btnmodificar");
btnmodificar.disabled = true;
btnmodificar.addEventListener("click", patchData);

// let btnbuscar = document.getElementById("btnbuscar");
// btnbuscar.addEventListener("click", getOneData);

async function getTotalData() {
  let url = "http://127.0.0.1:3000/usuarios";
  let solicitud = await fetch(url);
  let datos = await solicitud.json();
  let contenido = document.getElementById("contenido");

  datos.forEach((fh) => {
    let tr = document.createElement("tr");
    tr.classList.add("text-center");

    let td1 = document.createElement("td");
    td1.classList.add("align-content-center", "text-center");
    td1.innerHTML = `${fh.id}`;

    let td2 = document.createElement("td");
    td2.classList.add("align-content-center", "text-center");
    td2.innerHTML = `${fh.nombre}`;

    let td3 = document.createElement("td");
    td3.classList.add("align-content-center", "text-center");
    td3.innerHTML = `${fh.nombreinstructor}`;
    
    let td4 = document.createElement("td");
    td4.classList.add("align-content-center", "text-center");
    td4.id = `${fh.elementomaquina}`;

    let td5 = document.createElement("td");
    td4.classList.add("align-content-center", "text-center");
    td4.id = `${fh.prestamo}`;

    let td6 = document.createElement("td");
    td4.classList.add("align-content-center", "text-center");
    td4.id = `${fh.preop}`;

    let iconoeditar = document.createElement("i");
    iconoeditar.classList.add(
      "fa-solid",
      "fa-pen-to-square",
      "btn",
      "btn-warning",
      "me-1",
      "editar"
    );
    iconoeditar.setAttribute('data-bs-toggle','modal');
    iconoeditar.setAttribute("data-bs-target", "#addModal");
    iconoeditar.setAttribute("data-bs-target", "#addModal1");

    td4.appendChild(iconoeditar);

    let iconoeliminar = document.createElement("i");
    iconoeliminar.classList.add(
      "fa-solid",
      "fa-trash-can",
      "btn",
      "btn-danger",
      "eliminar"
    );

    td4.appendChild(iconoeliminar);

    tr.appendChild(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.appendChild(td6);
    contenido.appendChild(tr);
  });

  const table = new DataTable("#tabledatos", {
    // layout: {
    //     topStart: 'pageLength',
    //     topEnd: 'search',
    //     bottomStart: 'info',
    //     bottomEnd: 'paging'
    // }

    topStart: {
      pageLength: {
        menu: [5, 10, 25, 50, 100],
      },
    },
    bottomEnd: {
      paging: {
        number: 5,
      },
    },
    // "language": {
    //     "lengthMenu": "Display MENU records per page",
    //     "zeroRecords": "Nothing found - sorry",
    //     "info": "Showing page PAGE of PAGES",
    //     "infoEmpty": "No records available",
    //     "infoFiltered": "(filtered from MAX total records)"
    // }
    language: {
      lengthMenu: "Mostrar _MENU_ Registros por pagina",
      zeroRecords: "Ningún registro coincide",
      info: "Mostrando pagina _PAGE_ de _PAGES_",
      infoEmpty: "Ningún registro disponible",
      search: "Buscar",
      paginate: {
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });
}

// async function getOneData() {
//   let busqueda = document.getElementById("busqueda").value;
//   let url = `http://127.0.0.1:3000/usuarios/${busqueda}`;

//   let respuesta = await fetch(url);
//   let dato = await respuesta.json();
//   console.table(dato);
//   let contenido = document.getElementById("contenido");

//   while (contenido.firstChild) {
//     contenido.removeChild(contenido.firstChild);
//   }

//   let tr = document.createElement("tr");
//   tr.classList.add("text-center");

//   let td1 = document.createElement("td");
//   td1.classList.add("align-content-center");
//   td1.innerHTML = `${dato._id}`;

//   let td2 = document.createElement("td");
//   td2.classList.add("align-content-center");
//   td2.innerHTML = `${dato.nombre}`;

//   let td3 = document.createElement("td");
//   td3.classList.add("align-content-center");
//   td3.innerHTML = `${dato.saldo}`;

//   let td4 = document.createElement("td");
//   td4.id = `${dato._id}`;

//   let iconoeditar = document.createElement("i");
//   iconoeditar.classList.add(
//     "fa-solid",
//     "fa-pen-to-square",
//     "btn",
//     "btn-warning",
//     "me-1",
//     "editar"
//   );

//   td4.appendChild(iconoeditar);

//   let iconoeliminar = document.createElement("i");
//   iconoeliminar.classList.add(
//     "fa-solid",
//     "fa-trash-can",
//     "btn",
//     "btn-danger",
//     "eliminar"
//   );

//   td4.appendChild(iconoeliminar);

//   tr.appendChild(td1);
//   tr.append(td2);
//   tr.append(td3);
//   tr.appendChild(td4);
//   contenido.appendChild(tr);
// }

async function postData() {
  let formulario = document.getElementById("formulario");
  let formData = new FormData(formulario);
  let datosJson = {};
  for (const entrada of formData.entries()) {
    datosJson[entrada[0]] = entrada[1];
  }

  let url = "http://127.0.0.1:3000/usuarios";

  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosJson),
  };

  let solicitud = await fetch(url, config);
  let datos = await solicitud.text();
  setTimeout(() => {
    location.reload();
  }, 0);
}

function dataActions(e) {
  if (e.target.matches(".editar")) {
    editData(e);
  }
  if (e.target.matches(".eliminar")) {
    deleteData(e);
  }
}

async function editData(e) {
  let elementoedit = e.target.parentNode.id;
  let url = `http://127.0.0.1:3000/usuarios/${elementoedit}`;

  let respuesta = await fetch(url);
  let dato = await respuesta.json();
  console.table(dato);

  let formulario = document.getElementById("formulario");
  formulario.elements["id"].value = dato.id;
  formulario.elements["nombre"].value = dato.nombre;
  formulario.elements["nombreinstructor"].value = dato.nombreinstructor;
  formulario.elements["elementomaquina"].value = dato.elementomaquina;
  formulario.elements["prestamo"].value = dato.prestamo;
  formulario.elements["preop"].value = dato.preop;

  btnmodificar.disabled = false;
}

async function patchData() {
  let datosF = new FormData(formulario);
  let datosJson = {};
  for (const entrada of datosF.entries()) {
    datosJson[entrada[0]] = entrada[1];
  }
  let elementoedit = datosJson.id;
  let url = `http://127.0.0.1:3000/usuarios/${elementoedit}`;
  const conf = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosJson),
  };
  let respuestaedit = await fetch(url, conf);
  setTimeout(() => {
    location.reload();
  }, 0);
}

async function deleteData(e) {
  let elementodelete = e.target.parentNode.id;
  let url = `http://127.0.0.1:3000/usuarios/${elementodelete}`;

  const conf = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: elementodelete }),
  };

  let respuesta = await fetch(url, conf);
  let dato = await respuesta.text();
  console.table(dato);
  setTimeout(() => {
    location.reload();
  }, 0);
}

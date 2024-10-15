let listaNombreGastos = [];
let listaDescripcionGastos = [];
let listaValorGastos = [];
let btnAgregar = document.getElementById("btnAgregar");
let btnCancelar = document.getElementById("btnCancelar");

function agregarGasto() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let descripcionGasto = document.getElementById("txtDescripcion").value;
    let valorGasto = document.getElementById("valorGasto").value;

    let validacion  = validarDatosIngresados([nombreGasto,descripcionGasto, valorGasto]);
    console.log(validacion);

    if (validacion) {
        listaNombreGastos.push(nombreGasto);
        listaDescripcionGastos.push(descripcionGasto);
        listaValorGastos.push(valorGasto);
        mostrarListaGastos();        
    }else{
        console.log("Ingrese datos en todos los campos para agregar un nuevo gasto");
    }
}

function mostrarListaGastos() {
    const listadoGastosUl = document.getElementById("listaDeGastos");
    const totalMensualSpan = document.getElementById("totalGastos");
    let totalGastos = 0;
    let gastosLi = "";
    listaNombreGastos.forEach( (elemento, posicion) => {
        const valorGasto = Number(listaValorGastos[posicion]);
        const descGasto = listaDescripcionGastos[posicion];
        gastosLi += 
            `<li>
                ${elemento} - USD$ ${valorGasto.toFixed(2)} -> ${descGasto}
                <div id="opcionesGastos">
                    <button onclick="seleccionarGastoEditar(${posicion})";>Editar</button>
                    <button onclick="eliminarGasto(${posicion})";>Eliminar</button>
                </div>
            </li>`;
        totalGastos += valorGasto;
    });
    
    listadoGastosUl.innerHTML = gastosLi;
    totalMensualSpan.innerHTML = totalGastos.toFixed(2);

    limpiarCampos();
}

function seleccionarGastoEditar(index) {
    //ocultar el boton agregar
    document.getElementById("btnAgregar").hidden = true;

    let divBotones = document.getElementById("botones");
    let btnCancelar = document.getElementById("btnCancelar");
    let listaElementos = divBotones.childNodes;
   
    //cargar los inputs con los datos que se deben editar
    document.getElementById("nombreGasto").value = listaNombreGastos[index];
    document.getElementById("txtDescripcion").value = listaDescripcionGastos[index];
    document.getElementById("valorGasto").value = listaValorGastos[index];
    
    //crear boton editar 
    if (!divBotones.querySelector('.btnEditar')) {
        console.log(!!divBotones.querySelector('.btnEditar'));
        let buttonEditar = document.createElement("button");
        buttonEditar.textContent = "Editar";
        buttonEditar.classList.add("btnEditar");
        buttonEditar.onclick = () => editarGasto(index);
        
        divBotones.insertBefore(buttonEditar,btnCancelar); 
    }
}
function editarGasto(posicion) {
    //mostrar el boton agregar
    document.getElementById("btnAgregar").hidden = false;

    let nombreGasto = document.getElementById("nombreGasto").value;
    let descripcionGasto = document.getElementById("txtDescripcion").value;
    let valorGasto = document.getElementById("valorGasto").value;
    let elementoEliminar = document.getElementsByClassName("btnEditar");

    let validacion  = validarDatosIngresados([nombreGasto,descripcionGasto, valorGasto]);

    if (validacion) {
        listaNombreGastos[posicion] = nombreGasto;
        listaDescripcionGastos[posicion] = descripcionGasto;
        listaValorGastos[posicion] = valorGasto;
        
        // eliminar el boton editar 
        elementoEliminar ? Array.from(elementoEliminar).forEach(elemento => elemento.remove()) : alert("No se elimino el btnEditar");
        mostrarListaGastos();
    }else{
        document.getElementById("btnAgregar").hidden = true;
        console.log("Ingrese datos en todos los campos para editar un nuevo gasto");
    }        
}

function eliminarGasto(posicion) {
    listaNombreGastos.splice(posicion, 1);
    listaValorGastos.splice(posicion,1);
    mostrarListaGastos();
}
function limpiarCampos() {
    document.getElementById("nombreGasto").value = '';
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("valorGasto").value = '';
}

function cancelar() {
    let botones = document.getElementById("botones");
    limpiarCampos();
    if (botones.querySelector(".btnEditar")) {
        let btnEditar = document.getElementsByClassName("btnEditar");
        // eliminar el boton editar 
        btnEditar ? Array.from(btnEditar).forEach(elemento => elemento.remove()) : alert("No se elimino el btnEditar");
        //mostrar el boton agregar
        document.getElementById("btnAgregar").hidden = false;
    }
}

//retorna true si los datos son validos
function validarDatosIngresados(datos=[]) {
    let camposVacios = 0;
    for (const key in datos) {
        if (datos[key] == "") {
            camposVacios++;
        }
    }
    if (camposVacios==0) {
        return true;
    }
    return false;
}
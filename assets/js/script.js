let listaNombreGastos = [];
let listaValorGastos = [];
let btnAgregar = document.getElementById("btnAgregar");
let btnCancelar = document.getElementById("btnCancelar");

interruptorBoton("cancelar", true);

function agregarGasto() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let valorGasto = document.getElementById("valorGasto").value;
    // let descripcionGasto;

    listaNombreGastos.push(nombreGasto);
    listaValorGastos.push(valorGasto);
    
    // console.log(listaNombreGastos);
    // console.log(listaValorGastos);

    mostrarListaGastos();
    
}

function mostrarListaGastos() {
    const listadoGastosUl = document.getElementById("listaDeGastos");
    const totalMensualSpan = document.getElementById("totalGastos");
    let totalGastos = 0;
    let gastosLi = "";
    listaNombreGastos.forEach( (elemento, posicion) => {
        const valorGasto = Number(listaValorGastos[posicion]);
        gastosLi += 
            `<li>
                ${elemento} - USD$ ${valorGasto.toFixed(2)}
                <button onclick="editarGastoSeleccionado(${posicion})";>Editar</button>
                <button onclick="eliminarGasto(${posicion})";>Eliminar</button>
            </li>`;
        totalGastos += valorGasto;
    });
    
    listadoGastosUl.innerHTML = gastosLi;
    totalMensualSpan.innerHTML = totalGastos.toFixed(2);

    limpiarCampos();
}

function editarGastoSeleccionado(index) {
    //cargar los inputs con los datos que se deben editar
    const divBotones = document.getElementById("botones");
    document.getElementById("nombreGasto").value = listaNombreGastos[index];
    document.getElementById("valorGasto").value = listaValorGastos[index];
    //configurar los botones para editar
    interruptorBoton("agregar", true)
    interruptorBoton("cancelar", false)
    //crear boton editar 
    let btnEditar = `<button id="btnEditar" onclick="editar(${index});">Editar</button>`;
    divBotones.innerHTML = btnEditar;
}
function editar(posicion) {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let valorGasto = document.getElementById("valorGasto").value;

    listaNombreGastos[posicion] = nombreGasto;
    listaValorGastos[posicion] = valorGasto;

    mostrarListaGastos();
    cancelar();
}

function eliminarGasto(posicion) {
    listaNombreGastos.splice(posicion, 1);
    listaValorGastos.splice(posicion,1);
    mostrarListaGastos();
}
function limpiarCampos() {
    document.getElementById("nombreGasto").value = '';
    document.getElementById("valorGasto").value = '';
}

function interruptorBoton(boton, estado) {
    switch (boton) {
        case "agregar":
            btnAgregar.hidden = estado;
            break;
        case "editar":
            btnEditar.hidden = estado;
        break;
        case "cancelar":
            btnCancelar.hidden = estado;
        break;
        default:
            break;
    }
}
function cancelar() {
    limpiarCampos();
    interruptorBoton("agregar", false);
    interruptorBoton("editar", true);
    interruptorBoton("cancelar", true);
}
let listaNombreGastos = [];
let listaDescripcionGastos = [];
let listaValorGastos = [];
let btnAgregar = document.getElementById("btnAgregar");
let btnCancelar = document.getElementById("btnCancelar");

function agregarGasto() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let descripcionGasto = document.getElementById("txtDescripcion").value;
    let valorGasto = document.getElementById("valorGasto").value;

    listaNombreGastos.push(nombreGasto);
    listaDescripcionGastos.push(descripcionGasto);
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
        const descGasto = listaDescripcionGastos[posicion];
        gastosLi += 
            `<li>
                ${elemento} - USD$ ${valorGasto.toFixed(2)} -> ${descGasto}
                <div id="opcionesGastos">
                    <button onclick="editarGastoSeleccionado(${posicion})";>Editar</button>
                    <button onclick="eliminarGasto(${posicion})";>Eliminar</button>
                </div>
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
    document.getElementById("txtDescripcion").value = listaDescripcionGastos[index];
    document.getElementById("valorGasto").value = listaValorGastos[index];
    //crear boton editar 
    let btnEditar = `<button class="btnEditar" onclick="editar(${index});">Editar</button>`;
    divBotones.innerHTML += btnEditar;
    //configurar los botones para editar
    interruptorBoton("btnAgregar", true);
}
function editar(posicion) {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let descripcionGasto = document.getElementById("txtDescripcion").value;
    let valorGasto = document.getElementById("valorGasto").value;
    let elementoEliminar = document.getElementsByClassName("btnEditar");
    listaNombreGastos[posicion] = nombreGasto;
    listaDescripcionGastos[posicion] = descripcionGasto;
    listaValorGastos[posicion] = valorGasto;
    

    interruptorBoton("btnAgregar");
    Array.from(elementoEliminar).forEach(elemento => elemento.remove()) //eliminar el boton editar
    mostrarListaGastos();

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

function interruptorBoton(boton, estado=false) {
    document.getElementById(boton).hidden = estado;
}
function cancelar() {
    limpiarCampos();
    interruptorBoton("btnAgregar", false    )
}
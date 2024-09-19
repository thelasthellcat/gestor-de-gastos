let listaNombreGastos = [];
let listaValorGastos = [];

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
                <button onclick="alert("Aun no funciona")";>Editar</button>
                <button onclick="eliminarGasto(${posicion})";>Eliminar</button>
            </li>`;
        totalGastos += valorGasto;
    });
    
    listadoGastosUl.innerHTML = gastosLi;
    totalMensualSpan.innerHTML = totalGastos.toFixed(2);

    limpiarCampos();
}

function limpiarCampos() {
    document.getElementById("nombreGasto").value = '';
    document.getElementById("valorGasto").value = '';
}

function eliminarGasto(posicion) {
    console.log(posicion);
    listaNombreGastos.splice(posicion, 1);
    listaValorGastos.splice(posicion,1);
    mostrarListaGastos();
}

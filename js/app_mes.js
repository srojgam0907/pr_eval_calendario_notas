const nombreMes= document.querySelector('#NombreMes');
const tituloNota= document.querySelector('#titulo');
const descripcionNota= document.querySelector('#descripcion');
const btnGuardar= document.querySelector('#btnGuardar');
const notas= document.querySelector('#notasMes');
const mensajeError= document.querySelector('#mensajeError');

const nombresMeses= ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const params= new URLSearchParams(window.location.search);
const numMes= Number(params.get("mes"));

let indiceEdicion= null;

if (numMes >= 1 && numMes <= 12) {
    nombreMes.textContent = `${nombresMeses[numMes]}`;
} else {
    window.location.href = 'index.html';
}

//FUNCIONES
function obtenerNotas() {
    const listaNotas= localStorage.getItem('calendarioNotas');
    return listaNotas ? JSON.parse(listaNotas) : [];
}

function mostrarNotas() {
    const todasLasNotas= obtenerNotas();
    notas.innerHTML= "";

    todasLasNotas.forEach((nota, index) => {
        if(nota.mes === numMes) {
            const divNota= document.createElement('div');
            divNota.classList.add('nota');

            divNota.innerHTML= `
                <h4>${nota.titulo}</h4>
                <p>${nota.descripcion}</p>
                <div class="acciones">
                    <button class="btnEditar" onclick="editar(${index})">Editar</button>
                    <button class="btnBorrar" onclick="eliminar(${index})">Eliminar</button>
                </div>
            `;

            notas.appendChild(divNota);
        }
    });
}

//EVENTOS
btnGuardar.addEventListener('click', () => {
    const tituloValue= tituloNota.value.trim();
    const descValue= descripcionNota.value.trim();

    if(tituloValue === "" || descValue === "") {
        mensajeError.textContent= "Rellena ambos campos";
        setTimeout(() => {
            mensajeError.textContent = "";
        }, 2000);
        return;
    }

    let lista= obtenerNotas();

    if (indiceEdicion !== null) {
        lista[indiceEdicion].titulo = tituloValue;
        lista[indiceEdicion].descripcion = descValue;
        indiceEdicion = null;
        btnGuardar.textContent = "Guardar Nota";
    } else {
        lista.push({ titulo: tituloValue, descripcion: descValue, mes: numMes });
    }

    localStorage.setItem('calendarioNotas', JSON.stringify(lista));
    tituloNota.value = "";
    descripcionNota.value = "";
    tituloNota.focus();
    mostrarNotas();
});

//ELIMINAR Y EDITAR
window.eliminar = (index) => {
    if (confirm("¿Seguro que quieres borrar esta nota?")) {
        let lista = obtenerNotas();
        lista.splice(index, 1);
        localStorage.setItem('calendarioNotas', JSON.stringify(lista));
        mostrarNotas();
    }
};

window.editar = (index) => {
    let lista = obtenerNotas();
    const nota = lista[index];

    tituloNota.value = nota.titulo;
    descripcionNota.value = nota.descripcion;
    
    indiceEdicion = index;
    btnGuardar.textContent = "Actualizar Cambios";
    tituloNota.focus();
};

mostrarNotas();
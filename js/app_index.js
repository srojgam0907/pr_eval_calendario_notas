const btnListar= document.querySelector("#btn-listar");
const btnLimpiar= document.querySelector("#btn-limpiar");
const meses= document.querySelector(".mes");
const listaGlobal= document.querySelector("#listaGlobal");

//FUNCIONES

function obtenerNotas() {
    const notas= localStorage.getItem('calendarioNotas');
    
    if(notas) {
        return JSON.parse(notas);

    } else {
        return [];
    }
}

function contadorNotas() {
    const notas= obtenerNotas();
    
    for(let i=0; i< meses.length; i++) {
        const mesActual= meses[i];
        const numMes= i+1;
        const notasMes= notas.filter(n => n.mes == numMes);
        const contador= notasMes.length;
        
        const numNotas= mesActual.querySelector('.numeroNotas');
        numNotas.textContent= `${contador} notas`;

        if(contador > 0) {
            mesActual.classList.add('on');

        } else {
            mesActual.classList.remove('on');
        }
    }
}


//EVENTOS

btnLimpiar.addEventListener("click", () => {
    if(confirm("¿Seguro de que quieres borrar todas las notas?")) {
        localStorage.removeItem('calendarioNotas');
        contadorNotas(); //actualiza los contadores
    }
});

btnListar.addEventListener("click", () => {
    const nombresMeses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const notas= obtenerNotas();
    listaGlobal.innerHTML= "";

    if(notas.length === 0) {
        listaGlobal.innerHTML= "<p>Todavia no hay notas</p>"
        return;
    }

    const h2= document.createElement("h2");
    h2.textContent= "Lista de notas global";
    listaGlobal.appendChild(h2);

    const contenedorNotas= document.createElement("div");
    contenedorNotas.classList.add("contenedorNotas");

    for(let i=0; i< notas.length; i++) {
        const notaActual= notas[i];
        const nombreMes= nombresMeses[notaActual.mes];

        const nota = document.createElement("div");
        nota.classList.add("nota");

        nota.innerHTML= `
            <div class="header-nota">
                <span class="etiqueta-mes">${nombreMes}</span>
            </div>
            <h4>${notaActual.titulo}</h4>
            <p>${notaActual.descripcion}</p>
        `;

        contenedorNotas.appendChild(nota);
    }

    listaGlobal.appendChild(contenedorNotas);
});
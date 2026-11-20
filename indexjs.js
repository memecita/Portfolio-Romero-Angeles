
const proyectos = [
    {
        nombre: "Portfolio 2025",
        descripcion: 'Mi primer proyecto "Portfolio".',
        imagen: "proyecto1.png",
        tecnologias: ["HTML", "CSS"],
        enlace: "https://memecita.github.io/Portafolio-2025/"
    },
    {
        nombre: "Primer Formulario",
        descripcion: "Mi primer formulario, es solo una estructura.",
        imagen: "proyecto2.png",
        tecnologias: ["HTML", "CSS"],
        enlace: "https://memecita.github.io/Primer-Formulario/"
    },
    {
        nombre: "Página Veterinaria",
        descripcion: "Página con temática de veterinaria y varias secciones.",
        imagen: "proyecto3.png",
        tecnologias: ["HTML", "CSS"],
        enlace: "https://memecita.github.io/P-gina-Veterinaria/"
    },
    {
        nombre: "Calculadora con JS",
        descripcion: "Calculadora de suma, resta, división y multiplicación.",
        imagen: "proyecto4.png",
        tecnologias: ["HTML", "CSS", "JAVASCRIPT"],
        enlace: "https://memecita.github.io/Calculadora/"
    },
    {
        nombre: "Carrusel de productos",
        descripcion: "Mi favorito, un carrusel basado en una pastelería.",
        imagen: "proyecto5.png",
        tecnologias: ["HTML", "CSS", "JAVASCRIPT"],
        enlace: "https://memecita.github.io/Carrusel-Pastel/"
    },
    {
        nombre: "Home Básica",
        descripcion: "Primer Proyecto de Figma.",
        imagen: "proyecto7.png",
        tecnologias: ["FIGMA"],
        enlace: "https://www.figma.com/design/ZFCngBwVRWJCbiSKNQC3gv/Storeme?node-id=0-1&p=f&t=vzpIdodKZKv1GvSE-0"
    },
    {
        nombre: "Página con Figma",
        descripcion: "Biblioteca virtual con varias secciones.",
        imagen: "Proyecto 6.png",
        tecnologias: ["FIGMA"],
        enlace: "https://www.figma.com/design/9rvaevp0sTdJCTIq0Fka0f/Sin-t%C3%ADtulo?node-id=14-144&t=hcdxjgM12nItZGRp-0"
    }  
];

let cuantasVeVisible = 4;
let posicion = 0;


function ajustarCarrusel() {

    let nuevaCantidad;

    if (window.innerWidth <= 600) {
        nuevaCantidad = 1;
    } else if (window.innerWidth <= 900) {
        nuevaCantidad = 2;
    } else {
        nuevaCantidad = 4;
    }

    if (nuevaCantidad !== cuantasVeVisible) {
        cuantasVeVisible = nuevaCantidad;
        posicion = 0;

        renderizarIndicadores();
        aplicarDesplazamiento();
    }
}

window.addEventListener("resize", ajustarCarrusel);



function renderizarProyectos() {

    let track = document.getElementById("carrusel-track");
    track.innerHTML = "";

    proyectos.forEach(function(proyecto) {

        let tarjeta = document.createElement("div");
        tarjeta.classList.add("proyecto-card");

        let etiquetas = "";

        proyecto.tecnologias.forEach(function(tecnologia) {
            etiquetas += `<span>${tecnologia}</span>`;
        });

        tarjeta.innerHTML = `
            <img src="${proyecto.imagen}" alt="${proyecto.nombre}">

            <div class="proyecto-info">

                <h3>${proyecto.nombre}</h3>

                <p>${proyecto.descripcion}</p>

                <div class="tags">
                    ${etiquetas}
                </div>

                <a href="${proyecto.enlace}" target="_blank">
                    Ver proyecto
                </a>

            </div>
        `;

        track.appendChild(tarjeta);
    });

    renderizarIndicadores();
    actualizarFlechas();
}

function renderizarIndicadores() {

    let contenedor = document.getElementById("indicadores-proyectos");
    contenedor.innerHTML = "";

    let totalPaginas = Math.ceil(proyectos.length / cuantasVeVisible);

    for (let i = 0; i < totalPaginas; i++) {

        let punto = document.createElement("button");
        punto.classList.add("punto-proyecto");

        if (i === posicion) {
            punto.classList.add("activo");
        }

        punto.onclick = function() {
            posicion = i;
            aplicarDesplazamiento();
        };

        contenedor.appendChild(punto);
    }
}
function moverCarrusel(direccion) {

    let totalPaginas = Math.ceil(proyectos.length / cuantasVeVisible);

    posicion = posicion + direccion;

    if (posicion < 0) {
        posicion = 0;
    }

    if (posicion >= totalPaginas) {
        posicion = totalPaginas - 1;
    }

    aplicarDesplazamiento();
}

function aplicarDesplazamiento() {

    let track = document.getElementById("carrusel-track");
    let tarjeta = track.children[0];

    if (!tarjeta) {
        return;
    }

    let anchoTarjeta = tarjeta.offsetWidth;
    let espacio = parseFloat(getComputedStyle(track).gap) || 0;

    let totalPaginas = Math.ceil(proyectos.length / cuantasVeVisible);

    let primeraTarjeta = posicion * cuantasVeVisible;

    if (posicion === totalPaginas - 1) {
        primeraTarjeta = Math.max(0, proyectos.length - cuantasVeVisible);
    }

    let desplazamiento = primeraTarjeta * (anchoTarjeta + espacio);

    track.style.transform = "translateX(-" + desplazamiento + "px)";

    actualizarFlechas();
    actualizarPuntos();
}

function actualizarFlechas() {

    let anterior = document.getElementById("btn-anterior");
    let siguiente = document.getElementById("btn-siguiente");

    let totalPaginas = Math.ceil(proyectos.length / cuantasVeVisible);

    anterior.disabled = (posicion === 0);
    siguiente.disabled = (posicion === totalPaginas - 1);
}


function actualizarPuntos() {

    let puntos = document.querySelectorAll(".punto-proyecto");

    puntos.forEach(function(punto, i) {

        if (i === posicion) {
            punto.classList.add("activo");
        } else {
            punto.classList.remove("activo");
        }

    });
}

document.addEventListener("DOMContentLoaded", function() {

    ajustarCarrusel();
    renderizarProyectos();

});


function cambiarTema() {

    document.body.classList.toggle("oscuro");
    let boton = document.getElementById("btn-tema");
    if (document.body.classList.contains("oscuro")) {
        boton.textContent = "Modo Claro";
    } else {
        boton.textContent = "Modo Oscuro";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    renderizarIndicadores();
    aplicarDesplazamiento();
});

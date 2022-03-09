// ---------------------------- Variables

const jugadores             = [];
const dados                 = [];
const duplicados            = [];
const separados             = [];

let cantidadDeJugadores     = 0;

let nombreJugador           = '';
let esHumano                = true;

// ---------------------------- Constantes DOM

const juegoNuevo            = document.getElementById('juego-nuevo')
const main                  = document.getElementsByTagName('main')
const form                  = document.getElementsByTagName('form')
const botonIniciar          = document.getElementById('boton-iniciar')

// ---------------------------- Jugadores

class Jugador{

    constructor(nombre, humano) {

        cantidadDeJugadores++

        this.nombre             = nombre;
        this.humano             = humano;
        this.puntuacion         = 0;
        this.pasoElMinimo       = false;
        this.ganador            = false;
        this.esMiTurno          = cantidadDeJugadores === 1;

    }

}

// ---------------------------- Funciones

function mostrarJugadores() {

    main[0].children[2].remove()
    
    let contenedor = document.createElement('div');
    contenedor.classList = 'mt-5 text-center';

    let contenedor2 = document.createElement('div');
    contenedor2.classList = 'row';

    for (let i = 0; i < jugadores.length; i++) {
        /*
        let tipo = '';

        if (jugadores[i].humano) {
            tipo = 'Humano';
        } else {
            tipo = 'Máquina';
        }
        */

        let contenedor3 = document.createElement('div');
        contenedor3.classList = 'col-12 col-md-3 p-3';
        contenedor3.innerHTML = `
            <div class="bg-dark rounded text-white p-3">
                <h4 class="mb-3">Jugador N°${i+1}</h4>
                <h5>${jugadores[i].nombre}</h5>
            </div>
        `;

        contenedor2.appendChild(contenedor3)
        
    }

    contenedor.appendChild(contenedor2)

    main[0].appendChild(contenedor);

}

function mostrarJuego() {

    // Limpiar
    main[0].innerHTML = '';

    // Cambiar clases
    main[0].classList = 'container-fluid text-center bg';

    main[0].innerHTML = `
        <div class="row align-items-center justify-content-start">
            <div class="" id="jugador-se-paso"></div>
            <div class="col-6 col-md-3 bg-primary text-white p-1 rounded-end" id="datos">
                <div class="row align-items-center justify-content-center">
                    <div class="col-9 col-md-10">
                        <p class="m-0">Turno:</p>
                        <h5>Nombre</h5>
                        <p class="m-0">Puntuación: <span>10000</span></p>
                    </div>
                    <div class="col-3 col-md-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-double-right w-100" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-end justify-content-center" id="tablero">
            <div class="col-12 col-md-6 my-3 my-md-5" id="dados">
                <h2>Dados:</h2>
                <div class="row align-items-center justify-content-center pt-3">
                    <div class="col-2">
                        <img src="img/uno.png" class="w-100-75">
                    </div>
                    <div class="col-2">
                        <img src="img/cero.png" class="w-100-75">
                    </div>
                    <div class="col-2">
                        <img src="img/cero.png" class="w-100-75">
                    </div>
                    <div class="col-2">
                        <img src="img/cero.png" class="w-100-75">
                    </div>
                    <div class="col-2">
                        <img src="img/cero.png" class="w-100-75">
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 my-3 my-md-5" id="separados">
                <h2 class="mb-2">Separados:</h2>
                <div class="row align-items-center justify-content-center pt-3">
                    <div class="col-2">
                        <img src="img/uno.png" class="w-100-75">
                    </div>
                    <div class="col-2">
                        <img src="img/cero.png" class="w-100-75">
                    </div>
                    <div class="col-2">
                        <img src="img/cero.png" class="w-100-75">
                    </div>
                    <div class="col-2">
                        <img src="img/cero.png" class="w-100-75">
                    </div>
                    <div class="col-2">
                        <img src="img/cero.png" class="w-100-75">
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 my-3 my-md-5" id="puntuacion">
                <h2 class="mb-3">Puntuacion tirada:</h2>
                <h5>10.000</h5>
                <div class="progress mt-3">
                    <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 100%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">100%</div>
                </div>
            </div>
            <div class="col-12 col-md-6 my-3 my-md-5">
                <div class="row">
                    <div class="col-12 col-md-6 my-2">
                        <button class="btn btn-danger w-75 d-none" id="pasar">
                            <h5>Pasar</h5>
                        </button>
                    </div>
                    <div class="col-12 col-md-6 my-2">
                        <button class="btn btn-primary w-75" id="tirar-dados">
                            <h5>Tirar Dados</h5>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // ---------------------------- Nuevas constantes DOM

    const idDatos       = document.getElementById('datos');
    const idTablero     = document.getElementById('tablero');
    const idDados       = document.getElementById('dados');
    const idSeparados   = document.getElementById('separados');
    const idPuntuacion  = document.getElementById('puntuacion');
    const idPasar       = document.getElementById('pasar');
    const idTirarDados  = document.getElementById('tirar-dados');
    const jugadorSePaso = document.getElementById('jugador-se-paso');
    const dadosSound    = document.getElementById('dadosSound');

    // ---------------------------- Variables
    
    let numeroDeTirada = 1;
    let contadorDuplicados = 1;
    let cantidadDeDados = 5;
    let puntuacionTirada = 0;
    let puntuacionDeTiradaAcumulada = 0;
    let puntuacionSimple = false;

    // ---------------------------- Funciones

    function buscarIndexJugadorActual() {
        return jugadores.indexOf( jugadores.find( (el) => el.esMiTurno === true ) )
    }

    function restaurarDados() {
        dados.splice(0,dados.length);
    }

    function tirarDados(cantidadDeDados) {
        
        // Tirar cantidad de dados
        for (let i = 0; i < cantidadDeDados; i++) {
            // Asignar valores random del 1 al 5
            dados.push(Math.round( Math.random() * 5 + 1))
        }

    }

    function buscarDuplicados() {

        // Ordenar dados
        dados.sort((a, b) => a - b);

        // Recorrer dados
        for (let i = 0; i < (dados.length); i++) {

            // Si el dado seleccionado es igual al dado siguiente
            if ( dados[i] == dados[i+1] ) {
                
                // Sumar uno a la cuenta de duplicados
                contadorDuplicados++
                
            // Si no es igual
            }else{
    
                // Agregar dado a duplicados, indicando el numero y la cantidad
                duplicados.push({numero: dados[i], cantidad: contadorDuplicados})
                
                // Restaurar contador de duplicados
                contadorDuplicados = 1;
    
            }
            
        }
    }

    function mostrarDadosEnPantalla() {

        idDados.innerHTML = '';

        let contenedor = document.createElement('h2');
        contenedor.innerText = 'Dados';

        idDados.appendChild(contenedor)

        contenedor = document.createElement('div');
        contenedor.classList = 'row align-items-center justify-content-center pt-3';

        for (let i = 0; i < dados.length; i++) {
        
            let contenedor2 = document.createElement('div')
            contenedor2.classList = 'col-2';
            contenedor2.innerHTML = `
                <img src="img/${dados[i]}.png" class="w-100-75">
            `;
        
            contenedor.appendChild(contenedor2)

        }

        idDados.appendChild(contenedor)

    }

    function sonCinco(numero) {

        let valor = false;

        if (dados[0] === numero && dados[1] === numero && dados[2] === numero && dados[3] === numero && dados[4] === numero) {

            valor = true;

        }

        return valor;
        
    }

    function esUnaEscalera() {

        let valor = false;

        if (dados[0] === 1 && dados[1] === 2 && dados[2] === 3 && dados[3] === 4 && dados[4] === 5 || dados[0] === 2 && dados[1] === 3 && dados[2] === 4 && dados[3] === 5 && dados[4] === 6) {

            valor = true;

        }

        return valor;
        
    }

    function sonCuatro(numero) {

        let valor = false;
        
        if (dados[0] === numero && dados[1] === numero && dados[2] === numero && dados[3] === numero) {

            valor =  true;

        }

        return valor;

    }

    function calcularPuntuacion(i) {

        if ( sonCinco(1) ) {

            // Jugador gana automaticamente
            jugadores[i].puntuacion = 10000;
            
        } else if ( sonCinco(5) ) {
            
            puntuacionTirada += 250;
            cantidadDeDados -= 5;

        } else if (esUnaEscalera()) {

            puntuacionTirada += 750;
            cantidadDeDados -= 5;

        } else if (sonCuatro(1)) {

            puntuacionTirada += 400;
            cantidadDeDados -= 4;

            // Agregar a separados
            for (let i = 0; i < 4; i++) {
                separados.push(1)
            }

        } else if (sonCuatro(5)) {

            puntuacionTirada += 200;
            cantidadDeDados -= 4;

            // Agregar a separados
            for (let i = 0; i < 4; i++) {
                separados.push(5)
            }

        } else {

            // Recorrer dados
            for (const iterator of duplicados) {
            
                // Se repite 3 veces
                if (iterator.cantidad == 3) {
                
                    // Se repite 3 veces y es un 1
                    if (iterator.numero == 1) {

                        // Sumar mil
                        puntuacionTirada += 1000;

                        // Agregar a separados
                        for (let i = 0; i < 3; i++) {
                            separados.push(iterator.numero)
                        }
                    
                    // Se repite 3 veces y es otro numero
                    }else{

                        console.log(iterator.numero)
                        console.log('Por 100 = ' + iterator.numero * 100)

                        // Multiplicar numero por cien
                        puntuacionTirada += iterator.numero * 100;

                        // Agregar a separados
                        for (let i = 0; i < 3; i++) {
                            separados.push(iterator.numero)
                        }
                    
                    }

                    // Restar 3 dados
                    cantidadDeDados -= 3;
                
                // El numero es un uno
                }else if (iterator.numero == 1) {
                
                    // Cada 1 vale 100
                    puntuacionTirada += 100 * iterator.cantidad;

                    // Restar la cantidad de dados
                    cantidadDeDados -= iterator.cantidad;

                    if (iterator.cantidad == 1) {
                        separados.push(iterator.numero)
                    } else {
                        separados.push(iterator.numero)
                        separados.push(iterator.numero)
                    }
                
                // El numero es un cinco
                }else if(iterator.numero == 5){

                    // Cada 5 vale 50
                    puntuacionTirada += 50 * iterator.cantidad;

                    // Restar la cantidad de dados
                    cantidadDeDados -= iterator.cantidad;

                    if (iterator.cantidad == 1) {
                        separados.push(iterator.numero)
                    } else {
                        separados.push(iterator.numero)
                        separados.push(iterator.numero)
                    }
                
                // No es ni un 1 ni un 5
                }

            }

        }

        console.log('Puntuacion tirada: ' + puntuacionTirada)
        console.log('Puntuacion acumulada: ' + (puntuacionTirada + puntuacionDeTiradaAcumulada))

        // Borrar duplicados
        duplicados.splice(0,duplicados.length)
    
    }

    function mostrarSeparadosEnPantalla() {
        
        idSeparados.innerHTML = '';

        let contenedor = document.createElement('h2');
        contenedor.classList = 'mb-2';
        contenedor.innerText = 'Separados:';

        idSeparados.appendChild(contenedor);

        contenedor = document.createElement('div');
        contenedor.classList = 'row align-items-center justify-content-center pt-3';

        for (let i = 0; i < separados.length; i++) {
    
            let contenedor2 = document.createElement('div')
            contenedor2.classList = 'col-2';
            contenedor2.innerHTML = `
                <img src="img/${separados[i]}.png" class="w-100-75">
            `;
    
            contenedor.appendChild(contenedor2)
    
        }

        idSeparados.appendChild(contenedor);

    }
    
    function confirmarSiSigueEnJuego(i) {

        if (verificarSiGano(i)) {
            
        } else if (puntuacionTirada > 0) {

            // Sumar puntuacion total de la tirada
            puntuacionDeTiradaAcumulada += puntuacionTirada;

            if (puntuacionDeTiradaAcumulada >= 750 || jugadores[i].pasoElMinimo) {
                // Habilitar boton para pasar
                habilitarBotonPasar()
            }

            // Sumar una tirada
            numeroDeTirada++;

            if (cantidadDeDados === 0) {

                // Restaurar cantidad de dados
                cantidadDeDados = 5;

                // Restaurar separados
                separados.splice(0,separados.length);

            }

        }else{

            cambiarTurno()

            // Llevar puntuacion a 0
            puntuacionDeTiradaAcumulada = 0;

            // Restaurar separados
            separados.splice(0, separados.length);

            // Restaurar cantidad de dados
            cantidadDeDados = 5;

        }

        // Restaurar puntuacion tirada
        puntuacionTirada = 0;

    }

    function cambiarTurno() {

        // Deshabilitar boton pasar
        deshabilitarBotonPasar()

        // Buscar id de jugador actual
        let i = buscarIndexJugadorActual()

        // Quitar turno a jugador actual
        jugadores[i].esMiTurno = false;

        // Pasar turno a jugador siguiente
        if (jugadores[i+1] !== undefined) {

            jugadores[i+1].esMiTurno = true;
            
        // Si no hay jugador siguiente volver a empezar la ronda
        } else {
            
            jugadores[0].esMiTurno = true;

        }

        // Buscar id de jugador actual
        i = buscarIndexJugadorActual()

        puntuacionSimple = !puntuacionSimple;
        mostrarDatos();
        
    }

    function mostrarPuntuacionTirada() {

        // Limpiar
        idPuntuacion.innerHTML = '';

        // Titulo
        let contenedor = document.createElement('h2')
        contenedor.classList = 'mb-3'
        contenedor.innerText = 'Puntuacion tirada:'

        idPuntuacion.appendChild(contenedor)

        // Puntaje en numero
        contenedor = document.createElement('h4')
        contenedor.innerText = puntuacionDeTiradaAcumulada;

        idPuntuacion.appendChild(contenedor)

        // Si todavia no entro, mostrar barrita porcentaje
        if (!jugadores[buscarIndexJugadorActual()].pasoElMinimo) {
            
            // Calcular porcentaje
            porcentajeCompletadoParaEmpezar = Math.round(puntuacionDeTiradaAcumulada * 100 / 750)
    
            // Mostrar barrita
            let contenedor = document.createElement('div')
            contenedor.classList = 'progress mt-3'
            contenedor.innerHTML = `
                <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${porcentajeCompletadoParaEmpezar}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">${porcentajeCompletadoParaEmpezar}%</div>
            `;
    
            idPuntuacion.append(contenedor)
    
        }
    
    }

    function verificarSiGano(i) {

        let valor = false;
        
        if (jugadores[i].pasoElMinimo) {

            if ( (jugadores[i].puntuacion + puntuacionDeTiradaAcumulada) === 10000) {
                
                main[0].innerHTML = `
                <div class="row align-items-center justify-content-end my-5 py-5">
                    <div class="col-12 col-md-4"></div>
                    <div class="col-12 col-md-4 bg-success text-white py-3 rounded">
                        <h1>${jugadores[i].nombre} es el ganador!</h1>
                        <h5 class="mt-4">Puntuacion: ${jugadores[i].puntuacion + puntuacionDeTiradaAcumulada}</h5>
                    </div>
                    <div class="col-12 col-md-4"></div>
                </div>
                `;

                jugadores[i].ganador = true;

                valor =  true;

            } else if ( (jugadores[i].puntuacion + puntuacionDeTiradaAcumulada) >= 10000 ) {

                console.log('Te pasaste')

                jugadorSePaso.classList = 'col-12 bg-danger text-white p-1 rounded-end';

                let contenedor = document.createElement('div');
                contenedor.classList = 'bg-danger py-2 text-white';
                contenedor.innerHTML = `${jugadores[i].nombre} te pasaste! <br> Tenias ${jugadores[i].puntuacion} puntos y sacaste ${puntuacionDeTiradaAcumulada}`;

                jugadorSePaso.appendChild(contenedor);

            }

        }

        return valor;

    }

    function habilitarBotonPasar() {
        idPasar.classList.remove('d-none')
    }

    function deshabilitarBotonPasar() {
        idPasar.classList.add('d-none')
    }

    function tirar() {

        // 

        // Borrar mensaje si el jugador anterior se paso
        limpiarSiSePaso()
        
        let i = buscarIndexJugadorActual();

        restaurarDados()

        tirarDados(cantidadDeDados)

        buscarDuplicados()

        mostrarDadosEnPantalla()

        calcularPuntuacion(i)

        mostrarSeparadosEnPantalla()

        confirmarSiSigueEnJuego(i)

        mostrarPuntuacionTirada()

        // Borrar
        console.log('---')
        console.log('Jugador n°' + (i+1) + ': ' + jugadores[i].nombre + ' - Puntuación: ' + jugadores[i].puntuacion)
        console.log('Dados:')
        for (let index = 0; index < dados.length; index++) {
            console.log(dados[index])
        }
        console.log('---')

        console.log('Puntuacion tirada acumuladad = ' + puntuacionDeTiradaAcumulada)

    }

    function pasar() {

        // Borrar mensaje si el jugador anterior se paso
        limpiarSiSePaso()

        let i = buscarIndexJugadorActual()

        // Si todavia no habia pasado el minimo
        !jugadores[i].pasoElMinimo && (jugadores[i].pasoElMinimo = true);

        verificarSiGano(i)

        if (jugadores[i].puntuacion + puntuacionDeTiradaAcumulada < 10000) {
            // Sumar puntos
            jugadores[i].puntuacion += puntuacionDeTiradaAcumulada;
        }

        cambiarTurno()

        // Llevar puntuacion a 0
        puntuacionDeTiradaAcumulada = 0;

        // Restaurar separados
        separados.splice(0, separados.length);

        // Restaurar cantidad de dados
        cantidadDeDados = 5;

        // Restaurar puntuacion tirada
        puntuacionTirada = 0;

        console.log('Puntuacion tirada acumuladad = ' + puntuacionDeTiradaAcumulada)

    }

    function limpiarSiSePaso() {
        jugadorSePaso.innerHTML = '';
        jugadorSePaso.classList = '';
    }

    function mostrarDatos() {

        let i = buscarIndexJugadorActual();
        
        idDatos.innerHTML = '';

        if (puntuacionSimple) {

            idDatos.classList = 'col-12 bg-primary';

            let contenedor = document.createElement('p');
            contenedor.classList = 'mt-2 p-1 bg-white text-dark rounded';
            contenedor.innerHTML = `Turno: <span class="h5">${jugadores[i].nombre}</span>`;

            idDatos.appendChild(contenedor);

            contenedor = document.createElement('div');
            contenedor.classList = 'row align-items-center justify-content-center';

            for (let ind = 0; ind < jugadores.length; ind++) {
                
                let contenedor2 = document.createElement('div');
                contenedor2.classList = 'col-6 col-md-2 p-3';

                let contenedor3 = document.createElement('div');
                contenedor3.classList = 'bg-light text-dark rounded p-1';

                let contenedor4 = document.createElement('h5');
                contenedor4.innerText = jugadores[ind].nombre;

                contenedor3.appendChild(contenedor4);

                contenedor4 = document.createElement('p');
                contenedor4.innerHTML = `Puntuación: <span class="h5">${jugadores[ind].puntuacion}</span>`;

                contenedor3.appendChild(contenedor4);

                contenedor2.appendChild(contenedor3);

                contenedor.appendChild(contenedor2);

            }

            idDatos.appendChild(contenedor);

            contenedor = document.createElement('div')
            contenedor.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
                    <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                </svg>
            `;
            idDatos.appendChild(contenedor);
            
        } else {

            idDatos.classList = 'col-6 col-md-3 bg-primary text-white p-1 rounded-end';

            let contenedor = document.createElement('div');
            contenedor.classList = 'row align-items-center justify-content-center';

            let contenedor2 = document.createElement('div');
            contenedor2.classList = 'col-9 col-md-10';

            let contenedor3 = document.createElement('p');
            contenedor3.classList = 'm-0';
            contenedor3.innerText = 'Turno';

            contenedor2.appendChild(contenedor3);

            contenedor3 = document.createElement('h5');
            contenedor3.innerText = jugadores[i].nombre;

            contenedor2.appendChild(contenedor3);

            contenedor3 = document.createElement('p');
            contenedor3.classList = 'm-0';
            contenedor3.innerText = `Puntuación: ${jugadores[i].puntuacion}`;

            contenedor2.appendChild(contenedor3);

            contenedor.appendChild(contenedor2);
            
            contenedor2 = document.createElement('div');
            contenedor2.classList = 'col-3 col-md-2';
            contenedor2.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-double-right w-100" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                    <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            `;

            contenedor.appendChild(contenedor2);

            idDatos.appendChild(contenedor)

        }

        puntuacionSimple = !puntuacionSimple;

    }

    // ---------------------------- Botones

    idDatos.onclick = () => {
        mostrarDatos()
    }

    idTirarDados.onclick = () => {
        tirar()
    }

    idPasar.onclick = () => {
        pasar()
    }

    mostrarDatos()

}

function almacenarJugadores() {
    sessionStorage.setItem('jugadores', JSON.stringify(jugadores))
}

// ---------------------------- Codigo inicial

// Al hacer click en Juego Nuevo
juegoNuevo.onclick = (e) => {

    e.preventDefault()

    // Borrar jugadores storage
    sessionStorage.removeItem('jugadores')

    // Recargar pagina
    location.reload()

}

// Si hay datos de jugadores en el storage
if (sessionStorage.getItem('jugadores') !== null) {
    
    // Obtener datos de jugadores
    let jugadoresEnSession = JSON.parse(sessionStorage.getItem('jugadores'))
    // Añadir jugadores obtenidos
    for (const iterator of jugadoresEnSession) {
        jugadores.push(new Jugador(iterator.nombre, iterator.humano))
    }

    // Cambiar DOM para mostrar juego
    mostrarJuego()

// Si no hay datos de jugadores
}else{

    // Ver ingreso de datos de formulario
    form[0].onsubmit = (e) => {

        e.preventDefault()

        // Ver valores
        nombreJugador = form[0].children[0].children[1].value;
        esHumano      = form[0].children[1].children[0].checked;

        // Crear nuevo jugador
        jugadores.push( new Jugador(nombreJugador, esHumano) )

        // Almacenar jugadores
        almacenarJugadores()

        // Mostrar jugadores
        mostrarJugadores()

        // Mostrar boton iniciar
        botonIniciar.classList.remove('d-none')

    }

    // Al hacer click en boton iniciar mostrar juego
    botonIniciar.onclick = () => {

        mostrarJuego()

    }

}
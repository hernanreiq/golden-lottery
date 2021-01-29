/*
    EN ESTE BLOQUE DE CÓDIGO SE CREAN LOS BOTONES QUE LE PERMITEN AL USUARIO HACER COMBINACIONES
*/
var contenedor_botones_combinacion = document.getElementById('contenedor-botones-combinacion');
const cantidad_botones = 99;

function creadorBotones(){
    for(var i = 0; i <= cantidad_botones; i++){
        if(i < 10){
            contenedor_botones_combinacion.innerHTML += '<button class="btn btn-secondary m-1" onclick="eleccionDiferente(0'+i+')" id="boton-0'+i+'">' + '0' + i + '</button>';
        } else {
            contenedor_botones_combinacion.innerHTML += '<button class="btn btn-secondary m-1" onclick="eleccionDiferente('+i+')" id="boton-'+i+'">' + i + '</button>';
        }
    }
}

creadorBotones();

/*
    TEMPORIZADOR QUE DETERMINA CADA CUANTO TIEMPO SE REALIZA UN SORTEO
*/
var proximo_sorteo = document.getElementById('proximo-sorteo');
var inicializadorSorteo = 15;

var inicializadorIntervalo = setInterval(() => {
    if (inicializadorSorteo == 0){
        proximo_sorteo.innerText = '0' + inicializadorSorteo + 's';
        //OFRECER LOS RESULTADOS ACTUALES AL USUARIO Y ASIGNAR GANANCIAS 
        elegirGanadores();
        inicializadorSorteo--;
    } else if(inicializadorSorteo > 0){
        if (inicializadorSorteo <= 9){
            proximo_sorteo.innerText = '0' + inicializadorSorteo + 's';
        } else {
            proximo_sorteo.innerText = inicializadorSorteo + 's';
        }
        inicializadorSorteo--; 
    }
}, 1000);

var reiniciadorContador = setInterval(() => {
    //REINICIAR TODO PARA UN NUEVO SORTEO
    inicializadorSorteo = 15;
}, 20000);

/*
    ESTE BLOQUE DE CODIGO LANZA LOS 3 NUMEROS ALEATORIOS Y LOS PINTA EN PANTALLA
*/
var primer_ganador = document.getElementById('primer-ganador');
var segundo_ganador = document.getElementById('segundo-ganador');
var tercer_ganador = document.getElementById('tercer-ganador');

var ganadores_actuales = {
    primera: 0,
    segunda: 0,
    tercera: 0
};

function elegirGanadores(){
    ganadores_actuales.primera = Math.floor(Math.random() * 99);
    ganadores_actuales.segunda = Math.floor(Math.random() * 99);
    ganadores_actuales.tercera = Math.floor(Math.random() * 99);
    //PRIMERA
    if(ganadores_actuales.primera <= 9){
        primer_ganador.innerText = '0' + ganadores_actuales.primera;
    } else {
        primer_ganador.innerText = ganadores_actuales.primera;
    }
    //SEGUNDA
    if(ganadores_actuales.segunda <= 9){
        segundo_ganador.innerText = '0' + ganadores_actuales.segunda;
    } else {
        segundo_ganador.innerText = ganadores_actuales.segunda;
    }
    //TERCERA
    if(ganadores_actuales.tercera <= 9){
        tercer_ganador.innerText = '0' + ganadores_actuales.tercera;
    } else {
        tercer_ganador.innerText = ganadores_actuales.tercera;
    }
}

/*
    ESTE BLOQUE DE CODIGO DETERMINA QUE BOTON SE PRESIONO PARA CREAR LA COMBINACION DEL USUARIO
*/
var combinacion_actual_usuario = [ null, null, null, false, false, false];

function determinarCombinacion(boton_presionado){
    if(boton_presionado <= 9 || boton_presionado == 0){
        var id_boton_actual = 'boton-0' + boton_presionado;
    } else {
        var id_boton_actual = 'boton-' + boton_presionado;
    }
    var boton_actual_presionado = document.getElementById(id_boton_actual);
    boton_actual_presionado.classList.remove('bg-secondary');
    boton_actual_presionado.classList.add('bg-success');
    if(combinacion_actual_usuario[3] == false){
        combinacion_actual_usuario[0] = boton_presionado;
        creacionCombinacion(boton_presionado, 1);
        combinacion_actual_usuario[3] = true;
    } else if (combinacion_actual_usuario[4] == false){
        combinacion_actual_usuario[1] = boton_presionado;
        creacionCombinacion(boton_presionado, 2);
        combinacion_actual_usuario[4] = true;
    } else if (combinacion_actual_usuario[5] == false){
        combinacion_actual_usuario[2] = boton_presionado;
        creacionCombinacion(boton_presionado, 3);
        combinacion_actual_usuario[5] = true;
    }
}

function eleccionDiferente(boton_presionado){
    console.log(boton_presionado);
    if(combinacion_actual_usuario[0] == boton_presionado){
        alertador(0, 0);
    } else if (combinacion_actual_usuario[1] == boton_presionado){
        alertador(0, 1);
    } else if (combinacion_actual_usuario[2] == boton_presionado){
        alertador(0, 2);
    } else if(combinacion_actual_usuario[3] == false || 
        combinacion_actual_usuario[4] == false || 
        combinacion_actual_usuario[5] == false) {
        determinarCombinacion(boton_presionado);
    } else {
        alertador(1, 3);
    }
    console.log(combinacion_actual_usuario);
}

/*
    CONFIGURACION DE LAS ALERTAS
*/
var contenedor_alertas = document.getElementById('alertas');
var tipo_alerta = ['¡NÚMERO ELEGIDO!', '¡POSICIONES LLENAS!', '¡CAMPO VACÍO!'];
var mensaje = ['Este número fue tu primera elección.', 'Este número fue tu segunda elección.', 'Este número fue tu tercera elección.', 'Todos los campos fueron completados.', 'Debes llenar todos los campos'];

function alertador(numero_alerta, numero_mensaje){
    if(numero_alerta == 0) {
        var color_alerta = 'alert-warning';
    } else if (numero_alerta == 1 || numero_alerta == 2) {
        var color_alerta = 'alert-danger';
    }
    contenedor_alertas.innerHTML += `
    <div class="alert ${color_alerta} alert-dismissible fade show mt-2" role="alert">
        <strong>${tipo_alerta[numero_alerta]}</strong> ${mensaje[numero_mensaje]}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `;
}

/*
    CREACION DE LA COMBINACION QUE EL USUARIO VA A JUGAR EN BASE A LO QUE SELECCIONO PREVIAMENTE
*/
function creacionCombinacion(numero_elegido, posicion_elegida){
    var id_combinacion = 'combinacion-' + posicion_elegida;
    var posicion_actual = document.getElementById(id_combinacion);
    if(numero_elegido <= 9){
        posicion_actual.innerText = '0' + numero_elegido;
    } else {
        posicion_actual.innerText = numero_elegido;
    }
}
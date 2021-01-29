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
        console.log(combinacion_actual_usuario);
        alertador(1, 3);
    }
}

/*
    CONFIGURACION DE LAS ALERTAS
*/
var contenedor_alertas = document.getElementById('alertas');
var tipo_alerta = ['¡NÚMERO ELEGIDO!', '¡POSICIONES LLENAS!', '¡CAMPO VACÍO!', '¡FELICIDADES!', '¡NO PUEDE SER!', '¡JUGADA REALIZADA CON ÉXITO!', '¡RECARGA ACEPTADA!', '¡RECARGA RECHAZADA!'];
var mensaje = ['Este número fue tu primera elección.', 'Este número fue tu segunda elección.', 'Este número fue tu tercera elección.', 'Todos los campos fueron completados.', 'Debes llenar todos los campos.', 'Has acertado un número en primera, ganaste <b>RD$60</b>.', 'Has acertado un número en segunda, ganaste <b>RD$20</b>.', 'Has acertado un número en tercera, ganaste <b>RD$1</b>.', 'Has acertado dos números, ganaste <b>RD$1,000</b>.', 'Has acertado tres números, ganaste <b>RD$20,000</b>.', 'Te has quedado sin dinero.', 'Te deseo la mejor de las suertes.', 'Has recargado <b>RD$210</b> con éxito.', 'Ya cuentas con dinero para jugar.'];

function alertador(numero_alerta, numero_mensaje){
    if(numero_alerta == 0) {
        var color_alerta = 'alert-warning';
    } else if (numero_alerta == 1 || numero_alerta == 2 || numero_alerta == 4 || numero_alerta == 7) {
        var color_alerta = 'alert-danger';
    } else if (numero_alerta == 3 || numero_alerta == 5 || numero_alerta == 6) {
        var color_alerta = 'alert-success';
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

/*
    ESTE BLOQUE DE CODIGO SE ENCARGA DE CREAR UN TARJETA EN EL HISTORIAL CON LA JUGADA REALIZADA POR EL JUGADOR
*/
var boton_hacer_jugada = document.getElementById('hacer-jugada');
var boton_cancelar_jugada = document.getElementById('cancelar-jugada');
var jugadas_realizadas_tarjetas = [];
var historial_contenedor = document.getElementById('historial-contenedor');

boton_hacer_jugada.addEventListener('click', crearTarjetaHistorial);

function crearTarjetaHistorial(){
    if (combinacion_actual_usuario[0] == null ||
        combinacion_actual_usuario[1] == null ||
        combinacion_actual_usuario[2] == null) {
            alertador(2, 4);
        } else if (saldo > 0){
            if(combinacion_actual_usuario[0] <= 9){
                var primera = '0' + combinacion_actual_usuario[0];
            } else {
                var primera = combinacion_actual_usuario[0];
            }
            if(combinacion_actual_usuario[1] <= 9){
                var segunda = '0' + combinacion_actual_usuario[1];
            } else {
                var segunda = combinacion_actual_usuario[1];
            }
            if(combinacion_actual_usuario[2] <= 9){
                var tercera = '0' + combinacion_actual_usuario[2];
            } else {
                var tercera = combinacion_actual_usuario[2];
            }
            historial_contenedor.innerHTML += `
            <div class="card my-2 bg-dark">
                <div class="card-body mx-auto my-0">
                    <span class="bg-secondary text-white rounded-circle px-3 p-2 h5 mx-1">${primera}</span>
                    <span class="bg-secondary text-white rounded-circle px-3 p-2 h5 mx-1">${segunda}</span>
                    <span class="bg-secondary text-white rounded-circle px-3 p-2 h5 mx-1">${tercera}</span>
                </div>
            </div>
            `;
            limpiadorCombinaciones();
            alertador(5, 11);
            actualizarSaldo();
        } else if (saldo == 0){
            alertador(4, 10);
        }
}

boton_cancelar_jugada.addEventListener('click', limpiadorCombinaciones);

function limpiadorCombinaciones(){
    /* OBTENIENDO EL ID DE LOS CIRCULOS QUE TIENEN LAS COMBINACIONES SELECCIONADAS POR EL USUARIO EN LA TABLA DE BOTONES*/
    if(combinacion_actual_usuario[0] <= 9){
        var id_combinacion_1 = document.getElementById('boton-0'+ combinacion_actual_usuario[0]);
    } else {
        var id_combinacion_1 = document.getElementById('boton-'+ combinacion_actual_usuario[0]);
    }
    if(combinacion_actual_usuario[1] <= 9){
        var id_combinacion_2 = document.getElementById('boton-0'+ combinacion_actual_usuario[1]);
    } else {
        var id_combinacion_2 = document.getElementById('boton-'+ combinacion_actual_usuario[1]);
    }
    if(combinacion_actual_usuario[2] <= 9){
        var id_combinacion_3 = document.getElementById('boton-0'+ combinacion_actual_usuario[2]);
    } else {
        var id_combinacion_3 = document.getElementById('boton-'+ combinacion_actual_usuario[2]);
    }
    
    /* LIMPIANDO LA COMBINACION SELECCIONADA */
    document.getElementById('combinacion-1').innerHTML = '&nbsp;&nbsp;';
    document.getElementById('combinacion-2').innerHTML = '&nbsp;&nbsp;';
    document.getElementById('combinacion-3').innerHTML = '&nbsp;&nbsp;';
    
    /* REGRESANDO A LOS ESTILOS NORMALES QUE TENIA EL USUARIO EN LA TABLA DE BOTONES */
    if(combinacion_actual_usuario[0] != null){
        id_combinacion_1.classList.remove('bg-success');
        id_combinacion_1.classList.add('bg-secondary');
    }
    if(combinacion_actual_usuario[1] != null){
        id_combinacion_2.classList.remove('bg-success');
        id_combinacion_2.classList.add('bg-secondary');
    }
    if(combinacion_actual_usuario[2] != null){
        id_combinacion_3.classList.remove('bg-success');
        id_combinacion_3.classList.add('bg-secondary');
    }

    /* LIMPIANDO EL ARREGLO CON LAS COMBINACIONES DEL USUARIO */
    combinacion_actual_usuario[0] = null;
    combinacion_actual_usuario[1] = null;
    combinacion_actual_usuario[2] = null;
    combinacion_actual_usuario[3] = false;
    combinacion_actual_usuario[4] = false;
    combinacion_actual_usuario[5] = false;
}

/*
    ESTE BLOQUE DE CODIGO DETERMINA EL SALDO DEPENDIENDO DE LAS JUGADAS REALIZADAS POR EL USUARIO
*/
var saldo = 210;
var saldo_valor = document.getElementById('saldo-valor');
saldo_valor.innerHTML = saldo;

function actualizarSaldo(){
    if (saldo > 0) {
        saldo = saldo - 7;
        saldo_valor.innerText = saldo;
    } else {
        alertador(4, 10);
    }
}

var boton_recargar_saldo = document.getElementById('recargar-saldo');

boton_recargar_saldo.addEventListener('click', recargarSaldo);

function recargarSaldo(){
    if(saldo == 0){
        saldo = 210;
        saldo_valor.innerText = saldo;
        alertador(6, 12);
    } else {
        alertador(7, 13);
    }
}
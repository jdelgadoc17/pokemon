"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var Move_1 = require("./Move");
var Pokemon_1 = require("./Pokemon");
var lista_movimientos = [
    new Move_1.Move("Impactrueno", 40),
    new Move_1.Move("Placaje", 50),
    new Move_1.Move("Rayo", 90),
    new Move_1.Move("Llamarada", 110),
    new Move_1.Move("Hidrobomba", 110),
    new Move_1.Move("Terremoto", 100),
    new Move_1.Move("Gigadrenado", 75),
    new Move_1.Move("Psíquico", 90),
    new Move_1.Move("Cuchillada", 70),
    new Move_1.Move("Puño Fuego", 75),
];
var pokemon1 = new Pokemon_1.Pokemon("Charizard", "Fuego", 400, 400, 84, 78);
var movimiento_aleatorio_pk1 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
var movimiento_aleatorio_pk2 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
pokemon1.addMovimiento(movimiento_aleatorio_pk1);
pokemon1.addMovimiento(movimiento_aleatorio_pk2);
var pokemon_bot = new Pokemon_1.Pokemon("Pikachu", "Electrico", 350, 350, 100, 56);
var movimiento_aleatorio_bot = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
var movimiento_aleatorio_bot2 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
pokemon_bot.addMovimiento(movimiento_aleatorio_bot);
pokemon_bot.addMovimiento(movimiento_aleatorio_bot2);
function elegirOpc() {
    var incorrecto = true;
    var num = 0;
    while (incorrecto) {
        num = parseInt(readlineSync.question('Elige una opcion: 1. Ataque; 2. Curarse: '));
        if (num === 1 || num === 2) {
            incorrecto = false;
        }
        else {
            console.log("Opción inválida. Por favor, elige 1 para Ataque o 2 para Curarse.");
        }
    }
    return num;
}
function flujoJuego() {
    var opc = elegirOpc();
    if (opc == 1) {
        pokemon1.attack(pokemon_bot);
    }
    else if (opc == 2) {
        pokemon1.heal();
    }
    else {
        console.log("Debes elegir una opcion valida");
    }
}
function fluejoJuegoBot() {
    var opc = Math.floor(Math.random() * 2);
    if (opc == 1) {
        pokemon_bot.attack(pokemon1);
    }
    else if (opc == 2) {
        pokemon_bot.heal();
    }
}
function statsFinales(pokemon) {
    console.log("".concat(pokemon.getNombre(), " | ").concat(pokemon.getHpActual()));
}
function comprobarFin(pokemon1, pokemon_bot) {
    if (pokemon1.getHpActual() <= 0) {
        console.log("".concat(pokemon1.getNombre(), " HA GANADO EL COMBATE"));
        statsFinales(pokemon1);
    }
    else if (pokemon_bot.getHpActual() <= 0) {
        console.log("".concat(pokemon_bot.getNombre(), " HA GANADO EL COMBATE"));
        statsFinales(pokemon_bot);
    }
}
while (pokemon1.getHpActual() > 0 && pokemon_bot.getHpActual() > 0) {
    console.log("COMIENZA EL COMBATE");
    console.log("---------------------------");
    pokemon1.toString();
    pokemon_bot.toString();
    flujoJuego();
    fluejoJuegoBot();
    comprobarFin(pokemon1, pokemon_bot);
}

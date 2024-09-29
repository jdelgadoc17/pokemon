"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var Move_1 = require("./Move");
var Pokemon_1 = require("./Pokemon");
var lista_movimientos = [
    new Move_1.Move("Impactrueno", 20),
    new Move_1.Move("Placaje", 40),
    new Move_1.Move("Rayo", 70),
    new Move_1.Move("Llamarada", 125),
    new Move_1.Move("Hidrobomba", 110),
    new Move_1.Move("Terremoto", 100),
    new Move_1.Move("Gigadrenado", 75),
    new Move_1.Move("Psíquico", 50),
    new Move_1.Move("Cuchillada", 70),
    new Move_1.Move("Puño Fuego", 82),
];
var listaPokemon = [
    new Pokemon_1.Pokemon("Pikachu", "Electrico", 350, 350, 100, 56),
    new Pokemon_1.Pokemon("Charizard", "Fuego", 400, 400, 84, 78),
    new Pokemon_1.Pokemon("Bulbasaur", "Planta", 300, 300, 49, 49),
    new Pokemon_1.Pokemon("Squirtle", "Agua", 320, 320, 48, 65),
    new Pokemon_1.Pokemon("Jigglypuff", "Normal", 270, 270, 45, 20),
    new Pokemon_1.Pokemon("Gengar", "Fantasma", 290, 290, 65, 60),
    new Pokemon_1.Pokemon("Mewtwo", "Psíquico", 450, 450, 110, 90),
    new Pokemon_1.Pokemon("Gardevoir", "Psíquico", 340, 340, 65, 65),
    new Pokemon_1.Pokemon("Machamp", "Lucha", 360, 360, 130, 80),
    new Pokemon_1.Pokemon("Snorlax", "Normal", 500, 500, 110, 110)
];
function pintarInicio() {
    var asciiArt = "\n__________       __                                           ________                          _________.__              .__          __                \n\\______   \\____ |  | __ ____   _____   ____   ____   ______  /  _____/_____    _____   ____    /   _____/|__| _____  __ __|  | _____ _/  |_  ___________ \n |     ___/  _ \\|  |/ // __ \\ /     \\ /  _ \\ /    \\ /  ___/ /   \\  ___\\__  \\  /     \\_/ __ \\   \\_____  \\ |  |/     \\|  |  \\  | \\__  \\\\   __\\/  _ \\_  __ \\\n |    |  (  <_> )    <\\  ___/|  Y Y  (  <_> )   |  \\\\___ \\  \\    \\_\\  \\/ __ \\|  Y Y  \\  ___/   /        \\|  |  Y Y  \\  |  /  |__/ __ \\|  | (  <_> )  | \\/\n |____|   \\____/|__|_ \\\\___  >__|_|  /\\____/|___|  /____  >  \\______  (____  /__|_|  /\\___  > /_______  /|__|__|_|  /____/|____(____  /__|  \\____/|__|   \n                     \\/    \\/      \\/            \\/     \\/          \\/     \\/      \\/     \\/          \\/          \\/                \\/                 \n";
    console.log(asciiArt);
}
function creacionPokemon() {
    var pokemon = listaPokemon[Math.floor(Math.random() * listaPokemon.length)];
    var movimiento_aleatorio_pk1 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
    var movimiento_aleatorio_pk2 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
    pokemon.addMovimiento(movimiento_aleatorio_pk1);
    pokemon.addMovimiento(movimiento_aleatorio_pk2);
    return pokemon;
}
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
function flujoJuego(pokemon1, pokemonbot) {
    console.log("\n");
    var opc = elegirOpc();
    if (opc == 1) {
        pokemon1.attack(pokemonbot);
    }
    else if (opc == 2) {
        pokemon1.heal();
    }
    else {
        console.log("Debes elegir una opcion valida");
    }
}
function flujoJuegoBot(pokemonbot, pokemon1) {
    console.log("\n");
    var opc = Math.floor(Math.random() * 2);
    if (opc == 1 && pokemonbot.getUsosHeal() > 0) { //Controlamos que si el bot ya ha usado el curarse no lo intente de nuevo
        //Esto si se le permite al jugador y le hace perder el turno
        pokemonbot.heal_bot();
        console.log("".concat(pokemonbot.getNombre(), " se ha curado."));
    }
    else {
        pokemonbot.attack_bot(pokemon1);
    }
}
function statsFinales(pokemon) {
    console.log("Nombre: ".concat(pokemon.getNombre(), " | Salud final: ").concat(pokemon.getHpActual()));
}
function comprobarFin(pokemon1, pokemon_bot) {
    if (pokemon1.getHpActual() <= 0) {
        console.log("\n".concat(pokemon_bot.getNombre(), " HA GANADO EL COMBATE"));
        statsFinales(pokemon_bot);
        statsFinales(pokemon1);
        return true;
    }
    else if (pokemon_bot.getHpActual() <= 0) {
        console.log("\n".concat(pokemon1.getNombre(), " HA GANADO EL COMBATE"));
        statsFinales(pokemon1);
        statsFinales(pokemon_bot);
        return true;
    }
    return false;
}
function main_game() {
    pintarInicio();
    console.log("COMIENZA EL COMBATE");
    var turnos = 1;
    var pokemon1 = creacionPokemon();
    var pokemonBot = creacionPokemon();
    var juegoencurso = true;
    while (juegoencurso) {
        console.log("\nTURNO ".concat(turnos));
        console.log("------------------------------------------------------");
        if (turnos == 1) {
            pokemon1.toString();
            pokemonBot.toString();
        }
        else {
            pokemon1.toStringResumen();
            pokemonBot.toStringResumen();
        }
        flujoJuego(pokemon1, pokemonBot);
        flujoJuegoBot(pokemonBot, pokemon1);
        turnos++;
        juegoencurso = !comprobarFin(pokemon1, pokemonBot); //Comprobamos si la vida de algun jugador es cero para salir del WHILE
    }
}
//JUGAMOS
main_game();

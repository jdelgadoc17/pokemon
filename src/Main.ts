import * as readlineSync from 'readline-sync';

import { Move } from "./Move";
import { Pokemon } from "./Pokemon";



const lista_movimientos: Move[] = [
    new Move("Impactrueno", 20),
    new Move("Placaje", 40),
    new Move("Rayo", 70),
    new Move("Llamarada", 125),
    new Move("Hidrobomba", 110),
    new Move("Terremoto", 100),
    new Move("Gigadrenado", 75),
    new Move("Psíquico", 50),
    new Move("Cuchillada", 70),
    new Move("Puño Fuego", 82),
];

const listaPokemon: Pokemon[] = [
    new Pokemon("Pikachu", "Electrico", 350, 350, 100, 56),
    new Pokemon("Charizard", "Fuego", 400, 400, 84, 78),
    new Pokemon("Bulbasaur", "Planta", 300, 300, 49, 49),
    new Pokemon("Squirtle", "Agua", 320, 320, 48, 65),
    new Pokemon("Jigglypuff", "Normal", 270, 270, 45, 20),
    new Pokemon("Gengar", "Fantasma", 290, 290, 65, 60),
    new Pokemon("Mewtwo", "Psíquico", 450, 450, 110, 90),
    new Pokemon("Gardevoir", "Psíquico", 340, 340, 65, 65),
    new Pokemon("Machamp", "Lucha", 360, 360, 130, 80),
    new Pokemon("Snorlax", "Normal", 500, 500, 110, 110)
];

function creacionPokemon():Pokemon{
    const pokemon1 = listaPokemon[Math.floor(Math.random()*listaPokemon.length)];
    const movimiento_aleatorio_pk1 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
    const movimiento_aleatorio_pk2 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
    pokemon1.addMovimiento(movimiento_aleatorio_pk1);
    pokemon1.addMovimiento(movimiento_aleatorio_pk2);

    return pokemon1;


}


/*
const pokemon_bot = listaPokemon[Math.floor(Math.random()*listaPokemon.length)];
const movimiento_aleatorio_bot = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
const movimiento_aleatorio_bot2 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
pokemon_bot.addMovimiento(movimiento_aleatorio_bot);
pokemon_bot.addMovimiento(movimiento_aleatorio_bot2);*/

function elegirOpc(): number {
    let incorrecto: boolean = true;
    let num: number=0; 

    while (incorrecto) {
        num = parseInt(readlineSync.question('Elige una opcion: 1. Ataque; 2. Curarse: '));

        if (num === 1 || num === 2) {
            incorrecto = false; 
        } else {
            console.log("Opción inválida. Por favor, elige 1 para Ataque o 2 para Curarse.");
        }
    }
    
    return num; 
}

function flujoJuego(pokemon1:Pokemon, pokemonbot:Pokemon){
    const opc = elegirOpc();

    if(opc==1){
        pokemon1.attack(pokemonbot);

    }else if(opc==2){
        pokemon1.heal();

    }else{
        console.log("Debes elegir una opcion valida")
    }

}



function flujoJuegoBot(pokemonbot: Pokemon, pokemon1: Pokemon): void {
    const opc = Math.floor(Math.random() * 2); 

    if (opc == 1 && pokemonbot.getUsosHeal() > 0) { //Controlamos que si el bot ya ha usado el curarse no lo intente de nuevo
                                                    //Esto si se le permite al jugador y le hace perder el turno
        pokemonbot.heal_bot();
        console.log(`${pokemonbot.getNombre()} se ha curado.`);
    } else {
        pokemonbot.attack_bot(pokemon1);
    }
}

function statsFinales(pokemon:Pokemon):void{
    console.log(`${pokemon.getNombre()} | ${pokemon.getHpActual()}`)

}

function comprobarFin(pokemon1:Pokemon, pokemon_bot:Pokemon){

    if(pokemon1.getHpActual()<=0){
        console.log(`\n${pokemon1.getNombre()} HA GANADO EL COMBATE`);
        statsFinales(pokemon1);
        statsFinales(pokemon_bot);


    }else if(pokemon_bot.getHpActual()<=0){
        console.log(`\n${pokemon_bot.getNombre()} HA GANADO EL COMBATE`);
        statsFinales(pokemon_bot);
        statsFinales(pokemon1);




    }

}


function main_game(){
    console.log("COMIENZA EL COMBATE")
    let turnos = 1;

    const pokemon1=creacionPokemon();
    const pokemonBot=creacionPokemon();

    while(pokemon1.getHpActual()>0 && pokemonBot.getHpActual()>0){
        console.log(`\nTURNO ${turnos}`)
        console.log("---------------------------")
    
        pokemon1.toString();
        pokemonBot.toString();
    
        flujoJuego(pokemon1, pokemonBot);
        flujoJuegoBot(pokemonBot, pokemon1);
        turnos++;
    
        comprobarFin(pokemon1, pokemonBot);
    
        
    
    }

}


//JUGAMOS

main_game();




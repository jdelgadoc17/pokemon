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


const pokemon1 = new Pokemon("Charizard", "Fuego", 400, 400, 84,78);
const movimiento_aleatorio_pk1 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
const movimiento_aleatorio_pk2 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
pokemon1.addMovimiento(movimiento_aleatorio_pk1);
pokemon1.addMovimiento(movimiento_aleatorio_pk2);

const pokemon_bot = new Pokemon("Pikachu", "Electrico", 350, 350, 100,56);
const movimiento_aleatorio_bot = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
const movimiento_aleatorio_bot2 = lista_movimientos[Math.floor(Math.random() * lista_movimientos.length)];
pokemon_bot.addMovimiento(movimiento_aleatorio_bot);
pokemon_bot.addMovimiento(movimiento_aleatorio_bot2);

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

function flujoJuego(){
    const opc = elegirOpc();

    if(opc==1){
        pokemon1.attack(pokemon_bot);

    }else if(opc==2){
        pokemon1.heal();

    }else{
        console.log("Debes elegir una opcion valida")
    }

}

function fluejoJuegoBot():void{
    const opc = Math.floor(Math.random() * 2); 
    
    if(opc==1){
        pokemon_bot.attack_bot(pokemon1);

    }else if(opc==2){
        pokemon_bot.heal();

    }

}

function statsFinales(pokemon:Pokemon):void{
    console.log(`${pokemon.getNombre()} | ${pokemon.getHpActual()}`)

}

function comprobarFin(pokemon1:Pokemon, pokemon_bot:Pokemon){

    if(pokemon1.getHpActual()<=0){
        console.log(`${pokemon1.getNombre()} HA GANADO EL COMBATE`);
        statsFinales(pokemon1);

    }else if(pokemon_bot.getHpActual()<=0){
        console.log(`${pokemon_bot.getNombre()} HA GANADO EL COMBATE`);
        statsFinales(pokemon_bot);



    }

}


function main_game(){
    console.log("COMIENZA EL COMBATE")
    let turnos = 1;

    while(pokemon1.getHpActual()>0 && pokemon_bot.getHpActual()>0){
        console.log(`\nTURNO ${turnos}`)
        console.log("---------------------------")
    
        pokemon1.toString();
        pokemon_bot.toString();
    
        flujoJuego();
        fluejoJuegoBot();
        turnos++;
    
        comprobarFin(pokemon1, pokemon_bot);
    
        
    
    }

}


//JUGAMOS

main_game();




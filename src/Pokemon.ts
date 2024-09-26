import * as readlineSync from 'readline-sync';
import { Move } from "./Move";

export class Pokemon{

    private nombre:string;
    private tipo: string;
    private hp_actual:number;
    private hp_max:number;
    private ataque:number;
    private defensa:number;
    private lista_movimientos:Move[]=[];
    private usos_heal:number=0;


    constructor(nombre:string, tipo:string, hp_actual:number, hp_max:number, ataque:number, defensa:number){
        this.nombre=nombre;
        this.tipo=tipo;
        this.hp_actual=hp_actual;
        this.hp_max=hp_max;
        this.ataque=ataque;
        this.defensa=defensa;
        this.usos_heal=this.usos_heal;
    }

    public addMovimiento(movimiento:Move):void{
        this.lista_movimientos.push(movimiento);
    }

    public mostrarAtaques(): void {
        console.log("Ataques disponibles:");
        for (let i=0; i< this.lista_movimientos.length; i++) {
            console.log(`${i + 1}: ${this.lista_movimientos[i].toString()}`); 
        }
    }

    public elegirAtaque() :Move{
        let incorrecto: boolean = true;
        let movimientoSeleccionado: Move = new Move("", 0); 
    
        while (incorrecto) {
            this.mostrarAtaques();
            
    
            const seleccion = parseInt(readlineSync.question('Elige el numero del ataque: '));
    
            if (seleccion >= 1 && seleccion <= this.lista_movimientos.length) {
                movimientoSeleccionado = this.lista_movimientos[seleccion - 1];
                incorrecto = false;
            } else {
                console.log("Opción inválida, elige un número válido.");
            }
        }
        
        return movimientoSeleccionado; 
    }

    public fallarAtaque(): number {
        const probabilidad_fallo = Math.random() * 100;
    
        return probabilidad_fallo; //Retorna true si el ataque falla
    }
    

    public attack(pokemon:Pokemon):void{
        const posibilidadFallo =this.fallarAtaque(); 
        const movimiento_elegido=this.elegirAtaque();


        if(posibilidadFallo>=20){
            console.log(`${this.nombre} usa ${movimiento_elegido.getNombreMovimiento()} | ${movimiento_elegido.getDamage()}`)
            const randomFactor: number = Math.random() * (1.0 - 0.85) + 0.85;
    
            const damage = (this.ataque/this.defensa)*movimiento_elegido.getDamage()*randomFactor;
            const hp_update=Math.round(pokemon.getHpActual() - damage);
            if (pokemon.getHpActual() <= 0) {
                pokemon.setHpActual(0);
            }
            pokemon.setHpActual(hp_update);

            
        }else{
            console.log(`El ataque de ${this.nombre} ha fallado!`);
        }

       

    }

    public attack_bot(pokemon:Pokemon):void{
        const posibilidadFallo =this.fallarAtaque(); 
        const movimiento_aleatorio=this.lista_movimientos[Math.floor(Math.random()*this.lista_movimientos.length)];
        if(posibilidadFallo>=20){
            console.log(`${this.nombre} usa ${movimiento_aleatorio.getNombreMovimiento()} | ${movimiento_aleatorio.getDamage()}`)
            const randomFactor: number = Math.random() * (1.0 - 0.85) + 0.85;


            const damage = (this.ataque/this.defensa)*movimiento_aleatorio.getDamage()*randomFactor;
            const hp_update=Math.round(pokemon.getHpActual() - damage);
            if (pokemon.getHpActual() <= 0) {
                pokemon.setHpActual(0);
            }
            pokemon.setHpActual(hp_update);

        }else{
            console.log(`El ataque de ${this.nombre} ha fallado!`);


        }

        

    }




    public heal():void{
        
        if(this.usos_heal<1){
            this.hp_actual=this.hp_actual+(this.hp_max/2);
            console.log(`Saluda aumentada en un 50%! (${this.hp_actual/2}) `);

            if(this.hp_actual>this.hp_max){
                this.hp_actual=this.hp_max;

            }
            this.usos_heal++;
            

        }else{
            console.log("Ya has usado heal una vez. No se puede usar más! ")
        }

    }

    public heal_bot(){
        if(this.usos_heal<1){
            this.hp_actual=this.hp_actual+(this.hp_max/2);
            console.log(`Saluda aumentada en un 50%! (${this.hp_actual/2}) `);

            if(this.hp_actual>this.hp_max){
                this.hp_actual=this.hp_max;

            }
            this.usos_heal++;
            

        }else{
            console.log("Ya has usado heal una vez. No se puede usar más! ")
        }
    }

    public getListaMovimientos(){
        return this.lista_movimientos;

    }


    public setNombre(nombre:string){
        this.nombre=nombre;
    }

    public setTipo(tipo:string){
        this.tipo=tipo;
    }

    public setHpActual(hp_actual:number){
        this.hp_actual=hp_actual;
    }

    public setHpMax(hp_max:number){
        this.hp_max=hp_max;
    }

    public setAtaque(ataque:number){
        this.ataque=ataque;
    }

    public setDefensa(defensa:number){
        this.defensa=defensa;
    }

    public getNombre(){
        return this.nombre;
    }

    public getTipo(){
        return this.tipo;
    }

    public getHpActual(){
        return this.hp_actual;
    }

    public getHpMax(){
        return this.hp_max;
    }

    public getAtaque(){
        return this.ataque;
    }

    public getDefensa(){
        return this.defensa;
    }

    public getUsosHeal(){
        return this.usos_heal;
    }

    public setUsosHeal(usos_heal:number){
        this.usos_heal=usos_heal;
    }


    public toString():void{
        console.log(`Nombre: ${this.nombre} | Tipo: ${this.tipo} | HP Actual: ${this.hp_actual} | HP Max: ${this.hp_max} | Ataque: ${this.ataque} | Defensa: ${this.defensa} | `)

    }
    
    public toStringResumen():void{
        console.log(`Nombre: ${this.nombre} | HP Actual: ${this.hp_actual}`)

    }


   


}
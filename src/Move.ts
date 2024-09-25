//Clase Move: Representa los movimientos de ataque con atributos como nombre y daño base.

import { strict } from "assert";

export class Move{

        private nombre_movimiento:string;
        private damage:number;

        constructor(nombre_movimiento:string, damage:number){
            this.nombre_movimiento=nombre_movimiento;
            this.damage=damage;

        }

        public setNombreMovimiento(nombre_movimiento:string){
            this.nombre_movimiento=this.nombre_movimiento;
        }

        public setDamage(damage:number){
            this.damage=this.damage;
        }

        public getNombreMovimiento(){
            return this.nombre_movimiento;
        }

        public getDamage(){
            return this.damage;
        }

        public toString(): string {
            return `Nombre del movimiento: ${this.nombre_movimiento} | Daño base: ${this.damage}`;
        }



}
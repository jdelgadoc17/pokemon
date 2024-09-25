"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
var readlineSync = require("readline-sync");
var Move_1 = require("./Move");
var Pokemon = /** @class */ (function () {
    function Pokemon(nombre, tipo, hp_actual, hp_max, ataque, defensa) {
        this.lista_movimientos = [];
        this.usos_heal = 0;
        this.nombre = nombre;
        this.tipo = tipo;
        this.hp_actual = hp_actual;
        this.hp_max = hp_max;
        this.ataque = ataque;
        this.defensa = defensa;
        this.usos_heal = this.usos_heal;
    }
    Pokemon.prototype.addMovimiento = function (movimiento) {
        this.lista_movimientos.push(movimiento);
    };
    Pokemon.prototype.mostrarAtaques = function () {
        console.log("Ataques disponibles:");
        for (var i = 0; i < this.lista_movimientos.length; i++) {
            console.log("".concat(i + 1, ": ").concat(this.lista_movimientos[i].toString()));
        }
    };
    Pokemon.prototype.elegirAtaque = function () {
        var incorrecto = true;
        var movimientoSeleccionado = new Move_1.Move("", 0);
        while (incorrecto) {
            this.mostrarAtaques();
            var seleccion = parseInt(readlineSync.question('Elige el numero del ataque: '));
            if (seleccion >= 1 && seleccion <= this.lista_movimientos.length) {
                movimientoSeleccionado = this.lista_movimientos[seleccion - 1];
                incorrecto = false;
            }
            else {
                console.log("Opción inválida, elige un número válido.");
            }
        }
        return movimientoSeleccionado;
    };
    Pokemon.prototype.fallarAtaque = function () {
        var probabilidad_fallo = Math.random() * 100;
        return probabilidad_fallo; //Retorna true si el ataque falla
    };
    Pokemon.prototype.attack = function (pokemon) {
        var posibilidadFallo = this.fallarAtaque();
        var movimiento_elegido = this.elegirAtaque();
        if (posibilidadFallo >= 20) {
            console.log("".concat(this.nombre, " usa ").concat(movimiento_elegido.getNombreMovimiento(), " | ").concat(movimiento_elegido.getDamage()));
            var randomFactor = Math.random() * (1.0 - 0.85) + 0.85;
            var damage = (this.ataque / this.defensa) * movimiento_elegido.getDamage() * randomFactor;
            var hp_update = Math.round(pokemon.getHpActual() - damage);
            if (pokemon.getHpActual() <= 0) {
                pokemon.setHpActual(0);
            }
            pokemon.setHpActual(hp_update);
        }
        else {
            console.log("El ataque ha fallado!");
        }
    };
    Pokemon.prototype.attack_bot = function (pokemon) {
        var posibilidadFallo = this.fallarAtaque();
        var movimiento_aleatorio = this.lista_movimientos[Math.floor(Math.random() * this.lista_movimientos.length)];
        if (posibilidadFallo >= 20) {
            console.log("".concat(this.nombre, " usa ").concat(movimiento_aleatorio.getNombreMovimiento(), " | ").concat(movimiento_aleatorio.getDamage()));
            var randomFactor = Math.random() * (1.0 - 0.85) + 0.85;
            var damage = (this.ataque / this.defensa) * movimiento_aleatorio.getDamage() * randomFactor;
            var hp_update = Math.round(pokemon.getHpActual() - damage);
            if (pokemon.getHpActual() <= 0) {
                pokemon.setHpActual(0);
            }
            pokemon.setHpActual(hp_update);
        }
        else {
            console.log("El ataque ha fallado!");
        }
    };
    Pokemon.prototype.heal = function () {
        if (this.usos_heal < 1) {
            this.hp_actual = this.hp_actual + (this.hp_max / 2);
            console.log("Saluda aumentada en un 50%! (".concat(this.hp_actual / 2, ") "));
            if (this.hp_actual > this.hp_max) {
                this.hp_actual = this.hp_max;
            }
            this.usos_heal++;
        }
        else {
            console.log("Ya has usado heal una vez. No se puede usar más! ");
        }
    };
    Pokemon.prototype.heal_bot = function () {
        if (this.usos_heal < 1) {
            this.hp_actual = this.hp_actual + (this.hp_max / 2);
            console.log("Saluda aumentada en un 50%! (".concat(this.hp_actual / 2, ") "));
            if (this.hp_actual > this.hp_max) {
                this.hp_actual = this.hp_max;
            }
            this.usos_heal++;
        }
        else {
            console.log("Ya has usado heal una vez. No se puede usar más! ");
        }
    };
    Pokemon.prototype.getListaMovimientos = function () {
        return this.lista_movimientos;
    };
    Pokemon.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Pokemon.prototype.setTipo = function (tipo) {
        this.tipo = tipo;
    };
    Pokemon.prototype.setHpActual = function (hp_actual) {
        this.hp_actual = hp_actual;
    };
    Pokemon.prototype.setHpMax = function (hp_max) {
        this.hp_max = hp_max;
    };
    Pokemon.prototype.setAtaque = function (ataque) {
        this.ataque = ataque;
    };
    Pokemon.prototype.setDefensa = function (defensa) {
        this.defensa = defensa;
    };
    Pokemon.prototype.getNombre = function () {
        return this.nombre;
    };
    Pokemon.prototype.getTipo = function () {
        return this.tipo;
    };
    Pokemon.prototype.getHpActual = function () {
        return this.hp_actual;
    };
    Pokemon.prototype.getHpMax = function () {
        return this.hp_max;
    };
    Pokemon.prototype.getAtaque = function () {
        return this.ataque;
    };
    Pokemon.prototype.getDefensa = function () {
        return this.defensa;
    };
    Pokemon.prototype.getUsosHeal = function () {
        return this.usos_heal;
    };
    Pokemon.prototype.setUsosHeal = function (usos_heal) {
        this.usos_heal = usos_heal;
    };
    Pokemon.prototype.toString = function () {
        console.log("Nombre: ".concat(this.nombre, " | Tipo: ").concat(this.tipo, " | HP Actual: ").concat(this.hp_actual, " | HP Max: ").concat(this.hp_max, " | Ataque: ").concat(this.ataque, " | Defensa: ").concat(this.defensa, " | "));
    };
    return Pokemon;
}());
exports.Pokemon = Pokemon;

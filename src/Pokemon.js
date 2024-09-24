"use strict";
//Nombre, tipo, HP actual, HP máximo (hpMax), ataque, defensa, y una lista de movimientos (Move).
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
//Método attack(): Permite al Pokémon atacar seleccionando un movimiento de su lista y calculando el daño infligido.
//Método heal(): Cura al Pokémon un 50% de su HP máximo, y solo puede usarse una vez por combate.
var Pokemon = /** @class */ (function () {
    function Pokemon(nombre, tipo, hp_actual, hp_max, ataque, defensa) {
        this.lista_movimientos = [];
        this.nombre = nombre;
        this.tipo = tipo;
        this.hp_actual = hp_actual;
        this.hp_max = hp_max;
        this.ataque = ataque;
        this.defensa = defensa;
    }
    Pokemon.prototype.addMovimiento = function (movimiento) {
        this.lista_movimientos.push(movimiento);
    };
    Pokemon.prototype.attack = function (pokemon) {
        var movimiento_aleatorio = this.lista_movimientos[Math.floor(Math.random() * this.lista_movimientos.length)];
        console.log("".concat(this.nombre, " usa ").concat(movimiento_aleatorio.getNombreMovimiento(), " (Da\u00F1o: ").concat(movimiento_aleatorio.getDamage(), ")"));
        var randomFactor = Math.random() * (1.0 - 0.85) + 0.85;
        var damage = (this.ataque / this.defensa) * movimiento_aleatorio.getDamage() * randomFactor;
        var hp_update = Math.round(pokemon.getHpActual() - damage);
        pokemon.setHpActual(hp_update);
    };
    Pokemon.prototype.heal = function () {
        if (Pokemon.usos_heal < 1) {
            this.hp_actual = this.hp_actual + (this.hp_max / 2);
            console.log("Saluda aumentada en un 50%! (".concat(this.hp_actual / 2, ") "));
            if (this.hp_actual > this.hp_max) {
                this.hp_actual = this.hp_max;
            }
            Pokemon.usos_heal++;
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
    Pokemon.prototype.toString = function () {
        console.log("Nombre: ".concat(this.nombre, " | Tipo: ").concat(this.tipo, " | HP Actual: ").concat(this.hp_actual, " | HP Max: ").concat(this.hp_max, " | Ataque: ").concat(this.ataque, " | Defensa: ").concat(this.defensa, " | "));
    };
    Pokemon.usos_heal = 0;
    return Pokemon;
}());
exports.Pokemon = Pokemon;

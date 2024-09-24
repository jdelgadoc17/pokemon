"use strict";
//Clase Move: Representa los movimientos de ataque con atributos como nombre y daño base.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
var Move = /** @class */ (function () {
    function Move(nombre_movimiento, damage) {
        this.nombre_movimiento = nombre_movimiento;
        this.damage = damage;
    }
    Move.prototype.setNombreMovimiento = function (nombre_movimiento) {
        this.nombre_movimiento = this.nombre_movimiento;
    };
    Move.prototype.setDamage = function (damage) {
        this.damage = this.damage;
    };
    Move.prototype.getNombreMovimiento = function () {
        return this.nombre_movimiento;
    };
    Move.prototype.getDamage = function () {
        return this.damage;
    };
    return Move;
}());
exports.Move = Move;

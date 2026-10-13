//import { chanceAcumulada } from "./probability.js";

function validarChance(chance) {
    if(!Number.isFinite(chance) || chance < 0 || chance > 1) {
        throw new Error("A chance deve estar entre 0 e 1.");
    }
}

export function calcularChanceEfetiva(chanceBase, multiplicadores = []) {
    validarChance(chanceBase);

    const multiplicadorTotal = multiplicadores.reduce((total, multiplicador) => {
        if(!Number.isFinite(multiplicador) || multiplicador < 0) {
            throw new Error("Os multiplicadores devem ser números não negativos.");
        }
        return total * multiplicador
    }, 1);

    return Math.min(1, chanceBase * multiplicadorTotal); //Evitar que passe de 100% a chanceEfetiva
}

export function calcularAbatesParaMeta(chancePorAbate, meta) {
    validarChance(chancePorAbate);

    if(meta === 0) {
        return 0;
    }

    if(chancePorAbate === 1) {
        return 1;
    }

    if(chancePorAbate === 0 || meta === 1) {
        return null;
    }

    const numeroAbates = Math.ceil(Math.log1p(-meta)/Math.log1p(-chancePorAbate));

    if(!Number.isSafeInteger(numeroAbates)) {
        return null;
    }

    return numeroAbates;
}

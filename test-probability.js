import { chanceAcumulada } from "./src/calculators/probability.js";

console.log("Zero tentativas", chanceAcumulada(1/24000, 0));
console.log("Uma tentativa", chanceAcumulada(1/24000, 1));
console.log("24 mil tentativas", chanceAcumulada(1/24000, 24000));
console.log("50% de chance em 1 tentativa", chanceAcumulada(0.5, 1));

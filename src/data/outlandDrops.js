
export const outlands = [
    { id: 1, name: "Outland 1", trainerLevel: 150, multiplier: 1 },
{ id: 2, name: "Outland 2", trainerLevel: 500, multiplier: 1.25 },
{ id: 3, name: "Outland 3", trainerLevel: 1000, multiplier: 1.5 },
{ id: 4, name: "Outland 4", trainerLevel: 2000, multiplier: 2 },
{ id: 5, name: "Outland 5", trainerLevel: 4000, multiplier: 3 },
{ id: 6, name: "Outland 6", trainerLevel: 8000, multiplier: 4 },
{ id: 7, name: "Outland 7", trainerLevel: 16000, multiplier: 6 },
{ id: 8, name: "Outland 8", trainerLevel: 25000, multiplier: 8 },
];

export const outlandDrops = [
    {
        id: "bronze-boss-token",
        name: "Bronze Boss Token",
        baseChance: 1 / 2000,
        description: "Usado para enfrentas boss (chance de dropar itens raros).",
    },
{
    id: "bike-fragment",
    name: "Fragmento de Bicicleta",
    baseChance: 1 / 200000,
    description: "Fragmento raro encontrado na Outland.",
},
{
    id: "key-fragment",
    name: "Fragmento de Chave",
    baseChance: 1 / 200000,
    description: "Fragmento raro encontrado na Outland.",
},
{
    id: "shiny-stone-fragment",
    name: "Fragmento de Shiny Stone",
    baseChance: 1 / 200000,
    description: "Fragmento raro encontrado na Outland.",
    fragmentsRequired: 10,
},
];

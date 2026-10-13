import {  describe, expect, it } from "vitest";
import { chanceAcumulada } from "../probability.js";

describe("chanceAcumulada", () => {
	describe("Resultados esperados", () => {

		it("Deve retornar 0 quando não houver tentativar", () => {
			expect(chanceAcumulada(1/24000, 0)).toBe(0);
		});

		it("Deve retornar a chance individual com uma tentativa", () => {
			expect(chanceAcumulada(0.5, 1)).toBe(0.5);
		});

		it("Deve retornar 1 quando a chance for 100%", () => {
			expect(chanceAcumulada(1, 1)).toBe(1);
		});

		it("Deve retornar 0 quando a chance for 0%", () => {
			expect(chanceAcumulada(0, 100)).toBe(0);
		});

		it("Deve retornar aproximadamente 63,21% em 24000 tentativas", () => {
			expect(chanceAcumulada(1/24000, 24000)).toBeCloseTo(0.6321, 3);
		});

		it("Deve retornar aproximadamente 0.0041% em 1 tentativa", () => {
			expect(chanceAcumulada(1/24000, 1)).toBeCloseTo(0.000041, 5);
		});

	});

	describe("Validação das entradas", () => {
		it("Deve rejeitar uma probabilidade negativa", () => {
			expect(() => chanceAcumulada(-0.1, 10)).toThrow("A chance deve estar entre 0 e 1.",);
		});

		it("Deve rejeitar uma probabilidade maior do que 1", () => {
			expect(() => chanceAcumulada(1.1, 10)).toThrow("A chance deve estar entre 0 e 1.",);
		});

		it("Deve rejeitar um número negativo de tentativas", () => {
			expect(() => chanceAcumulada(0.5, -10)).toThrow("O número de tentativas deve ser um inteiro não negativo.",);
		});

		it("Deve rejeitar tentativas fracionárias", () => {
			expect(() => chanceAcumulada(0.5, 1.2)).toThrow("O número de tentativas deve ser um inteiro não negativo.",);
		});

	});


	describe("Precisão numérica", () => {
			
		it("Deve preservar a precisão para probabilidades muito pequenas", () => {
			expect(chanceAcumulada(1e-12, 1)).toBe(1e-12);
		});
	});

	describe("Propriedades matemática", () => {
		it("A chance não deve diminuir conforme as tentativas aumentam", () => {
			const chanceInicial = chanceAcumulada(1/24000, 1000);
			const chanceMaior = chanceAcumulada(1/24000, 2000);
	
			expect(chanceMaior).toBeGreaterThanOrEqual(chanceInicial);
		});

		it("Deve manter o resultado entre 0 e 1", () => {
			const casos = [
				{ chance: 0, tentativas: 0},
				{ chance: 0.001, tentativas: 100},
				{ chance: 0.5, tentativas: 10},
				{ chance: 0.99, tentativas: 100},
				{ chance: 1, tentativas: 100},
			];

			for (const caso of casos) {
				const resultado = chanceAcumulada(caso.chance, caso.tentativas);
		

				expect(resultado).toBeGreaterThanOrEqual(0);
				expect(resultado).toBeLessThanOrEqual(1);
			}
		});
	});
})


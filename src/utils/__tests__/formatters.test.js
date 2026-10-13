import { describe, expect, it } from "vitest";
import { formatarPorcentagem } from "../formatters.js";

describe("formatarPorcentagem", () => {
	it("Deve exibir mais casas decimais quando a porcentem for pequena", () => {
		expect(formatarPorcentagem(1/24000)).toBe("0,004167%");
	});
	
	it("Deve exibir menos casas decimais quando a porcentem for grande", () => {
		expect(formatarPorcentagem(1)).toBe("100,00%");
	});
});

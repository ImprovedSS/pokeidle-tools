import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ShinyCalculator from "./ShinyCalculator.jsx";


describe("ShinyCalculator", () => {
	it("Deve exibir o título da calculadora", () => {
		render(<ShinyCalculator />);


		expect(
			screen.getByRole("heading", {
				name: "Suas chances de encontrar um Shiny.",
			}),
		).toBeInTheDocument();
	});

	it("Deve atualizar a probabilidade ao alterar as tentativas", () => {
		render(<ShinyCalculator />);

		const campoTentativas = screen.getByRole("spinbutton", {
			name: /número de tentativas/i,
		});

		fireEvent.change(campoTentativas, ({
			target: {value: "1"},
		}));


		expect(screen.getByRole("progressbar", {
			name: /probabilidade acumulada de encontrar pelo menos um shiny/i,
		}),
		).toHaveAttribute("aria-valuenow", String((1/24000)*100));
		expect(screen.getByText("CHANCE ACUMULADA").parentElement).toHaveTextContent("0,00%");
	});

	it("Deve exibir um erro quando as tentativas estiverem vazias", () => {
		render(<ShinyCalculator />);

		const campoTentativas = screen.getByRole("spinbutton", {
			name: /número de tentativas/i,
		});

		fireEvent.change(campoTentativas, {
			target: { value: "" },
		});

		expect(screen.getByText("Informe valores válidos para calcular."),
		).toBeInTheDocument();
	});

	it("Deve exibir erro ao tentar enviar um número negativo de tentativas", () => {
		render(<ShinyCalculator/>);

		const campoTentativas = screen.getByRole("spinbutton", {
			name: /número de tentativas/i
		});

		fireEvent.change(campoTentativas, {
			target: { value: "-1"},
		});

		expect(screen.getByText("Informe valores válidos para calcular."),
		).toBeInTheDocument();
	});

	it("Deve exibir erro ao tentar inserir valores fracionários no campo de tentativas", () => {
		render(<ShinyCalculator />);

		const campoTentativas = screen.getByRole("spinbutton", {
			name: /número de tentativas/i,
		});

		fireEvent.change(campoTentativas, {
			target: {value: "2.5"},
		}); 

		expect(screen.getByText("Informe valores válidos para calcular."),).toBeInTheDocument();
	});

	it("Deve exibir mais casas decimais para probabilidade pequenas", () => {
		render(<ShinyCalculator />);

		expect(screen.getByText("CHANCE ACUMULADA").parentElement).toHaveTextContent("63,21%");

		const campoTentativas = screen.getByRole("spinbutton", {
			name: /número de tentativas/i,
		});
		
		fireEvent.change(campoTentativas, {
			target: {value: "1"},
		});

		expect(screen.getByText("CHANCE ACUMULADA").parentElement).toHaveTextContent("0,004167%", { exact:true });
	});

	it("Deve exibir menos casas decimais para probabilidades altas", () => {
		render(<ShinyCalculator />);

		const campoChance = screen.getByRole("spinbutton", {
			name: /chance individual/i,
		});

		fireEvent.change(campoChance, {
			target: { value: "2"},
		});

		expect(screen.getByText("CHANCE ACUMULADA").parentElement).toHaveTextContent("100,00%");
	});
});



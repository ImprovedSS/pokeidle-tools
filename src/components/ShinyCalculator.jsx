
import { useState } from "react";
import { chanceAcumulada } from "../calculators/probability.js";
import { formatarPorcentagem } from "../utils/formatters.js";

const CHANCE_BASE_SHINY = 1 / 24000;

function multiplicadorBoost(ativo, bonusEvento) {
	return (ativo ? 1.5 : 1) * (1 + bonusEvento / 100);
}

function ShinyCalculator() {
	const [tentativas, setTentativas] = useState("10000");

	const [shinyBoost, setShinyBoost] = useState(false);
	const [kickShinyBoost, setKickShinyBoost] = useState(false);
	const [eventoShiny, setEventoShiny] = useState("0");

	const [catchRate, setCatchRate] = useState("2.44");
	const [catchBoost, setCatchBoost] = useState(false);
	const [kickCatchBoost, setKickCatchBoost] = useState(false);
	const [eventoCatch, setEventoCatch] = useState("0");

	const quantidadeTentativas = Number(tentativas);
	const catchRateBase = Number(catchRate);
	const bonusEventoShiny = Number(eventoShiny);
	const bonusEventoCatch = Number(eventoCatch);

	const entradasValidas =
	tentativas.trim() !== "" &&
	Number.isSafeInteger(quantidadeTentativas) &&
	quantidadeTentativas >= 0 &&
	catchRate.trim() !== "" &&
	Number.isFinite(catchRateBase) &&
	catchRateBase >= 0 &&
	catchRateBase <= 100 &&
	eventoShiny.trim() !== "" &&
	Number.isFinite(bonusEventoShiny) &&
	bonusEventoShiny >= 0 &&
	eventoCatch.trim() !== "" &&
	Number.isFinite(bonusEventoCatch) &&
	bonusEventoCatch >= 0;

	const multiplicadorShiny = entradasValidas
	? multiplicadorBoost(shinyBoost, bonusEventoShiny) *
	(kickShinyBoost ? 1.15 : 1)
	: null;

	const multiplicadorCatch = entradasValidas
	? multiplicadorBoost(catchBoost, bonusEventoCatch) *
	(kickCatchBoost ? 1.15 : 1)
	: null;

	const chanceShiny = entradasValidas
	? Math.min(1, CHANCE_BASE_SHINY * multiplicadorShiny)
	: null;

	const catchRateEfetivo = entradasValidas
	? Math.min(100, catchRateBase * multiplicadorCatch)
	: null;

	// Chance de encontrar E capturar o Shiny em um encontro.
	const chanceSucesso = entradasValidas
	? chanceShiny * (catchRateEfetivo / 100)
	: null;

	const probabilidade = entradasValidas
	? chanceAcumulada(chanceSucesso, quantidadeTentativas)
	: null;

	const probabilidadeRestante =
	probabilidade === null ? null : 1 - probabilidade;

	return (
		<section className="shiny-calculator" aria-labelledby="shiny-title">
		<div className="shiny-heading">
		<span className="section-kicker">
		CALCULADORA DE PROBABILIDADE
		</span>
		<h2 id="shiny-title">Suas chances de capturar um Shiny.</h2>
		<p>
		Configure seus boosts, informe o Catch Rate do Pokémon
		e descubra a probabilidade de capturar pelo menos um Shiny.
		</p>
		</div>

		<div className="shiny-layout">
		<div className="shiny-fields">
		<div className="field">
		<span>Chance base de Shiny</span>
		<strong>1 em 24.000</strong>
		<small>Chance padrão por encontro, antes dos boosts.</small>
		</div>

		<label className="field">
		<span>Número de abates / encontros</span>
		<input
		type="number"
		min="0"
		step="1"
		value={tentativas}
		onChange={(event) => setTentativas(event.target.value)}
		inputMode="numeric"
		/>
		</label>

		<div className="field">
		<span>Boosts de Shiny</span>

		<label>
		<input
		type="checkbox"
		checked={shinyBoost}
		onChange={(event) => setShinyBoost(event.target.checked)}
		/>
		Shiny Boost (+50%)
		</label>

		<label>
		<input
		type="checkbox"
		checked={kickShinyBoost}
		onChange={(event) =>
			setKickShinyBoost(event.target.checked)
		}
		/>
		Kick Shiny Boost (+15%)
		</label>
		</div>

		<label className="field">
		<span>Evento Shiny Boost (%)</span>
		<input
		type="number"
		min="0"
		step="any"
		value={eventoShiny}
		onChange={(event) => setEventoShiny(event.target.value)}
		/>
		<small>Informe 0 quando não houver evento.</small>
		</label>

		<div className="field">
		<span>Boosts de captura</span>

		<label>
		<input
		type="checkbox"
		checked={catchBoost}
		onChange={(event) => setCatchBoost(event.target.checked)}
		/>
		Catch Rate Boost (+50%)
		</label>

		<label>
		<input
		type="checkbox"
		checked={kickCatchBoost}
		onChange={(event) =>
			setKickCatchBoost(event.target.checked)
		}
		/>
		Kick Catch Rate Boost (+15%)
		</label>
		</div>

		<label className="field">
		<span>Catch Rate base do Pokémon (%)</span>
		<input
		type="number"
		min="0"
		max="100"
		step="any"
		value={catchRate}
		onChange={(event) => setCatchRate(event.target.value)}
		/>
		<small>
		Informe o percentual mostrado pelo PokéIdle, antes dos boosts.
		</small>
		</label>

		<label className="field">
		<span>Evento Catch Rate Boost (%)</span>
		<input
		type="number"
		min="0"
		step="any"
		value={eventoCatch}
		onChange={(event) => setEventoCatch(event.target.value)}
		/>
		<small>Informe 0 quando não houver evento.</small>
		</label>
		</div>

		<div className="shiny-result" aria-live="polite">
		<span className="result-label">
		CHANCE DE CAPTURAR UM SHINY
		</span>

		{!entradasValidas ? (
			<p className="input-error">
			Informe valores válidos. O Catch Rate deve estar entre 0 e 100%.
			</p>
		) : (
			<>
			<strong className="result-value">
			{formatarPorcentagem(probabilidade)}
			</strong>

			<div
			className="probability-bar"
			role="progressbar"
			aria-label="Probabilidade acumulada de capturar pelo menos um Shiny"
			aria-valuemin="0"
			aria-valuemax="100"
			aria-valuenow={probabilidade * 100}
			>
			<div
			className="probability-fill"
			style={{ width: `${probabilidade * 100}%` }}
			/>
			</div>

			<div className="result-detail">
			<span>Chance efetiva de Shiny por encontro</span>
			<strong>{formatarPorcentagem(chanceShiny)}</strong>
			</div>

			<div className="result-detail">
			<span>Catch Rate efetivo</span>
			<strong>{formatarPorcentagem(catchRateEfetivo / 100)}</strong>
			</div>

			<div className="result-detail">
			<span>Chance de capturar um Shiny por encontro</span>
			<strong>{formatarPorcentagem(chanceSucesso)}</strong>
			</div>

			<div className="result-detail">
			<span>Chance de não capturar nenhum</span>
			<strong>{formatarPorcentagem(probabilidadeRestante)}</strong>
			</div>
			</>
		)}
		</div>
		</div>

		<p className="shiny-disclaimer">
		Os resultados são estimativas matemáticas baseadas em encontros
		independentes. Os boosts são multiplicativos, e o Catch Rate efetivo
		é limitado a 100%. A chance acumulada representa a probabilidade de
		capturar pelo menos um Shiny no número informado de encontros.
		</p>
		</section>
	);
}

export default ShinyCalculator;

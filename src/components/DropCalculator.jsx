import { useState } from "react";
import { outlandDrops, outlands } from "../data/outlandDrops.js";
import { calcularAbatesParaMeta, calcularChanceEfetiva } from "../calculators/drops.js";
import { chanceAcumulada } from "../calculators/probability.js";
import { formatarPorcentagem } from "../utils/formatters.js";

function formatarNumero(valor) {
    return new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 2,
    }).format(valor);
}

function formatarTempo(horas) {
    if(!Number.isFinite(horas) || horas < 0) {
        return "Tempo indisponível";
    }

    if(horas === 0) {
        return "Imediato";
    }

    if(horas < 1) {
        const minutos = Math.ceil(horas * 60);
        return `Cerca de ${minutos} min`;
    }

    if(horas < 24) {
        return `Cerca de ${Math.ceil(horas)} h`;
    }

    const dias = Math.floor(horas/24);
    const horasRestantes = Math.ceil(horas - dias * 24);

    if(horasRestantes >= 24) {
        return `Cerca de ${dias + 1} dias`;
    }

    return horasRestantes > 0
        ? `Cerca de ${dias} dias e ${horasRestantes} h`
        : `Cerca de ${dias} dias`;
}

function CampoMultiplicador({ id, label, value, onChange}) {
    return (
        <div className="drop-field">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="number"
                min="1"
                step="0.1"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />

            <small>Use 1 para nenhum bônus e 2 para x2.</small>
        </div>
    );
}

function DropCalculator() {
    const [itemId, setItemId ] = useState(outlandDrops[0].id);
    const [outlandId, setOutlandId] = useState("1");
    const [lootBoost, setLootBoost] = useState("1");
    const [guildBoost, setGuildBoost] = useState("1");
    const [eventBoost, setEventBoost] = useState("1");
    const [kickBoost, setKickBoost] = useState("1");
    const [modo, setModo] = useState("meta");
    const [abates, setAbates] = useState("10000'");
    const [meta, setMeta] = useState("90");
    const [abatesPorHora, setAbatesPorHora] = useState("250");

    const item = outlandDrops.find((drop) => drop.id === itemId);
    const outland = outlands.find((region) => region.id === Number(outlandId),);

    const loot = Number(lootBoost);
    const guild = Number(guildBoost);
    const evento = Number(eventBoost);
    const kick = Number(kickBoost);

    const multiplicadoresValidos = [loot, guild, evento, kick].every(
                                                         (value) => Number.isFinite(value) && value >= 1,
    );

    const chanceEfetiva =
        item && outland && multiplicadoresValidos
            ? calcularChanceEfetiva(item.baseChance, [
                outland.multiplier,
                loot,
                guild,
                evento,
                kick
            ])
            : null;
    const numeroAbates = Number(abates);
    const metaDecimal = Number(meta) / 100;
    const taxaAbates = Number(abatesPorHora);

    const abatesValidos = abates.trim() !== "" && Number.isSafeInteger(numeroAbates) && numeroAbates >= 0;

    const metaValida = meta.trim() !== "" && Number.isFinite(metaDecimal) && metaDecimal > 0 && metaDecimal <= 1;

    const taxaValida = abatesPorHora.trim() !== "" && Number.isFinite(taxaAbates) && taxaAbates > 0;

    const configuracaoValida = chanceEfetiva !== null && multiplicadoresValidos;

    const chanceAcumuladaVar =
        configuracaoValida && modo === "abates" && abatesValidos
        ? chanceAcumulada(chanceEfetiva, numeroAbates)
        : null;

    const abatesNecessarios =
        metaValida && configuracaoValida && modo === "meta"
        ? calcularAbatesParaMeta(chanceEfetiva, metaDecimal)
        : null;

    const metaImpossivel = configuracaoValida && modo === "meta" && metaValida && abatesNecessarios === null;

    const tempoHoras = abatesNecessarios != null && taxaValida
    ? abatesNecessarios / taxaAbates
    : null;

    const probabilidadeComplementar = chanceAcumuladaVar === null ? null : 1 - chanceAcumuladaVar;

    const chanceLabel = `1 em ${formatarNumero(1 / (chanceEfetiva || item.baseChance))}`; //Entender melhor

    return (
        <section
        className="drop-calculator"
        aria-labelledby="drop-calculator-title"
        >
        <div className="drop-heading">
        <span className="drop-eyebrow">PROBABILIDADE · OUTLAND</span>
        <h2 id="drop-calculator-title">Calculadora de Drops</h2>
        <p>
        Estime suas chances de obter itens raros e quantos abates
        você precisa para alcançar sua meta.
        </p>
        </div>

        <div className="drop-form">
        <div className="drop-field">
        <label htmlFor="drop-item">Item desejado</label>
        <select
        id="drop-item"
        value={itemId}
        onChange={(event) => setItemId(event.target.value)}
        >
        {outlandDrops.map((drop) => (
            <option key={drop.id} value={drop.id}>
            {drop.name}
            </option>
        ))}
        </select>
        <small>{item.description}</small>
        </div>

        <div className="drop-field">
        <label htmlFor="drop-outland">Local da farm</label>
        <select
        id="drop-outland"
        value={outlandId}
        onChange={(event) => setOutlandId(event.target.value)}
        >
        {outlands.map((region) => (
            <option key={region.id} value={region.id}>
            {region.name} · ×{region.multiplier}
            </option>
        ))}
        </select>
        <small>
        Nível de treinador necessário: {outland.trainerLevel}
        </small>
        </div>

        <div className="drop-fields-grid">
        <CampoMultiplicador
        id="loot-boost"
        label="Loot Boost"
        value={lootBoost}
        onChange={setLootBoost}
        />
        <CampoMultiplicador
        id="guild-boost"
        label="Bônus de guild"
        value={guildBoost}
        onChange={setGuildBoost}
        />
        <CampoMultiplicador
        id="event-boost"
        label="Evento de farm"
        value={eventBoost}
        onChange={setEventBoost}
        />
        <CampoMultiplicador
        id="kick-boost"
        label="Kick Boost"
        value={kickBoost}
        onChange={setKickBoost}
        />
        </div>

        <div className="drop-effective-chance">
        <span>Chance efetiva por abate</span>
        <strong>
        {configuracaoValida
            ? formatarPorcentagem(chanceEfetiva)
            : "Verifique os multiplicadores"}
            </strong>
            <small>
            {configuracaoValida
                ? `${chanceLabel} · Base: ${formatarPorcentagem(item.baseChance)}`
                : "Informe multiplicadores válidos."}
                </small>
                </div>

                <div className="drop-field">
                <label htmlFor="drop-mode">Modo de cálculo</label>
                <select
                id="drop-mode"
                value={modo}
                onChange={(event) => setModo(event.target.value)}
                >
                <option value="meta">Atingir uma meta de probabilidade (99% de chance)</option>
                <option value="abates">Calcular probabilidade para um número de abates</option>
                </select>
                </div>

                {modo === "meta" ? (
                    <>
                    <div className="drop-field">
                    <label htmlFor="drop-target">Probabilidade desejada (%)</label>
                    <input
                    id="drop-target"
                    type="number"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={meta}
                    onChange={(event) => setMeta(event.target.value)}
                    />
                    <small>Ex.: 50, 90, 95 ou 99.</small>
                    </div>

                    <div className="drop-field">
                    <label htmlFor="drop-kills-per-hour">Abates por hora</label>
                    <input
                    id="drop-kills-per-hour"
                    type="number"
                    min="0.01"
                    step="any"
                    value={abatesPorHora}
                    onChange={(event) => setAbatesPorHora(event.target.value)}
                    />
                    <small>Use sua média real de abates por hora.</small>
                    </div>

                    <div className="drop-results" aria-live="polite">
                    {metaImpossivel ? (
                        <p>
                        Essa meta não pode ser atingida com uma quantidade real
                        de abates.
                        </p>
                    ) : abatesNecessarios !== null ? (
                        <>
                        <span>Abates mínimos necessários</span>
                        <strong>{formatarNumero(abatesNecessarios)}</strong>
                        <div className="drop-result-detail">
                        <span>Tempo estimado</span>
                        <strong>
                        {taxaValida
                            ? formatarTempo(tempoHoras)
                            : "Informe uma taxa válida de abates por hora."}
                            </strong>
                            </div>
                            <div className="drop-result-detail">
                            <span>Itens esperados nesse total</span>
                            <strong>
                            {formatarNumero(abatesNecessarios * chanceEfetiva)}
                            </strong>
                            </div>
                            </>
                    ) : (
                        <p>Informe uma meta válida para calcular os resultados.</p>
                    )}
                    </div>
                    </>
                ) : (
                    <>
                    <div className="drop-field">
                    <label htmlFor="drop-kills">Quantidade de abates</label>
                    <input
                    id="drop-kills"
                    type="number"
                    min="0"
                    step="1"
                    value={abates}
                    onChange={(event) => setAbates(event.target.value)}
                    />
                    </div>

                    <div className="drop-results" aria-live="polite">
                    {abatesValidos && configuracaoValida ? (
                        <>
                        <span>Chance de obter pelo menos um item</span>
                        <strong>
                        {formatarPorcentagem(chanceAcumuladaVar)}
                        </strong>
                        <div className="drop-result-detail">
                        <span>Chance de não obter nenhum</span>
                        <strong>
                        {formatarPorcentagem(probabilidadeComplementar)}
                        </strong>
                        </div>
                        <div className="drop-result-detail">
                        <span>Quantidade esperada de itens</span>
                        <strong>
                        {formatarNumero(numeroAbates * chanceEfetiva)}
                        </strong>
                        </div>
                        </>
                    ) : (
                        <p>Informe uma quantidade válida de abates.</p>
                    )}
                    </div>
                    </>
                )}
                </div>

                <p className="drop-disclaimer">
                Os resultados são estimativas matemáticas, não garantias de drop.
                Pressupõem abates independentes e uma chance individual constante.
                </p>
                </section>
    );
}

export default DropCalculator;


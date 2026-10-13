import { useState } from "react";
import './App.css'
import ShinyCalculator from "./components/ShinyCalculator.jsx";
import DropCalculator from "./components/DropCalculator.jsx";


const calculators = [
	{
		id: "shiny",
		icon: "✧",
		category: "PROBABILIDADE",
		title: "Calculadora de Shiny",
		description: 
			"Descubra a chance acumulada de encontrar um Shiny após n tentativas.",
		status: "Disponível",
		featured: true,
	},
	{
		id: "drops",
		icon: "◇",
		category: "PROBABILIDADE",
		title: "Calculadora de Drops",
		description: 
			"Calcula as chances de drop, abates necessários e tempo estimado para conseguir itens raros.",
		status: "Disponível",
		featured: true,
	},
	{
		id: "farm",
		icon: "↗",
		category: "EFICIÊNCIA",
		title: "Calculadora de Farm",
		description: "Compare experiência, dinheiro e rendimento por hora.",
		status: "Planejada",
		featured: false,
	},
	{
		id: "iv",
		icon: "⌘",
    		category: "POKÉMON",
    		title: "Comparador de IVs",
    		description:
      			"Compare atributos individuais e avalie diferentes Pokémon.",
    		status: "Planejada",
    		featured: false,
	},
	{
		id: "dps",
		icon: "⚔",
		category: "COMBATE",
		title: "Calculadora de DPS",
		description: 
			"Compare o dano causado por segundo e a eficiência dos golpes usados.",
		status: "Planejada",
		featured: false,
	},
];

function App() {
	const [telaAtual, setTelaAtual] = useState("inicio");

	function navegarPara(secao) {
		if (telaAtual === "inicio") {
			document.getElementById(secao)?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
			return;
		}

		setTelaAtual("inicio");

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				document.getElementById(secao)?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			})
		});
	}


	return (
		<div className="app-shell">
			<header className="site-header">
				<a
					className="brand"
					href="#inicio"
					onClick={(event) => {
						event.preventDefault();
						navegarPara("inicio");
					}}
					aria-label="PokeIdle Tools - Início"
				>
					<span className="brand-mark" aria-hidden="true">
						P
					</span>

					<span className="brand-name">
						PokeIdle <span>Tools</span>
					</span>
				</a>

				<nav className="header-nav" aria-label="Navegação princiapl">
					<a
						className="nav-link active"
						href="#calculadoras"
						onClick={(event) => {
							event.preventDefault();
							navegarPara("calculadoras");
						}}
					>
						Calculadoras
					</a>

					<a
						className="nav-link"
						href="#sobre"
						onClick={(event) => {
							event.preventDefault();
							navegarPara("sobre");
						}}
					>
						Sobre
					</a>
				</nav>

				<a
					className="header-action"
					href="#calculadoras"
					onClick={(event) => {
						event.preventDefault();
						navegarPara("calculadoras");
					}}
				>
					Explorar ferramentas <span aria-hidden="true">↗</span>
				</a>
			</header>
			
			<main id="inicio">
			{telaAtual === "inicio" ? (
				<>
					<section className="hero">
						<div className="hero-copy">
							<div className="eyebrow">
								<span className="status-dot" />
								FERRAMENTAS
							</div>

							<h1>
								Jogue com dados.
								<br />
								<span>Otimize seus ganhos.</span>
							</h1>

							<p className="hero-description">
								Conjunto de calculadoras e ferramentas para entender as probabilidades, comparar estratégias e tomar decisões melhores no servidor.
							</p>

							<a className="primary-button" href="#calculadoras">
								Explorar calculadoras
								<span aria-hidden="true">→</span>
							</a>

							<div className="hero-note">
								<span aria-hidden="true">✳</span>
								Desenvolvido para quem gosta de entender os números e montar estratégias.
							</div>
						</div>

						<div className="hero-visual" aria-hidden="true">
							<div className="visual-glow" />
							<div className="visual-grid" />

							<div className="visual-card">
								<div className="visual-card-top">
									<span className="visual-label">PROBABILIDADE</span>
									<span className="visual-symbol">✧</span>
								</div>

								<div className="visual-shiny">★</div>

								<div className="visual-card-bottom">
									<span>Encontro Raro/Brilhante</span>
									<span className="visual-badge">RNG</span>
								</div>
							</div>

							<span className="orbit orbit-one" />
							<span className="orbit orbit-two" />
						</div>
					</section>

					<section
						className="calculators-section"
						id="calculadoras"
						aria-labelledby="calculators-title"
					>
						<div className="section-heading">
							<div>
								<span className="section-kicker">Central de Ferramentas</span>
								<h2 id="calculators-title">
									Suas ferramentas<span className="accent-period">.</span>
								</h2>
								<p>Escolha uma categoria para realizar os cálculos.</p>
							</div>

							<span className="tool-count">
								<span className="status-dot" />
								{calculators.length} ferramentas planejadas
							</span>
						</div>

						<div className="calculator-grid">
							{calculators.map((calculator) => (
								<article
									className={`calculator-card${
										calculator.featured ? " featured" : ""
									}`}
									key={calculator.id}
									onClick={() => {
										if(calculator.id === "shiny" || calculator.id === "drops") {
											setTelaAtual(calculator.id);
										}
									}}
									role={calculator.id === "shiny" || calculator.id === "drops" ? "button" : undefined}
									tabIndex={calculator.id === "shiny" || calculator.id === "drops" ? 0 : undefined}
									onKeyDown={(event) => {
										if((calculator.id === "shiny" || calculator.id === "drops") && (event.key === "Enter" || event.key === " ")) {
											event.preventDefault();
											setTelaAtual(calculator.id);
										}
									}}
								>
									<div className="card-top">
										<span className="card-icon" aria-hidden="true">
											{calculator.icon}
										</span>

										<span
											className={`card-status${
												calculator.featured ? " status-featured" : ""
											}`}
										>
											{calculator.status}
										</span>
									</div>

									<span className="card-category">{calculator.category}</span>

									<h3>{calculator.title}</h3>

									<p className="card-description">{calculator.description}</p>

									<div className="card-bottom">
										<span className="card-action-label">
											{calculator.featured
											? "Implementada"
											: "Desenvolvimento"}
										</span>
										<span className="card-arrow" aria-hidden="true">
											↗
										</span>
									</div>
								</article>
							))}
						</div>
					</section>

					<section className="about-section" id="sobre">
						<div className="about-mark" aria-hidden="true">
							P<span>.</span>
						</div>

						<div>
							<span className="section-kicker">Sobre o Projeto</span>
							<h2>Criado para solucionar discussões a respeito de chances.</h2>
							<p>
								O PokeIdle Tools é um projeto independente que busca facilitar a vida dos jogadores através de calculadoras e ferramentas, estas desenvolvidas de forma contínua, sempre buscando trazer clareza e entendimento a todos.
							</p>
						</div>
					</section>
				</>
			) : (
				<section className="shiny-calculator-page">
					<button
						type="button"
						className="back-button"
						onClick={() => setTelaAtual("inicio")}
					>
					← Voltar às ferramentas
					</button>
					{telaAtual === "shiny" ? (
						<ShinyCalculator />
					) : telaAtual === "drops" ? (
						<DropCalculator />
					) : null}
				</section>
			)}
			</main>

			<footer className="site-footer">
				<a className="footer-brand" href="#inicio">
					PokeIdle Tools<span>.</span>
				</a>

				<p>
					Projeto independente, sem afiliação oficial com o PokeIdle.
				</p>

				<a className="back-to-top" href="#inicio">
					Voltar ao começo ↑
				</a>
			</footer>
		</div>
	);
}

export default App;

export function chanceAcumulada(chancePorTentativa, tentativas) {
	if (
		!Number.isFinite(chancePorTentativa) ||
		chancePorTentativa < 0 ||
		chancePorTentativa > 1 
	) {
		throw new Error("A chance deve estar entre 0 e 1.");
	}

	if(!Number.isSafeInteger(tentativas) || tentativas < 0) {
		throw new Error("O número de tentativas deve ser um inteiro não negativo.");
	}

	if(chancePorTentativa === 0 || tentativas === 0) {
		return 0;
	}

	if(chancePorTentativa === 1) {
		return 1;
	}

	return -Math.expm1(
		tentativas * Math.log1p(-chancePorTentativa),
	);
}

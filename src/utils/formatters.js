export function formatarPorcentagem(valor){
        const porcentagem = valor * 100;

        let casasDecimais = 2;

        if(porcentagem > 0) {
                if(porcentagem < 0.01) {
                        casasDecimais = 6;
                } else if(porcentagem < 1) {
                        casasDecimais = 4;
                }
        }
        return(new Intl.NumberFormat("pt-BR", {
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: casasDecimais
        }).format(valor));
}

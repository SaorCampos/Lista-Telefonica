function filtrar(){
    let expressao = input_busca.value.toLowerCase();
    let linhas = tabela_contatos.getElementsByTagName('tr');
    for(let posicao in linhas) {
        if(isNaN(posicao)){
            continue;
        }
        let colunaNome = linhas[posicao].children[1].innerText.toLowerCase();
        let colunaNumero = linhas[posicao].children[2].innerText.toLowerCase();
        let colunaCidade = linhas[posicao].children[3].innerText.toLowerCase();
        let colunas = colunaNome + colunaNumero;
        if (colunas.includes(expressao)){
            linhas[posicao].style.display = '';
        }else{
            linhas[posicao].style.display = 'none';
        }
    }
}
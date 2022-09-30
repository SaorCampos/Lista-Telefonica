const API_URL = 'http://localhost:8000'
function atualizarLista() {
    tabela_contatos.innerHTML = ""
    fetch(API_URL +'/Telefones')
    .then(function(resposta){
        return resposta.json();
    })
    .then(function(lista){
        lista.forEach(function (cadaContato){
            tabela_contatos.innerHTML += `
            <tr>
                <td>${cadaContato.id}</td>
                <td>${cadaContato.nome}</td>
                <td>${cadaContato.numero}</td>
                <td>${cadaContato.cidade}</td>
                <td>
                    <button onclick="excluir(${cadaContato.id})" class="btn btn-danger">
                        Excluir
                    </button>
                    <button onclick="chamarProduto(${cadaContato.id})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                    Editar
                    </button>
                </td>
            </tr>`
        });
    })
}
async function excluir (id) {
    let resposta = confirm('Tem certeza?');
    if(resposta !== true){
        return;
    }
    await fetch(API_URL + '/Telefones/' +id, {
        method: 'DELETE',
    });
    atualizarLista();
}
atualizarLista();
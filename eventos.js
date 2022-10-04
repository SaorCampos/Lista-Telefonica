const API_URL = 'http://localhost:8000'
function atualizarLista() {
    tabela_contatos.innerHTML = "<div class='spinner-border' role='status'></div>"
    fetch(API_URL +'/Telefones')
    .then(function(resposta){
        return resposta.json();
    })
    .then(function(lista){
        tabela_contatos.innerHTML = "";
        lista.forEach(function (cadaContato){
            tabela_contatos.innerHTML += `
            <tr>
                <td>${cadaContato.id}</td>
                <td>${cadaContato.nome}</td>
                <td>${cadaContato.numero}</td>
                <td>${cadaContato.cidade}</td>
                <td>
                    <button onclick="excluir(${cadaContato.id})" class="btn btn btn-outline-danger">
                        Excluir
                    </button>
                    <button onclick="chamarContato(${cadaContato.id})" type="button" class="btn btn btn-outline-warning" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar">
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
function criar(){
    event.preventDefault();
    let contato = {
        nome: document.getElementById('input_nome').value,
        numero: document.getElementById('input_telefone').value,
        cidade: document.getElementById('input_cidade').value,
    }
    if(contato.nome ==="" || contato.numero ==="" || contato.cidade ===""){
        alert('Preencha todos os campos');
        return;
    }
    fetch(API_URL +'/Telefones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato)
    }).then((response) => response.json())
    .then((data) => {
        atualizarLista();
        alert("Contato adicionado com sucesso")
        console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    formAdd.reset()
}
function chamarContato(id) {
    fetch(API_URL + '/Telefones/' +id)
    .then(function(resposta){
        return resposta.json();
    })
    .then((contato) => {
        editar_id.value = contato.id;
        editar_nome.value = contato.nome;
        editar_telefone.value = contato.numero;
        editar_cidade.value = contato.cidade
    })
};
async function editar(){
    event.preventDefault();
    let id = editar_id.value
    let contato = {
        nome: editar_nome.value,
        numero: editar_telefone.value,
        cidade: editar_cidade.value,
    }
    await fetch(API_URL + '/Telefones/' +id,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(contato)
    }).then((response) => response.json())
    .then((data) => {
        alert("Contato editado com sucesso")
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
        });
    atualizarLista();
    let x = document.getElementById('fecharOffcanvas');
    x.dispatchEvent(new Event('click'));
}
atualizarLista();
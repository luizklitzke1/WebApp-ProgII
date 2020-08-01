// Exibir os personagens
function listar_personagens() {
    $.ajax({
        url: 'http://localhost:5000/listar_personagens',
        method: 'GET',  dataType: 'json', 
        success: listar,  error: function() {
            alert("Erro na leitura dos dados");
        }
    });
    function listar (personagens) {
        // Limpar a tabela
        $('#corpoTabelaPersonagens').empty();
        // tornar a tabela visível
        mostrar_conteudo("TabelaPersonagens");      
        // percorrer a lista de pessoas retornadas; 
        for (var i in personagens) { /
            lin = '<tr>' + // elabora linha com os dados da pessoa
            '<td>' + personagens[i].nome + '</td>' + 
            '<td>' + personagens[i].email + '</td>' + 
            '<td>' + personagens[i].telefone + '</td>' + 
            '</tr>';
            // adiciona a linha no corpo da tabela
            $('#corpoTabelaPessoas').append(lin);
        }
    }
}



// Código para inclusão de personagens
$(document).on("click", "#btIncluirPessoa", function() {
    //pegar dados da tela
    nome = $("#campoNome").val();
    raca = $("#campoRaca").val();
    classe = $("#campoClasse").val();
    nivel = $("#campoNivel").val();
    forca = $("#campoForca").val();
    destreza = $("#campoDestreza").val();
    constituicao = $("#campoConstituicao").val();
    inteligencia = $("#campoInteligencia").val();
    sabedoria = $("#campoSabedoria").val();
    carisma = $("#campoCarisma").val();
    historia = $("#campoHistoria").val();

    foto = $("#campoFoto").val();

    // Conversão dos dados em Json
    var dados = JSON.stringify({ nome: nome, raca: raca, classe: classe, nivel: nivel,
                                forca: forca, destreza: destreza, constituicao: constituicao,
                                inteligencia: inteligencia, sabedoria: sabedoria,
                                carisma: carisma, historia: historia, foto: foto});

    // Requisição ao Back-End
    $.ajax({
        url: 'http://localhost:5000/registrar_personagem',
        type: 'POST', dataType: 'json', 
        contentType: 'application/json', data: dados, 
        success: pessoaIncluida, 
        error: erroAoIncluir
    });

    function personagemRegistrado (retorno) {
        if (retorno.resultado == "ok") {

            //Alert caso sucesso
            alert("Personagem registrado com sucesso!");

            //Limpa os dados do form
            $("#campoNome").val("");
            $("#campoRaca").val("");
            $("#campoNivel").val("");
            $("#campoForca").val("");
            $("#campoDestreza").val("");
            $("#campoConstituicao").val("");
            $("#campoInteligencia").val("");
            $("#campoSabedoria").val("");
            $("#campoCarisma").val("");
            $("#campoHistoria").val("");
            $("#campoFoto").val("");


        } else {

            //Alert caso falha
            alert(retorno.resultado + ":" + retorno.detalhes);
        }            
    }
    function erroAoIncluir (retorno) {
        // Informa mensagem de erro
        alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
    }
});
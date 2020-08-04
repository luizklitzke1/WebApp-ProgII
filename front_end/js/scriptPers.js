$(function() { // quando o documento estiver pronto/carregado
    
    // função para exibir pessoas na tabela
    function exibir_personagens() {
        $.ajax({
            url: 'http://localhost:5000/listar_personagens',
            method: 'GET',
            dataType: 'json',
            success: listar, 
            error: function() {
            alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar (personagens) {
            // Limpa a tabela
            $('#corpoTabelaPersonagens').empty();
        
            // Percorre a lista
            for (var i in personagens) { 
                lin = '<tr>' +
                '<td>' + personagens[i].nome + '</td>' + 
                '<td>' + personagens[i].email + '</td>' + 
                '<td>' + personagens[i].telefone + '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaPersonagens').append(lin);
            }
        }
    }


    // código para mapear o click do link Listar
    $(document).on("click", "#linkListarPers", function() {
        exibir_personagens();
    });



    // Código para inclusão de personagens
    $(document).on("click", "#btIncluirPersonagem", function() {
        //pegar dados da tela
        console.log("Registrando...")
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


        var dados = JSON.stringify({ nome: nome, raca: raca, classe: classe,
                                    nivel: nivel, forca: forca, destreza: destreza,
                                    constituicao: constituicao, inteligencia: inteligencia, sabedoria: sabedoria,
                                    carisma: carisma, historia: historia, foto: foto});

        // Enivo dos dados ao back-end para a inclusão
        $.ajax({
            url: 'http://localhost:5000/registrar_personagem',
            type: 'POST',
            dataType: 'json', contentType: 'application/json',
            data: dados, 
            success: pessoaIncluida, 
            error: erroAoIncluir

        });
        function pessoaIncluida (retorno) {
            if (retorno.resultado == "ok") { 
                alert("Personagem " + nome + "registrado com sucesso!");
                // limpar os campos
                $("#campoNome").val("");
                $("#campoRaca").val("");
                $("#campoClasse").val("");
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
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });


    // código a ser executado quando a janela de inclusão de pessoas for fechada
    $('#modalIncluirPessoa').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#tabelaPessoas").hasClass('invisible')) {
            // atualizar a página de listagem
            exibir_personagens();
        }
    });

    //Chama listagem caso esteja na página com a tabela
    if($("#corpoTabelaPersonagens").length){
        exibir_personagens()
    }; 

    
});

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#test')
          .attr('src', e.target.result)
          .width(200)
          .height(200);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
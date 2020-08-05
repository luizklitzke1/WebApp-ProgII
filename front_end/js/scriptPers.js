$(function() { // quando o documento estiver pronto/carregado

    function exibir_dados_pers(id){

    }

    // função para exibir pessoas na tabela
    function exibir_personagens() {
        $.ajax({
            url: 'http://localhost:5000/listar_personagens',
            method: 'GET',
            dataType: 'json',
            success: listar, 
            error: function() {
            alert("Erro ao ler dados, verifique o backend");
            }
        });

        function listar (personagens) {
            // Limpa a tabela
            $('#cards').empty();
        
            // Percorre a lista
            for (var i in personagens) { 
                lin = '<tr>' +
                '<td>' + personagens[i].nome + '</td>' + 
                '<td>' + personagens[i].email + '</td>' + 
                '<td>' + personagens[i].telefone + '</td>' + 
                '</tr>';

                //Cria o  HTML de um Card custom para os dados do personagem
                card = 
                "<card class='content-section col-md-4 mb-4 pr-0 m-1 pl-3 pr-3 personagem1' style='max-width: 340px; min-width: 310px; text-align: center;' >" +
                    "<div class='media-body'>" +
                        "<div class='article-metadata'>" +
                            "<span >Raça: " + personagens[i].raca + "</span>" + 
                            "<small class='text-muted ml-1'>Classe: " + personagens[i].classe + "</small>" + 
                        "</div>" +
                        "<h2> <a class='article-title' href='#'>" + personagens[i].nome + "</a> </h2>" +
                        "<p class='article-content'>Nível: " + personagens[i].nivel + "</p>" +
                        "<img class='account-img' src='../static/imagens_personagens/" + personagens[i].foto +".png' >" + 
                    "</div>" + 
                    
                    " <div class='container mt-4'> "+
                        "<div class='row p-0 text-center'>" +
                            "<div class='col' >" +
                                 "<span class='col mr-3 pl-4 vermelho fonte_mec'>Força</span>" + personagens[i].forca +
                           "</div>" +
                            "<div class='col'> "+
                            "<span class='col vermelho fonte_mec'>Destreza</span>" + personagens[i].destreza +
                            "</div>"+
                            "<div class='col'>" +
                            "<span class='col vermelho fonte_mec'>Const</span> "+ personagens[i].constituicao +
                            "</div> <div class='col'> <span class='col vermelho fonte_mec'>Inte</span>" + personagens[i].inteligencia +
                            "</div>" +
                            "<div class='col'> <span class='col vermelho fonte_mec'>Sabedoria</span>" + personagens[i].sabedoria +
                            "</div> <div class='col'> <span class='col vermelho fonte_mec'>Carisma</span>" + personagens[i].carisma +
                            "</span> </div> </div>"+
                    "<br><small class='text-muted'>Criado em: " + personagens[i].data_criacao + "</small>" +
                    "<div>" +
                    "<button class='btn btn-danger float-right mt-3' onClick='apagarPers(" + personagens[i].id + ");'>Apagar </button>"+
                    "</div>"+
                "</card>"

                console.log(personagens[i].nome,personagens[i].nivel)
            
                // adiciona a linha no corpo da tabela
                $('#cards').append(card);
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
    
        foto = $("#campoImagem").val();


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
                alert("Personagem " + nome + " registrado com sucesso!");
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
    if($("#cards").length){
        exibir_personagens()
    }; 

    
});

function apagarPers(id){
    $.ajax({
        url: 'http://localhost:5000/apagar_pers',
        type: 'POST',
        dataType: 'json', contentType: 'application/json',
        data: JSON.stringify({ id: id}), 
        success: function (result) {
          alert("Personagem apagado com sucesso!")
          document.location.reload(true);
      },
      error: function (error) {
          alert("Algo de errado aconteceu...");
      }
    })
    
};

function verPers(id){
    $.ajax({
        url: 'http://localhost:5000/personagem',
        type: 'POST',
        dataType: 'json', contentType: 'application/json',
        data: JSON.stringify({ id: id }), 
        success: function (result) {
          alert("Personagem apagado com sucesso!")
          document.location.reload(true);
      },
      error: function (error) {
          alert("Algo de errado aconteceu...");
      }
    })
    
};

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


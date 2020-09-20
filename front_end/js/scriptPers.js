$(function() { // quando o documento estiver pronto/carregado


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
            for (personagem of personagens) { 

                //Cria o  HTML de um Card custom para os dados do personagem

                card = 
                "<card class='content-section col-md-4 mb-4 pr-0 m-1 pl-3 pr-3 personagem1 animated slideInUp' style='max-width: 340px; min-width: 310px; text-align: center;' id='card_"+ personagem.id+ "'> " +
                    "<div class='media-body'>" +
                        "<div class='article-metadata'>" +
                            "<span >Raça: " + personagem.raca + "</span>" + 
                            "<small class='text-muted ml-1'>Classe: " + personagem.classe + "</small>" + 
                        "</div>" +
                        "<h2> <a class='article-title' href='#'>" + personagem.nome + "</a> </h2>" +
                        "<p class='article-content'>Nível: " + personagem.nivel + "</p>" +
                        "<img class='account-img' src='../static/imagens_personagens/" + personagem.foto +".png' >" + 
                    "</div>" + 
                    
                    " <div class='container mt-4'> "+
                        "<div class='row p-0 text-center'>" +
                            "<div class='col' >" +
                                 "<span class='col mr-3 pl-4 vermelho fonte_mec'>Força</span>" + personagem.forca +
                           "</div>" +
                            "<div class='col'> "+
                            "<span class='col vermelho fonte_mec'>Destreza</span>" + personagem.destreza +
                            "</div>"+
                            "<div class='col'>" +
                            "<span class='col vermelho fonte_mec'>Const</span> "+ personagem.constituicao +
                            "</div> <div class='col'> <span class='col vermelho fonte_mec'>Inte</span>" + personagem.inteligencia +
                            "</div>" +
                            "<div class='col'> <span class='col vermelho fonte_mec'>Sabedoria</span>" + personagem.sabedoria +
                            "</div> <div class='col'> <span class='col vermelho fonte_mec'>Carisma</span>" + personagem.carisma +
                            "</span> </div> </div>"+
                    "<br><small class='text-muted'>Criado em: " + personagem.data_criacao + "</small>" +
                    "<div>" +
                    "<button type='button' class='btn btn-mec btn-danger btn-m p-2 float-right' data-toggle='modal' data-target='#DeleteModal"+ personagem.id + "'>Apagar</button>"+
                    "<button type='button' class='btn btn-mec btn-info btn-m p-2 float-left'  data-toggle='modal' data-target='#DeleteModal"+ personagem.id + "'>Editar</button>"+
                    "</div>"+
                "</card>"
                // Modal para apagar o personagem //
                modal = 
                "<div class='modal fade ' id='DeleteModal" + personagem.id + "' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>"+
                "<div class='modal-dialog modal-m modal-notify modal-danger modal-bg' role='document'>"+

                    "<div class='modal-content text-center'>"+
                    "<div class='modal-header d-flex justify-content-center'>"+
                        "<p class='heading'>Apagar personagem</p>"+
                    "</div>"+

                    "<div class='modal-body'>"+
                        "<p class='p2'>Você tem certeza que deseja o personagem</p>"+
                        "<spam class='h3 vermelho fonte_mec'>"+personagem.nome+"</span> <span style='color: white; font-weight: normal'>?</span>"+
                    "</div>"+

                    "<div class='modal-footer flex-center'>"+
                        "<p class='p-2 m-2'>Uma vez apagado, esse personagem não podera mais ser recuperado!</p>"+
                        "<button type='button' class='btn btn-outline-danger' onClick='apagarPers(" + personagem.id + ");'>Apagar </button>"+
                        "<a type='button' class='btn  btn-danger waves-effect' data-dismiss='modal'>Não</a>"+
                    "</div>"+
                    "</div>"+
                "</div>"+
                "</div>"

                console.log(personagem.nome,personagem.nivel);
            
                // adiciona a linha no corpo da tabela
                $('#cards').append(card);
                $('#modals').append(modal);
            }
        }

    }
    
    // Código para inclusão de personagens
    $(document).on("click", "#btIncluirPersonagem", function() {
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


    //Chama listagem caso esteja na página com a tabela
    if($("#cards").length){
        exibir_personagens()
    }; 

    // Código para pesquisa de personagens
    $(document).on("click", "#btnProcurarPers", function() {
        nome = $("#campoNome").val();
        raca = $("#campoRaca").val();
        classe = $("#campoClasse").val();
        procurarPers(nome,raca,classe);

    });
    
});

//Apagar o personagem do BD baseado no ID
function apagarPers(id_pers){
    $.ajax({
        url: 'http://localhost:5000/apagar_pers/'+id_pers,
        type: 'DELETE',
        dataType: 'json', contentType: 'application/json',
        data: JSON.stringify({ id_pers: id_pers}), 
        success: function(retorno){
            if (retorno.resultado == "ok") {
                $("#card_" + id_pers).fadeOut(1000, function(){ 
                alert("Personagem removido com sucesso!"); 
            });
        }
            else {
                alert(retorno.resultado + " : " + retorno.detalhes);
            }
        },
        error: function (error){
            alert("Ocorreu um erro ao apagar esse personagem!");
        }
    })
};




//Função para pre-render da img do personagem no registro
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


//--  [WIP] -- Mostrar os dados de um personagem em uma página específica 
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

//-- [WIP] -- Procurar o personagem no BD com dados informados
function procurarPers(nome,raca,classe){
    //Envia os dados para pesquisa
    $.ajax({
        url: 'http://localhost:5000/procurar_pers',
        type: 'POST',
        dataType: 'json', contentType: 'application/json',
        data: JSON.stringify({ nome: nome, raca: raca, classe: classe}), 
        error: function (error) {
          alert("Algo de errado aconteceu...");
      }
    });
    
};

//Obs: Algumas funções estão fora dessa chamada inicial do documento devido a natureza de suas chamadas !

$(function() { // quando o documento estiver pronto/carregado


    // Exibir personagens registrados
    function exibir_personagens() {
        $.ajax({
            url: 'http://localhost:5000/listar_personagens',
            method: 'GET',
            dataType: 'json',
            success: listar_pers, 
            error: function() {
            alert("Erro ao ler dados, verifique o backend!");
            }
        });

        function listar_pers (personagens) {
            // Limpa a div com as cards
            $('#cards_pers').empty();
        
            // Percorre a lista recebida
            for (personagem of personagens) { 

                //Cria o  HTML de um Card custom para os dados do personagem
                card = 
                "<card class='content-section col-md-4 mb-4 pr-0 m-1 pl-3 pr-3 personagem1 animated slideInUp' style='max-width: 340px; min-width: 310px; text-align: center;' id='card_"+ personagem.id_pers+ "'> " +
                    "<div class='media-body'>" +
                        "<div class='article-metadata'>" +
                            "<span >Raça: " + personagem.raca + "</span>" + 
                            "<small class='text-muted ml-1'>Classe: " + personagem.classe + "</small>" + 
                        "</div>" +
                        "<h2> <a class='article-title' href='../templates/personagem.html?pers_id="+personagem.id_pers+"'>" + personagem.nome + "</a> </h2>" +
                        "<p class='article-content'>Nível: " + personagem.nivel + "</p>" +
                        "<a class='article-title' href='../templates/personagem.html?pers_id="+personagem.id_pers+"'>"+
                            "<img class='account-img' src='../static/imagens_personagens/" + personagem.foto +"' ></a>" + 
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
                    "<button type='button' class='btn btn-mec btn-danger btn-m p-2 float-right' data-toggle='modal' data-target='#DeleteModal"+ personagem.id_pers + "'>Apagar</button>"+
                    "<a href = '../templates/editar_personagem.html?pers_id="+personagem.id_pers+"'><button type='button' class='btn btn-mec btn-info btn-m p-2 float-left'  data-toggle='modal'>Editar</button></a>"+
                    "</div>"+
                "</card>";

                // Modal separado para apagar o personagem 
                // Mais fácil do que ficar mudando com cada clique, e remover, como feito no esp.
                modal = 
                "<div class='modal fade ' id='DeleteModal" + personagem.id_pers + "' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>"+
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
                        "<p class='p-2 m-2'>Uma vez apagado, esse personagem não poderá mais ser recuperado!</p>"+
                        "<button type='button' class='btn btn-outline-danger' data-dismiss='modal' onClick='apagarPers(" + personagem.id_pers + ");'>Apagar </button>"+
                        "<a type='button' class='btn  btn-danger waves-effect' data-dismiss='modal'>Não</a>"+
                    "</div>"+
                    "</div>"+
                "</div>"+
                "</div>"
            
                // Adiciona a card e o modal
                $('#cards_pers').append(card);
                $('#modals').append(modal);
            }
        }

    };
    

    //Chama listagem caso esteja na página 
    if($("#cards_pers").length){
        exibir_personagens();

    }; 


    // Exibir aventuras registrados
    function exibir_aventuras() {
        $.ajax({
            url: 'http://localhost:5000/listar_aventuras',
            method: 'GET',
            dataType: 'json',
            success: listar_aventuras, 
            error: function() {
            alert("Erro ao ler dados, verifique o backend!");
            }
    });

        function listar_aventuras (aventuras) {
            // Limpa a div com as cards
            $('#cards_advs').empty();
        
            // Percorre a lista recebida
            for (aventura of aventuras) { 

                //Cria o  HTML de um Card custom para os dados do personagem
                card = 
                "<card class='content-section col-md-4 mb-4 pr-0 m-1 pl-3 pr-3 personagem1 animated slideInUp' style='max-width: 340px; min-width: 310px; text-align: center;' id='card_adv_"+ aventura.id_avent+ "'> " +
                    "<div class='media-body'>" +
                        "<h2> <a class='article-title' href='../templates/aventura.html?id_avent="+aventura.id_avent+"'>" + aventura.nome + "</a> </h2>" +
                        "<a class='article-title' href='../templates/aventura.html?id_avent="+aventura.id_avent+"'>"+
                            "<img class='account-img' src='../static/imagens_aventuras/" + aventura.foto +"' ></a>" + 
                    "</div>" + 
                    "<div class='article-metadata'>" +
                                "<span > Temática: " + aventura.tematica + "</span> <br>" + 
                                "<small class='text-muted ml-1'>Nome do mestre: " + aventura.nome_mestre + "</small>" + 
                            "</div>" +
                    
                    " <div class='container mt-4'> "+
                    "<br><small class='text-muted'>Criada em: " + personagem.data_criacao + "</small>" +
                    "<div>" +
                    "<button type='button' class='btn btn-mec btn-danger btn-m p-2 float-right' data-toggle='modal' data-target='#DeleteModalAdv"+ aventura.id_avent + "'>Apagar</button>"+
                    "<a href = '../templates/editar_aventura.html?adv_id="+aventura.id_avent+"'><button type='button' class='btn btn-mec btn-info btn-m p-2 float-left'  data-toggle='modal'>Editar</button></a>"+
                    "</div>"+
                "</card>";

                // Modal separado para apagar aaventura 
                // Mais fácil do que ficar mudando com cada clique, e remover, como feito no esp.
                modal = 
                "<div class='modal fade ' id='DeleteModalAdv" + aventura.id_avent + "' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>"+
                "<div class='modal-dialog modal-m modal-notify modal-danger modal-bg' role='document'>"+

                    "<div class='modal-content text-center'>"+
                    "<div class='modal-header d-flex justify-content-center'>"+
                        "<p class='heading'>Apagar aventura</p>"+
                    "</div>"+

                    "<div class='modal-body'>"+
                        "<p class='p2'>Você tem certeza que deseja a aventura</p>"+
                        "<spam class='h3 vermelho fonte_mec'>"+aventura.nome+"</span> <span style='color: white; font-weight: normal'>?</span>"+
                    "</div>"+

                    "<div class='modal-footer flex-center'>"+
                        "<p class='p-2 m-2'>Uma vez apagado, essa aventura não poderá mais ser recuperada!</p>"+
                        "<button type='button' class='btn btn-outline-danger' data-dismiss='modal' onClick='apagarAdv(" + aventura.id_avent + ");'>Apagar </button>"+
                        "<a type='button' class='btn  btn-danger waves-effect' data-dismiss='modal'>Não</a>"+
                    "</div>"+
                    "</div>"+
                "</div>"+
                "</div>"
            
                // Adiciona a card e o modal
                $('#cards_adv').append(card);
                $('#modals').append(modal);
            }
        }

        };


    //Chama listagem caso esteja na página 
    if($("#cards_adv").length){
        exibir_aventuras()
    }; 


});
// Código para inclusão de personagens
// Com execução asincrona devído a um call de await da img
const registrar_pers = async() =>  {

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

    //Verifica se alguma imagem foi enviada
    var img_file = document.getElementById("campoImagem").files[0];
    if (img_file != undefined){
        //Converte o BLOB em Base64 para passar por Json 
        foto = await readFile(img_file);
    }
    else{
        foto = null;
    };

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
        success: personagemIncluido, 
        error: erroAoIncluir

    });
    function personagemIncluido (retorno) {
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

            //Limpa o campo e preview da img
            $("#campoImagem").val("");
            $('#img_pers')
            .attr('src', " ")
            .width(0)
            .height(0);

            
        } 
        else {
            // informar mensagem de erro
            alert(retorno.resultado + ":" + retorno.detalhes);
        };            
    };
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        };
};


// Código para a edição de um personagem
// Também execução asincrona devido a conversão de img
const  editar_pers = async() =>  { 


    //Pega o ID pelo link 
    let pers_id = document.location.search.replace(/^.*?\=/,'');
    
    //Pegar os dados dos campos
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


    //Manter a mesma imagem caso nenhuma nova seja informada
    var img_file = document.getElementById("campoImagem").files[0];
    if (img_file != undefined){
        //Processamento da img informada para Base64
        foto = await readFile(img_file);
    }
    else{
        foto = null;
    };

    var dados = JSON.stringify({ nome: nome, raca: raca, classe: classe,
                                nivel: nivel, forca: forca, destreza: destreza,
                                constituicao: constituicao, inteligencia: inteligencia, sabedoria: sabedoria,
                                carisma: carisma, historia: historia, foto: foto});

    // Enivo dos dados ao back-end para a inclusão
    $.ajax({
        url: 'http://localhost:5000/editar_personagem/'+pers_id,
        type: 'POST',
        dataType: 'json', contentType: 'application/json',
        data: dados, 
        success: function(){
            alert("Personagem editado com sucesso!");
        }, 
        error: function(){
            alert("Ocorreu um erro ao editar esse personagem!");
        }, 
    });
    
};


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
                $("#DeleteModal" + id_pers).remove();
                alert("Personagem removido com sucesso!"); 
                
            });
            //Redireciona para a home caso o pers seja apagado em pag esp
            if ($("#DeleteModal").length){
                window.location.href = "index.html";
                alert("Personagem removido com sucesso!\nConfirme para voltar para a Home..."); 
            }
            
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


//Editar o personagem baseado no ID
function dados_pers(tipo){
    //Pega o ID através do link
    let pers_id = document.location.search.replace(/^.*?\=/,'');
    $.ajax({
        url: 'http://localhost:5000/dados_pers/'+pers_id,
        method: 'GET',
        dataType: 'json',
        success: function(resposta){
            //Verifica se deseja editar ou visualizar na página específica
            //Feito com um teste de tipo para facilitar callbacks e evitar muitas async
            if (resposta.resultado == "erro"){
                alert("Personagem não encontrado! \nConfirme para voltar para a Home...");
                window.location.href = "index.html";
            }
            else if (tipo == "edit"){
                povoar_campos_pers(resposta);
            }
            else if (tipo == "delete_esp"){
                $("#pers_nome").text(resposta.nome);
            }
            else{
                mostrar_especifico(resposta);
            };
        },
        error: function() {
            alert("Erro ao receber os dados do personagem, verifique o backend!");
        }
    });
  
};

//Mostras os dados de um pers especifico em uma pag
function mostrar_especifico(personagem){

    //Adiciona o nome ao title da pag
    document.title += (" " + personagem.nome);

    $("#nome").text(personagem.nome);
    $("#raca").text(personagem.raca);
    $("#classe").text(personagem.classe);
    $("#nivel").text(personagem.nivel);

    $("#forca").text(personagem.forca);
    $("#destreza").text(personagem.destreza);
    $("#constituicao").text(personagem.constituicao);
    $("#inteligencia").text(personagem.inteligencia);
    $("#sabedoria").text(personagem.sabedoria);
    $("#carisma").text(personagem.carisma);

    $("#historia").text(personagem.historia);

    $("#img_pers").attr("src","../static/imagens_personagens/"+personagem.foto);
    $("#datacriacao").text(personagem.data_criacao);

    //Adicionar ID ao botão de edit
    $("#edit_btn").attr("href",("../templates/editar_personagem.html?pers_id="+personagem.id_pers));
    
};

//Povoar os campos de um form com dados do personagem
function povoar_campos_pers(personagem){
    $("#campoNome").val(personagem.nome);
    $("#campoRaca").val(personagem.raca);
    $("#campoClasse").val(personagem.classe);
    $("#campoNivel").val(personagem.nivel);
    $("#campoForca").val(personagem.forca);
    $("#campoDestreza").val(personagem.destreza);
    $("#campoConstituicao").val(personagem.constituicao);
    $("#campoInteligencia").val(personagem.inteligencia);
    $("#campoSabedoria").val(personagem.sabedoria);
    $("#campoCarisma").val(personagem.carisma);
    $("#campoHistoria").val(personagem.historia);

    $("#img_pers").attr("src","../static/imagens_personagens/"+personagem.foto);
    
};

//Adicionar os dados de delete do personagem em sua página esp
function apagarEsp() {
    //Pega o ID através do link
    let pers_id = document.location.search.replace(/^.*?\=/,'');

    //Pega o personagem em si e muda o nome no modal
    dados_pers("delete_esp");
    //Adiciona a função ao botão do modal
    document.getElementById("btn_delete").setAttribute( "onClick", ("apagarPers("+pers_id+");"));

};

//Função para pre-render da img do personagem no registro
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#img_pers')
          .attr('src', e.target.result)
          .width(200)
          .height(200);
      };
      reader.readAsDataURL(input.files[0]);
    }
};


//Ler a imagem adicionada pelo usuário e converter em base64
async function readFile(file_img) {

    return new Promise((resolve, reject) => {
        reader = new FileReader();

        reader.onload = () => {
            let base64 = (reader.result.split(",")[1]);
            resolve(base64);
        };

        reader.readAsDataURL(file_img);
    
    });

};


// Código para inclusão de aventuras
// Com execução asincrona devído a um call de await da img
const registrar_adv = async() =>  {

    nome = $("#campoNome").val();
    nome_mestre = $("#campoNomeMestre").val();
    tematica = $("#campoTematica").val();
    resumo = $("#campoResumo").val();

    //Verifica se alguma imagem foi enviada
    var img_file = document.getElementById("campoImagem").files[0];
    if (img_file != undefined){
        //Converte o BLOB em Base64 para passar por Json 
        foto = await readFile(img_file);
    }
    else{
        foto = null;
    };

    var dados = JSON.stringify({ nome: nome, nome_mestre: nome_mestre, 
                                 tematica: tematica,  resumo: resumo, foto: foto});

    // Enivo dos dados ao back-end para a inclusão
    $.ajax({
        url: 'http://localhost:5000/registrar_aventura',
        type: 'POST',
        dataType: 'json', contentType: 'application/json',
        data: dados, 
        success: aventuraIncluida, 
        error: erroAoIncluir

    });
    function aventuraIncluida (retorno) {
        if (retorno.resultado == "ok") { 
            alert("Aventura " + nome + " registrada com sucesso!");
            // Limpar os campos
            $("#campoNome").val("");
            $("#campoNomeMestre").val("");
            $("#campoTematica").val("");
            $("#campoResumo").val("");

            //Limpa o campo e preview da img
            $("#campoImagem").val("");
            $('#img_pers')
            .attr('src', " ")
            .width(0)
            .height(0);

        } 
        else {
            // informar mensagem de erro
            alert(retorno.resultado + ":" + retorno.detalhes);
        };            
    };
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        };
};


//Apagar a aventura do BD baseado no ID
function apagarAdv(id_avent){
    $.ajax({
        url: 'http://localhost:5000/apagar_adv/'+id_avent,
        type: 'DELETE',
        dataType: 'json', contentType: 'application/json',
        data: JSON.stringify({ id_avent: id_avent}), 
        success: function(retorno){
            if (retorno.resultado == "ok") {
                alert($("#card_adv_" + id_avent));
                $("#card_adv_" + id_avent).fadeOut(1000, function(){ 
                $("#DeleteModalAdv" + id_avent).remove();
                alert("Aventura removida com sucesso!"); 
                
            });
            //Redireciona para a home caso a adv seja apagada em pag esp
            if ($("#DeleteModalAdv").length){
                window.location.href = "index.html";
                alert("Aventura removida com sucesso!\nConfirme para voltar para a Home..."); 
            }
            
        }
            else {
                alert(retorno.resultado + " : " + retorno.detalhes);
            }
        },
        error: function (error){
            alert("Ocorreu um erro ao apagar essa aventura!");
        }
    })
};


//Editar a aventura baseado no ID
function dados_adv(tipo){
    //Pega o ID através do link
    let adv_id = document.location.search.replace(/^.*?\=/,'');
    $.ajax({
        url: 'http://localhost:5000/dados_adv/'+adv_id,
        method: 'GET',
        dataType: 'json',
        success: function(resposta){
            //Verifica se deseja editar ou visualizar na página específica
            //Feito com um teste de tipo para facilitar callbacks e evitar muitas async
            if (resposta.resultado == "erro"){
                alert("Aventura não encontrado! \nConfirme para voltar para a Home...");
                window.location.href = "index.html";
            }
            else if (tipo == "edit"){
                povoar_campos_adv(resposta);
            }
            else if (tipo == "delete_esp"){
                $("#adv_nome").text(resposta.nome);
            }
            else{
                mostrar_especifico_adv(resposta);
            };
        },
        error: function() {
            alert("Erro ao receber os dados da aventura, verifique o backend!");
        }
    });
  
};

//Mostras os dados de um pers especifico em uma pag
function mostrar_especifico_adv(aventura){

    //Adiciona o nome ao title da pag
    document.title += (" " + aventura.nome);

    $("#nome").text(aventura.nome);
    $("#nome_mestre").text(aventura.nome_mestre);
    $("#tematica").text(aventura.tematica);

    $("#resumo").text(aventura.resumo);

    $("#img_adv").attr("src","../static/imagens_aventuras/"+aventura.foto);
    $("#datacriacao").text(aventura.data_criacao);

    //Adicionar ID ao botão de edit
    $("#edit_btn").attr("href",("../templates/editar_aventura.html?adv_id="+aventura.id_avent));
    
};

//Povoar os campos de um form com dados do personagem
function povoar_campos_adv(aventura){
    $("#campoNome").val(aventura.nome);
    $("#campoNomeMestre").val(aventura.nome_mestre);
    $("#campoTematica").val(aventura.tematica);

    $("#campoResumo").val(aventura.resumo);

    $("#img_adv").attr("src","../static/imagens_aventuras/"+aventura.foto);
    $("#datacriacao").text(aventura.data_criacao);
    
};

//Adicionar os dados de delete do personagem em sua página esp
function apagarEsp_adv() {
    //Pega o ID através do link
    let adv_id = document.location.search.replace(/^.*?\=/,'');

    //Pega a aventura em si e muda o nome no modal
    dados_adv("delete_esp");
    //Adiciona a função ao botão do modal
    document.getElementById("btn_delete").setAttribute( "onClick", ("apagarAdv("+adv_id+");"));

};

  
// Código para a edição de uma aventura
// Também execução asincrona devido a conversão de img
const  editar_adv = async() =>  { 


    //Pega o ID pelo link 
    let adv_id = document.location.search.replace(/^.*?\=/,'');
    
    //Pegar os dados dos campos
    nome = $("#campoNome").val();
    nome_mestre = $("#campoNomeMestre").val();
    tematica = $("#campoTematica").val();
    resumo = $("#campoResumo").val();

    //Manter a mesma imagem caso nenhuma nova seja informada
    var img_file = document.getElementById("campoImagem").files[0];
    if (img_file != undefined){
        //Processamento da img informada para Base64
        foto = await readFile(img_file);
    }
    else{
        foto = null;
    };

    var dados = JSON.stringify({ nome: nome, nome_mestre: nome_mestre,
                                 tematica: tematica, resumo: resumo, 
                                 foto: foto});

    // Enivo dos dados ao back-end para a inclusão
    $.ajax({
        url: 'http://localhost:5000/editar_aventura/'+adv_id,
        type: 'POST',
        dataType: 'json', contentType: 'application/json',
        data: dados, 
        success: function(){
            alert("Aventura editada com sucesso!");
        }, 
        error: function(){
            alert("Ocorreu um erro ao editar essa aventura!");
        }, 
    });
    
};

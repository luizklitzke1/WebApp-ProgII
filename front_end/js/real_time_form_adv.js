//Script para declaração e controle da validação dos forumários em tempo real

    //Variável que garante que todos os campos sejam válidos 
    var formValid = {
        nome : false,
        nome_mestre : false,
        tematica : false,
    };

     
    //Torna todos os valores válidos caso estiver apenas editando
    if ($("#form_editar").length){
        formValid = { 
            nome : true,
            nome_mestre : true,
            tematica : true,
        };
        checkForm();
    }

    

    //Verifica se todos os campos estão válidos
    function checkForm(){

        var check = true;

        $.each(formValid, function(index, element) {
            if (!element){
                check = false;
            };
        });

        //Fora do loop para evitar problemas com sync 
        if (check){
            $('#btIncluirAventura').removeAttr('disabled');
            return true;
        }
        else{
            $('#btIncluirAventura').attr('disabled', true);
            return false;
        }
        
        };
    
    //Muda a mensagem de erro nos inputs
    function msg(id,message){
        $(id).text(message).show;
    }

    //Mostra a div com a msg
    function show(id){
        $(id).show();
    }

    //Padrão de verificação dos caracteres de texto
    //var textEsp = new RegExp(/^[a-zA-Z0-9]+$/);

    //Verificação customizada do nome
    $("#campoNome").on('input', function() {
        var input= $(this);
 
        if (input.val().length <3){
            msg("#inv-nome","O nome deve ter no mínimo 3 caracteres!");
            formValid["nome"] = false;
        }
        else {
            formValid["nome"] = true;
        }   

        if (formValid["nome"]){
            $("#inv-nome").hide();
            input.removeClass("invalid").addClass("valid");
        }
        else{
            show("#inv-nome");
            input.removeClass("valid").addClass("invalid");
            
        };
        checkForm();
       
    });

    //Verificação customizada do nome do mestre
    $("#campoNomeMestre").on('input', function() {
        var input= $(this); 
        if (input.val().length <3){
            msg("#inv-nome_mestre","O nome do mestre deve ter no mínimo 3 caracteres!");
            formValid["nome_mestre"] = false;
        }
        else {
            formValid["nome_mestre"] = true;
        }   

        if (formValid["nome_mestre"]){
            $("#inv-nome_mestre").hide();
            input.removeClass("invalid").addClass("valid");

        }
        else{
            show("#inv-nome_mestre");
            input.removeClass("valid").addClass("invalid");
            
        };
        checkForm();
       
    });

    //Verificação customizada da temática
    $("#campoTematica").on('input', function() {
        var input= $(this);  
        if (input.val().length <3){
            msg("#inv-tematica","A temática deve ter no mínimo 3 caracteres!");
            formValid["tematica"] = false;
        }
        else {
            formValid["tematica"] = true;
        }   

        if (formValid["tematica"]){
            $("#inv-tematica").hide();
            input.removeClass("invalid").addClass("valid");

        }
        else{
            show("#inv-tematica");
            input.removeClass("valid").addClass("invalid");
            
        };
        checkForm();
       
    });


    //Padrão de verificação dos caracteres de texto para o resumo
    //Desativado por problemas com UTF-8
    //var textEspHist = new RegExp(/^[\p{L}a-zA-Z0-9-!?"'/,. ]+$/);



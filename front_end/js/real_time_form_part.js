//Script para declaração e controle da validação dos forumários em tempo real

    //Variável que garante que todos os campos sejam válidos 
    var formValid = {
        nome_jogador : false,
        pers_id : false,
    };
   

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
            $('#btIncluirPart').removeAttr('disabled');
            return true;
        }
        else{
            $('#btIncluirPart').attr('disabled', true);
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

    //Verificação customizada do nome do jogador
    $("#campoNome").on('input', function() {
        var input= $(this);
 
        if (input.val().length <3){
            msg("#inv-nome_jogador","O nome do jogador deve ter no mínimo 3 caracteres!");
            formValid["nome_jogador"] = false;
        }
        else {
            formValid["nome_jogador"] = true;
        }   

        if (formValid["nome_jogador"]){
            $("#inv-nome_jogador").hide();
            input.removeClass("invalid").addClass("valid");
        }
        else{
            show("#inv-nome_jogador");
            input.removeClass("valid").addClass("invalid");
            
        };
        checkForm();
       
    });


    //Padrão de teste e respostas para os valores inteiros
    var testeNums = new RegExp(/^[\p{L}a-zA-Z1-9]+$/);
    var txt_ints = new String("O valor deve ser inteiro e maior que 1!");

    //Verificação customizada do id do personagem
    //Verificação customizada do nível
    $("#campoIDPers").on('input', function() {
        var input= $(this);
        if (!(testeNums.test(input.val())) || (input.val()>99)){
            
            msg("#inv-idpers", txt_ints);
            formValid["pers_id"] = false;
            input.removeClass("valid").addClass("invalid");
            show("#inv-idpers");
        }   
        else {
            formValid["pers_id"] = true;
            $("#inv-idpers").hide();
            input.removeClass("invalid").addClass("valid");
        }   
        checkForm();
    });



    //Padrão de verificação dos caracteres de texto para o resumo
    //Desativado por problemas com UTF-8
    //var textEspHist = new RegExp(/^[\p{L}a-zA-Z0-9-!?"'/,. ]+$/);



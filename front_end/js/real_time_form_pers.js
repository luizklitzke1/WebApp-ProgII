//Script para declaração e controle da validação dos forumários em tempo real

    //Variável que garante que todos os campos sejam válidos 
    var formValid = {
        nome : false,
        raca: false,
        classe : false,
        nivel : false,
        forca : false,
        destreza : false,
        constituicao : false,
        inteligencia : false,
        sabedoria : false,
        carisma : false,
        historia : true,
    };
    
    //Torna todos os valores válidos caso estiver apenas editando
    if ($("#form_editar").length){
        formValid = { 
            nome : true,
            raca: true,
            classe : true,
            nivel : true,
            forca : true,
            destreza : true,
            constituicao : true,
            inteligencia : true,
            sabedoria : true,
            carisma : true,
            historia : true,
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
            $('#btIncluirPersonagem').removeAttr('disabled');
            return true;
        }
        else{
            $('#btIncluirPersonagem').attr('disabled', true);
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

    //Verificação customizada da raça
    $("#campoRaca").on('input', function() {
        var input= $(this); 
        if (input.val().length <3){
            msg("#inv-raca","A raça deve ter no mínimo 3 caracteres!");
            formValid["raca"] = false;
        }
        else {
            formValid["raca"] = true;
        }   

        if (formValid["raca"]){
            $("#inv-raca").hide();
            input.removeClass("invalid").addClass("valid");

        }
        else{
            show("#inv-raca");
            input.removeClass("valid").addClass("invalid");
            
        };
        checkForm();
       
    });

    //Verificação customizada da classe
    $("#campoClasse").on('input', function() {
        var input= $(this);  
        if (input.val().length <3){
            msg("#inv-classe","A classe deve ter no mínimo 3 caracteres!");
            formValid["classe"] = false;
        }
        else {
            formValid["classe"] = true;
        }   

        if (formValid["classe"]){
            $("#inv-classe").hide();
            input.removeClass("invalid").addClass("valid");

        }
        else{
            show("#inv-classe");
            input.removeClass("valid").addClass("invalid");
            
        };
        checkForm();
       
    });

    //Padrão de teste e respostas para os valores inteiros
    var testeNums = new RegExp(/^[\p{L}a-zA-Z0-9 ]+$/);
    var txt_ints = new String("O valor deve ser inteiro e entre 0 e 99!");

    //Verificação customizada do nível
    $("#campoNivel").on('input', function() {
        var input= $(this);
        if (!(testeNums.test(input.val())) || (input.val()>99)){
            
            msg("#inv-nivel", txt_ints);
            formValid["nivel"] = false;
            input.removeClass("valid").addClass("invalid");
            show("#inv-nivel");
        }   
        else {
            formValid["nivel"] = true;
            $("#inv-nivel").hide();
            input.removeClass("invalid").addClass("valid");
        }   
        checkForm();
    });

    //Verificação customizada da força
    $("#campoForca").on('input', function() {
        var input= $(this);
        if (!(testeNums.test(input.val())) || (input.val()>99)){
            
            msg("#inv-forca", txt_ints);
            formValid["forca"] = false;
            input.removeClass("valid").addClass("invalid");
            show("#inv-forca");
        }   
        else {
            formValid["forca"] = true;
            $("#inv-forca").hide();
            input.removeClass("invalid").addClass("valid");
        }   
        checkForm();
    });

    //Verificação customizada da destreza
    $("#campoDestreza").on('input', function() {
        var input= $(this);
        if (!(testeNums.test(input.val())) || (input.val()>99)){
            
            msg("#inv-destreza", txt_ints);
            formValid["destreza"] = false;
            input.removeClass("valid").addClass("invalid");
            show("#inv-destreza");
        }   
        else {
            formValid["destreza"] = true;
            $("#inv-destreza").hide();
            input.removeClass("invalid").addClass("valid");
        }   
        checkForm();
    });

    //Verificação customizada da consituição
    $("#campoConstituicao").on('input', function() {
        var input= $(this);
        if (!(testeNums.test(input.val())) || (input.val()>99)){
            
            msg("#inv-constituicao", txt_ints);
            formValid["constituicao"] = false;
            input.removeClass("valid").addClass("invalid");
            show("#inv-constituicao");
        }   
        else {
            formValid["constituicao"] = true;
            $("#inv-constituicao").hide();
            input.removeClass("invalid").addClass("valid");
        }   
        checkForm();
    });

    //Verificação customizada da inteligencia
    $("#campoInteligencia").on('input', function() {
        var input= $(this);
        if (!(testeNums.test(input.val())) || (input.val()>99)){
            
            msg("#inv-inteligencia", txt_ints);
            formValid["inteligencia"] = false;
            input.removeClass("valid").addClass("invalid");
            show("#inv-inteligencia");
        }   
        else {
            formValid["inteligencia"] = true;
            $("#inv-inteligencia").hide();
            input.removeClass("invalid").addClass("valid");
        }   
        checkForm();
    });

    //Verificação customizada da sabedoria
    $("#campoSabedoria").on('input', function() {
        var input= $(this);
        if (!(testeNums.test(input.val())) || (input.val()>99)){
            
            msg("#inv-sabedoria", txt_ints);
            formValid["sabedoria"] = false;
            input.removeClass("valid").addClass("invalid");
            show("#inv-sabedoria");
        }   
        else {
            formValid["sabedoria"] = true;
            $("#inv-sabedoria").hide();
            input.removeClass("invalid").addClass("valid");
        }   
        checkForm();
    });

    //Verificação customizada do carisma
    $("#campoCarisma").on('input', function() {
        var input= $(this);
        if (!(testeNums.test(input.val())) || (input.val()>99)){
            
            msg("#inv-carisma", txt_ints);
            formValid["carisma"] = false;
            input.removeClass("valid").addClass("invalid");
            show("#inv-carisma");
        }   
        else {
            formValid["carisma"] = true;
            $("#inv-carisma").hide();
            input.removeClass("invalid").addClass("valid");
        }  
        checkForm();
    });

    //Padrão de verificação dos caracteres de texto para a história
    //Desativado por problemas com UTF-8
    //var textEspHist = new RegExp(/^[\p{L}a-zA-Z0-9-!?"'/,. ]+$/);



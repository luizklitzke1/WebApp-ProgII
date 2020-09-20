$(document).ready(function() {

    //Variável que garante que todos os campos sejam válidos 
    var formValid = {
        nome : true,
        carlos: false,
    }

    function checkForm(){
        var check = true;
        $.each(formValid, function(index, element) {
            console.log(element); 
            if (!element){
                check = false;
            };
        });

        //Tive que fazer isso em outra variável pois só returne dentro se mostrava inconsistente
        if (check){
            console.log("Deu bom!");
            return true;
        }
        else{
            console.log("Deu ruim!");
            return false;
        }
        
        };
    

    checkForm();
    
    //Muda a mensagem de erro nos inputs
    function msg(id,message){
        $(id).text(message).show;
    }

    //Mostra a div com a msg
    function show(id){
        $(id).show();
    }

    nome = $("#campoNome").val();
    $("#campoNome").on('input', function() {
        var input= $(this);
        var textEsp = new RegExp(/^[a-zA-Z0-9]+$/);
        if (!(textEsp.test(input.val()))){
            msg("#inv-nome","O nome não pode conter caracteres especiais!");
            show("#inv-nome");
            input.removeClass("valid").addClass("invalid");
        }   
        else if (input.val().length <3){
            msg("#inv-nome","O nome deve ter no mínimo 3 caracteres!");
            show("#inv-nome");
        }
        else {
            input.removeClass("invalid").addClass("valid");
            $("#inv-nome").hide();
        }   
            
       
    });

	

    
    
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

});

from flask import Blueprint, jsonify

#Definição da Blueprint
personagens = Blueprint('personagens',__name__)

from models_db import Personagem
from config import app, db
from geral.routes import salvar_imagem, apagar_imagem
from datetime import datetime


# Rota para listar personagens
@personagens.route("/listar_personagens")
def listar_personagens():
   
    personagens = db.session.query(Personagem).all()
    personagens_json = [Personagem.json() for Personagem in personagens]
    resposta =  jsonify(personagens_json)
    return resposta

    
    #return render_template('procurar_Personagem.html', titulo='Procurar Personagem', 
    #                        form_procurar_pers = form_procurar_pers, personagens = personagens)


# Rota para registrar personagens
@personagens.route("/registrar_Personagem", methods=['POST'])
def registrar_Personagem():
    
    resposta = jsonify({"resultado":"ok","detalhes":ok})
    dados = request.get_json()
    try: #Tenta fazer o registro
        novo_Personagem = Personagem(**dados)
        """novo_Personagem = Personagem(nome=form_Personagem.nome.data, 
                                     raca=form_Personagem.raca.data,
                                     classe=form_Personagem.classe.data, 
                                     nivel=form_Personagem.nivel.data,
                                     forca=form_Personagem.forca.data, 
                                     destreza=form_Personagem.destreza.data,
                                     constituicao=form_Personagem.constituicao.data, 
                                     inteligencia=form_Personagem.inteligencia.data,
                                     sabedoria=form_Personagem.sabedoria.data, 
                                     carisma=form_Personagem.carisma.data,
                                     historia=form_Personagem.historia.data, 
                                     foto=form_Personagem.foto_referencia.data,
                                     autor=current_user)
        """
        db.session.add(novo_Personagem)
        db.session.commit()
    except Exception as e: 
        resposta = jsonify({"resultado":"erro","detalhes":str(e)})
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    
    return resposta

    
# Rota para vizualizar um Personagem
@personagens.route("/Personagem/<int:Personagem_id>", methods=['GET', 'POST'])
def mostrar_Personagem(Personagem_id):

    pagina = request.args.get('pagina', 1, type=int)

    Personagem = Personagem.query.get_or_404(Personagem_id)


    db.session.commit()

    form_avaliar = Form_Avaliar_Personagem()
    form_editar_avaliacao = Form_Avaliar_Personagem()

    #Verifica se uma avaliação foi editada
    if avaliacao_usuario and form_editar_avaliacao.validate_on_submit():

        avaliacao_usuario.data_postagem = datetime.now()

        avaliacao_usuario.conteudo = form_editar_avaliacao.conteudo.data

        avaliacao_usuario.nota = form_editar_avaliacao.nota.data

        db.session.commit()
        flash('Avaliação editada com sucesso!', 'success')
        return redirect(url_for('personagens.mostrar_Personagem', Personagem_id=Personagem.id))

    #Verifica se uma nova avaliação foi registrada
    elif form_avaliar.validate_on_submit():

        nova_avalicao = Avaliacao(autor_id = current_user.id, Personagem_id = Personagem_id, 
                                  conteudo = form_avaliar.conteudo.data, nota = form_avaliar.nota.data)


        db.session.add(nova_avalicao)
        db.session.commit()

        flash('Personagem avaliado com sucesso!', 'success')
        return redirect(url_for('personagens.mostrar_Personagem', Personagem_id=Personagem.id))

    #Pré-popula os campos da avaliação caso for ser editada
    elif request.method == "GET" and avaliacao_usuario:

        form_editar_avaliacao.nota.data = avaliacao_usuario.nota 
        form_editar_avaliacao.conteudo.data = avaliacao_usuario.conteudo
        
    return render_template('Personagem.html', titulo=Personagem.nome,  Personagem = Personagem,
                                              avaliacoes = avaliacoes, form_avaliar = form_avaliar, 
                                              form_editar_avaliacao = form_editar_avaliacao,
                                              avaliacao_usuario = avaliacao_usuario )

# Rota para editar um Personagem
@personagens.route("/Personagem/<int:Personagem_id>/editar",  methods=['GET', 'POST'])

def editar_Personagem(Personagem_id):
    

    Personagem = Personagem.query.get_or_404(Personagem_id)

    if (Personagem.autor != current_user) and not(current_user.isAdmin):
        abort(403)

    form_editar = Form_Personagem()

    if form_editar.validate_on_submit():

        Personagem.nome = form_editar.nome.data
        Personagem.raca = form_editar.raca.data
        Personagem.classe = form_editar.classe.data
        Personagem.nivel = form_editar.nivel.data
        Personagem.forca = form_editar.forca.data
        Personagem.destreza = form_editar.destreza.data
        Personagem.constituicao = form_editar.constituicao.data
        Personagem.inteligencia = form_editar.inteligencia.data
        Personagem.sabedoria = form_editar.sabedoria.data
        Personagem.carisma = form_editar.carisma.data
        Personagem.historia = form_editar.historia.data

        if form_editar.foto_referencia.data:
            if Personagem.foto != 'Personagem.png':
                apagar_imagem('static/imagens_personagens', Personagem.foto)
            picture_file = salvar_imagem('static/imagens_personagens', form_editar.foto_referencia.data)
            Personagem.foto = picture_file

        db.session.commit()
        flash('Personagem editado com sucesso!', 'success')
        return redirect(url_for('personagens.mostrar_Personagem', Personagem_id=Personagem.id))

    elif request.method == "GET":
        
        #Pré-popular os campos com os dados do Personagem 
        form_editar = Form_Personagem(Personagem.nome, Personagem.raca, Personagem.classe, Personagem.nivel,
                               Personagem.forca, Personagem.destreza, Personagem.constituicao,
                               Personagem.inteligencia, Personagem.sabedoria, Personagem.carisma, 
                               Personagem.historia)


    return render_template('editar_Personagem.html', titulo='Personagem.nome', form_editar=form_editar, 
                                                     Personagem=Personagem)

# Rota para apagar um Personagem
@personagens.route("/Personagem/<int:Personagem_id>/apagar",  methods=['POST'])

def apagar_Personagem(Personagem_id):
    Personagem = Personagem.query.get_or_404(Personagem_id)
    if (Personagem.autor != current_user) and not(current_user.isAdmin):
        abort(403)

    #Apagar as avaliações do Personagem
    #(Não sei porque não apaga automaticamente na verdade)
    avaliacoes = Avaliacao.query.filter_by(Personagem_id = Personagem_id)
    for avaliacao in avaliacoes:
        db.session.delete(avaliacao)
        
    if Personagem.foto != 'Personagem.png':
                apagar_imagem('static/imagens_personagens', Personagem.foto)
    db.session.delete(Personagem)
    db.session.commit()
    flash('Personagem apagado com sucesso!', 'success')
    return redirect(url_for('geral.mostrar_home'))



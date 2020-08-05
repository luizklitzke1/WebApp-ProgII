from config import *
from models_db import Personagem


# Rota para a home
@app.route("/")
def inicio_backend():
    return "<a href='/listar_personagens'>Listar personagens</a>"

@app.route("/home")
def mostrar_home():

    personagens = Personagem.query.order_by(Personagem.data_criacao.desc()).limit(6)
    return render_template('home.html', personagens=personagens, titulo="Home")

# Método para salvar imagens de perfil compactadas
def salvar_imagem(diretorio, form_picture):
    rhex = secrets.token_hex(9)
    nome_foto = rhex + ".png"
    caminho = os.path.join(app.root_path, diretorio, nome_foto)

    # Resize na imagem antes de upar, se não for GIF
    tamanho_imagem = (200, 200)
    imagem_menor = Image.open(form_picture)
    imagem_menor.thumbnail(tamanho_imagem)
    imagem_menor.save(caminho)
    return nome_foto

# Método para apagar as imagens ao apagar um usuário ou personagem
def apagar_imagem(diretorio, foto):
    caminho = os.path.join(app.root_path, diretorio, foto)
    os.remove(caminho)

# Rota para listar personagens
@app.route("/listar_personagens")
def listar_personagens():
   
    personagens = db.session.query(Personagem).all()
    personagens_json = [Personagem.json() for Personagem in personagens]
    return (jsonify(personagens_json))

    
    #return render_template('procurar_Personagem.html', titulo='Procurar Personagem', 
    #                        form_procurar_pers = form_procurar_pers, personagens = personagens)


# Rota para registrar personagens
@app.route("/registrar_personagem", methods=['POST'])
def registrar_Personagem():
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    dados = request.get_json()
    try: #Tenta fazer o registro
        
        novo_Personagem = Personagem(**dados)
        
        #Descobrir como salvar as imgs 
        novo_Personagem.foto = "personagem"
        
        print(novo_Personagem.foto)
        
        db.session.add(novo_Personagem)
        db.session.commit()
        
    except Exception as e: 
        resposta = jsonify({"resultado":"erro","detalhes":str(e)})
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    
    return resposta

# Rota para apagar um Personagem
@app.route("/apagar_pers",  methods=['POST'])

def apagar_Personagem():
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    dados = request.get_json()
    
    personagem = Personagem.query.get_or_404(dados.get("id"))
    db.session.delete(personagem)
    db.session.commit()
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    
    return resposta
    
# Rota para vizualizar um Personagem
@app.route("/Personagem/<int:Personagem_id>", methods=['GET', 'POST'])
def mostrar_Personagem(Personagem_id):

    pagina = request.args.get('pagina', 1, type=int)

    Personagem = Personagem.query.get_or_404(Personagem_id)


    db.session.commit()

    form_avaliar = Form_Avaliar_Personagem()
    form_editar_avaliacao = Form_Avaliar_Personagem()

        
    return render_template('Personagem.html', titulo=Personagem.nome,  Personagem = Personagem,
                                              avaliacoes = avaliacoes, form_avaliar = form_avaliar, 
                                              form_editar_avaliacao = form_editar_avaliacao,
                                              avaliacao_usuario = avaliacao_usuario )

# Rota para editar um Personagem
@app.route("/Personagem/<int:Personagem_id>/editar",  methods=['GET', 'POST'])

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
            picture_file = salvar_imagem('../front_end/static/imagens_personagens', form_editar.foto_referencia.data)
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





#Rodar Programa ao executar esse módulo
if __name__ == '__main__':
    app.run(debug=True)


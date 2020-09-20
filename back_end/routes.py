from models_db import Personagem
from config import *

# Rota para a home
@app.route("/")
def inicio_backend():
    return "<a href='/listar_personagens'>Listar personagens</a>"

# Rota para listar personagens
@app.route("/listar_personagens")
def listar_personagens():
   
    personagens = db.session.query(Personagem).all()
    personagens_json = [Personagem.json() for Personagem in personagens]
    return (jsonify(personagens_json))


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
@app.route("/apagar_pers/<int:id_pers>",  methods=['DELETE'])
def apagar_Personagem(id_pers):
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try: #Tentar realizar a exclusão
        personagem = Personagem.query.get_or_404(id_pers)
        db.session.delete(personagem)
        db.session.commit()
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta

# Rota para procurar personagens
@app.route("/procurar_pers", methods=['GET'])
def procurar_pers():
    
    dados = request.get_json()
    personagens = db.session.query(Personagem).filter(
                                                        Personagem.nome.like(f"%{dados['nome']}%"),
                                                        Personagem.raca.like(f"%{dados['raca']}%"),
                                                        Personagem.classe.like(f"%{dados['classe']}%"),
                                                        )
    for p in personagens:
        print(p)
    personagens_json = [Personagem.json() for Personagem in personagens]
    resposta = jsonify(personagens_json)
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta
    
    
# [WIP] Rota para vizualizar um Personagem
@app.route("/Personagem/<int:Personagem_id>", methods=['GET', 'POST'])
def mostrar_Personagem(Personagem_id):

    Personagem = Personagem.query.get_or_404(Personagem_id)
    db.session.commit()


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


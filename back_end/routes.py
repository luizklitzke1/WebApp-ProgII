from models_db import Personagem, Aventura, Presenca
from PIL import Image
import base64
from config import *
import os, io

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
        
        #Testa se foi informada alguma foto, ou mantém a padrão
        if (dados["foto"] != None):
            novo_Personagem.foto = salvar_imagem_base64('../front_end/static/imagens_personagens',(dados["foto"]))
        
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
        apagar_imagem('../front_end/static/imagens_personagens', personagem.foto)
        db.session.delete(personagem)
        db.session.commit()
        
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta

# Rota para editar um Personagem
@app.route("/editar_personagem/<int:id_pers>",  methods=['POST'])
def editar_Personagem(id_pers):
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    dados = request.get_json()
    
    try: #Tentar realizar a edição
        
        p = Personagem.query.get_or_404(id_pers)
        print(p)

        p.nome = dados["nome"]
        p.raca = dados["raca"]
        p.classe = dados["classe"]  
        p.nivel = dados["nivel"]
        p.forca = dados["forca"]
        p.destreza = dados["destreza"]
        p.constituicao = dados["constituicao"]
        p.inteligencia = dados["inteligencia"]
        p.sabedoria = dados["sabedoria"]
        p.carisma = dados["carisma"]
        p.historia = dados["historia"]
        
        #Se foi informada uma novo imagem, ou apenas manter a antiga
        if (dados["foto"] != None):

            apagar_imagem('../front_end/static/imagens_personagens', (p.foto))
            p.foto = salvar_imagem_base64('../front_end/static/imagens_personagens', dados["foto"])
            
        db.session.commit()
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta

# Rota pegar os dados de um Personagem específico
@app.route("/dados_pers/<int:id_pers>",  methods=['GET'])
def dados_Personagem(id_pers):
    
    try: #Tentar achar o personagem
        personagem = Personagem.query.get_or_404(id_pers)
        resposta = jsonify(personagem.json())
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta


# Método para salvar imagens de perfil compactadas
def salvar_imagem_base64(diretorio, base64str):
    
    rhex = secrets.token_hex(9)
    nome_foto = rhex + ".png"
    caminho = os.path.join(app.root_path, diretorio, nome_foto)
    tamanho_imagem = (200, 200)
    
    image = base64.b64decode(str(base64str)) 
    
    imagem_menor = Image.open(io.BytesIO(image))
    imagem_menor.thumbnail(tamanho_imagem)
    imagem_menor.save(caminho)
    
    return nome_foto


# Método para apagar as imagens ao apagar um usuário ou personagem
def apagar_imagem(diretorio, foto):
    
    #Verifica se não é a imagem padrão
    if (foto != "personagem.png"):
        caminho = os.path.join(app.root_path, diretorio, foto)
        os.remove(caminho)


# Rota para registrar aventuras
@app.route("/registrar_aventura", methods=['POST'])
def registrar_Aventura():
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    dados = request.get_json()
    try: #Tenta fazer o registro
        
        nova_Aventura = Aventura(**dados)
        
        #Testa se foi informada alguma foto, ou mantém a padrão
        if (dados["foto"] != None):
            nova_Aventura.foto = salvar_imagem_base64('../front_end/static/imagens_aventuras',(dados["foto"]))
        
        db.session.add(nova_Aventura)
        db.session.commit()
        
    except Exception as e: 
        resposta = jsonify({"resultado":"erro","detalhes":str(e)})
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    
    return resposta

from models_db import Personagem, Aventura, Participacao
from PIL import Image
import base64
from config import *
import os, io

# Rota para a home
@app.route("/")
def inicio_backend():
    return """<a href='/listar_personagens'>Listar personagens</a>
            <a href='/listar_aventuras'>Listar aventuras</a>
            <a href='/listar_participacoes'>Listar participações</a>
            """


# Rota para listar personagens
@app.route("/listar_personagens")
def listar_personagens():
   
    personagens = db.session.query(Personagem).all()
    personagens_json = [Personagem.json() for Personagem in personagens]
    return (jsonify(personagens_json))

# Rota para listar aventuras
@app.route("/listar_aventuras")
def listar_aventuras():
   
    aventuras = db.session.query(Aventura).all()
    aventuras_json = [Aventura.json() for Aventura in aventuras]
    return (jsonify(aventuras_json))

# Rota para listar TODAS participações
@app.route("/listar_participacoes")
def listar_participacoes():
   
    participacoes = db.session.query(Participacao).all()
    participacoes_json = [Participacao.json() for Participacao in participacoes]
    return (jsonify(participacoes_json))


# Rota para listar participações de uma adv especifica
@app.route("/listar_participacoes_esp/<int:id_avent>",  methods=['POST', 'GET'])
def listar_participacoes_esp(id_avent):
   
    participacoes = Participacao.query.filter(Participacao.adv_id == id_avent).all()
    
    participacoes_json = [Participacao.json() for Participacao in participacoes]
    return (jsonify(participacoes_json))



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


# Rota pegar os dados de uma Aventura específica
@app.route("/dados_adv/<int:id_adv>",  methods=['GET'])
def dados_Aventura(id_adv):
    
    try: #Tentar achar a aventura
        aventura = Aventura.query.get_or_404(id_adv)
        resposta = jsonify(aventura.json())
        
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
    if (foto != "personagem.png" or foto!= "aventura.png"):
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


# Rota para apagar uma Aventura
@app.route("/apagar_adv/<int:id_adv>",  methods=['DELETE'])
def apagar_Aventura(id_adv):
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try: #Tentar realizar a exclusão
        aventura = Aventura.query.get_or_404(id_adv)
        apagar_imagem('../front_end/static/imagens_aventuras', aventura.foto)
        db.session.delete(aventura)
        db.session.commit()
        
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta


# Rota para editar um Personagem
@app.route("/editar_aventura/<int:adv_id>",  methods=['POST'])
def editar_Aventura(adv_id):
    
    print("aaaaaaaaaaaa")
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    dados = request.get_json()
    
    try: #Tentar realizar a edição
        
        a = Aventura.query.get_or_404(adv_id)
        print(a)

        a.nome = dados["nome"]
        a.nome_mestre = dados["nome_mestre"]
        a.tematica = dados["tematica"]  
        a.resumo = dados["resumo"]
        
        #Se foi informada uma novo imagem, ou apenas manter a antiga
        if (dados["foto"] != None):

            apagar_imagem('../front_end/static/imagens_aventuras', (a.foto))
            a.foto = salvar_imagem_base64('../front_end/static/imagens_aventuras', dados["foto"])
            
        db.session.commit()
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta


# Rota para registrar participações
@app.route("/registrar_participacao", methods=['POST'])
def registrar_Participacao():
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    dados = request.get_json()
    try: #Tenta fazer o registro
        
        nova_Participacao = Participacao(**dados)
        
        db.session.add(nova_Participacao)
        db.session.commit()
        
    except Exception as e: 
        resposta = jsonify({"resultado":"erro","detalhes":str(e)})
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    
    return resposta

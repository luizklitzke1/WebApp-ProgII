from config import *

#Classe para os dados dos Personagens
class Personagem(db.Model):
    id_pers = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    raca = db.Column(db.String(33), nullable=False)
    classe = db.Column(db.String(33), nullable=False)
    nivel = db.Column(db.Integer, nullable=False)
    forca = db.Column(db.Integer, nullable=False)
    destreza = db.Column(db.Integer, nullable=False)
    constituicao = db.Column(db.Integer, nullable=False)
    inteligencia = db.Column(db.Integer, nullable=False)
    sabedoria = db.Column(db.Integer, nullable=False)
    carisma = db.Column(db.Integer, nullable=False)
    historia = db.Column(db.Text, nullable=False, default='Nenhuma história informada.')
    data_criacao = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    #Endereço em string para o arquivo salvo em Static - gera ao registrar -
    foto = db.Column(db.String(20), nullable=False, default='personagem.png')


    #Representação em String - só os dados mais relevantes para identificar mesmo
    def __repr__(self):
        return f"Nome: '{self.nome}', Raca: '{self.raca}', Classe: '{self.classe}', Nivel: '{self.nivel}'"

    #Expressão da classe em Json - todos os dados para conversão
    def json(self):
        return{
            "id_pers": self.id_pers, "nome": self.nome,
            "raca": self.raca, "classe":self.classe,
            "nivel": self.nivel, "forca": self.forca,
            "destreza": self.destreza, "constituicao": self.constituicao,
            "inteligencia": self.inteligencia, "sabedoria": self.sabedoria,
            "carisma": self.carisma, "historia": self.historia,
            "data_criacao": self.data_criacao, "foto": self.foto,
        }
        

#Classe para os dados de uma aventura
class Aventura(db.Model):
    id_avent = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    nome_mestre = db.Column(db.String(33), nullable=False)
    tematica = db.Column(db.String(33), nullable=False)
    resumo = db.Column(db.Text, nullable=False, default='Nenhuma resumo informado.')
    data_criacao = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    #Endereço em string para o arquivo salvo em Static - gera ao registrar -
    foto = db.Column(db.String(20), nullable=False, default='personagem.png')

    #Representação em String
    def __repr__(self):
        return f"Nome: '{self.nome}', Nome do mestre: '{self.nome_mestre}', Temática: '{self.tematica}', Criação: '{self.data_criacao}'"

    #Expressão da classe em Json - todos os dados para conversão
    def json(self):
        return{
            "id_avent": self.id_avent, "nome": self.nome,
            "nome_mestre": self.nome_mestre, "tematica":self.tematica,
            "resumo": self.resumo, "data_criacao": self.data_criacao,
            "foto": self.foto,
        }
        
#Classe para os dados de um registro de presença
class Presenca(db.Model):
    id_presenc = db.Column(db.Integer, primary_key=True)
    nome_jogador = db.Column(db.String(33), nullable=False)
    observacao = db.Column(db.Text, nullable=False, default='Nenhuma observação informada.')
    data_presenca = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    #Chave estrangeira do personagem
    pers_id = db.Column(db.Integer, db.ForeignKey(Personagem.id_pers), nullable = False)
    personagem = db.relationship("Personagem")
    #Chave estrangeira da aventura
    adv_id = db.Column(db.Integer, db.ForeignKey(Aventura.id_avent), nullable = False)
    aventura = db.relationship("Aventura")
    
    
    #Representação em String
    def __repr__(self):
        return f"ID: '{self.id_presenc}', Nome do jogador: '{self.nome_jogador}', Observação: '{self.observacao}', Data: '{self.data_presenca}'"

    #Expressão da classe em Json - todos os dados para conversão
    def json(self):
        return{
            "id_presenc": self.id_presenc, "nome_jogador": self.nome_jogador,
            "observacao": self.observacao, "data_presenca":self.data_presenca,
            "personagem": self.personagem.json(),
            "aventura": self.aventura.json(),
        }

#Cria os valores para teste, caso executado esse modulo diretamente
if __name__ == "__main__":
    
    #Apaga o db, se já existir
    
    if os.path.exists(arquivobd):
        os.remove(arquivobd)
        
    db.create_all()


    # Aventuras de teste
    
    a1 = Aventura(
        nome="Scourge of the Howling Horde",
        nome_mestre = "Gwendolyn F.M. Kestrel",
        tematica = "Classica",
        resumo = """Scourge of the Howling Horde is a generic setting adventure module for the 3.5 edition 
        of the Dungeons & Dragons roleplaying game. The adventure is designed for 1st level characters. It contains a 32-page adventure.""",
        foto = "7a03cfe14c20c52bef"
    )
    
    
    a2 = Aventura(
        nome="Lord of the Iron Fortress",
        nome_mestre = "	Andy Collins",
        tematica = "Classica - Customizada",
        resumo = """According to the adventure background provided, the plot involves the Blade of Fiery Might once wielded by the sultan of the efreet, 
        which was destroyed and scattered across the planes. Imperagon, a half-duergar/half-dragon and ruler of the Iron Fortress of Zandikar on the plane of Acheron, 
        has been reforging the sword using the trapped spirits of the greatest forgemasters of history as slave labor. Imperagon intends to wield the ancient blade at the 
        head of a great army to conquer and build a kingdom on the Material Plane, with allies among the drow, the illithids, and fellow natives of the evil Outer Planes. 
        The adventure begins when the player characters investigate events involving local craftsmen, following the trail of clues to the city of Rigus, which leads into the 
        plane of Acheron. """,
        foto = "20a9e81435f9fa687d"
    )
    
    
    db.session.add(a1)
    db.session.add(a2)
    
    # Personagens de teste
    p1 = Personagem(nome="Onerom", 
                    raca="Humano",
                    classe="Guerreiro", 
                    nivel=82,
                    forca=20, 
                    destreza=15,
                    constituicao=19, 
                    inteligencia=15,
                    sabedoria=16, 
                    carisma=20,
                    historia=""""Lendário guerreiro, conhecido por toda a  extensão domundo conhecido,
                    amado por um grupo seleto, porém temido por todos.
                    Porta sua característica arma de duas mão, famosa por sua letalidade em ataques diretos, 
                    além de sua incrível capacidade de intimidação.""", 
                    foto="d0912a5bfa2c778266")
    
    p2 = Personagem(nome="Clint com o Anão", 
                    raca="Humano e Anão",
                    classe="Sharpshooter", 
                    nivel=34,
                    forca=18, 
                    destreza=32,
                    constituicao=15, 
                    inteligencia=19,
                    sabedoria=20, 
                    carisma=20,
                    historia="""Um grupo que, de tanto unido, caracteriza uma única entidade.
                    Formado por uma série de fatos improváveis, tal dupla se concretiza como sérios 
                    contratantes da região mais hostil e selvagem da Fronteira
                    """, 
                    foto="564424e3928ba1c88a")
    
    p3 = Personagem(nome="Mangle", 
                    raca="Animatronic",
                    classe="Monstro	", 
                    nivel=65,
                    forca=12, 
                    destreza=22,
                    constituicao=13, 
                    inteligencia=11,
                    sabedoria=7, 
                    carisma=6,
                    historia="""QUer comer pizza? Tenha cuidado para não ser comido também!.""", 
                    foto="c34cb551ebee1df255")
    
    p4 = Personagem(nome="Hulk Agiota", 
                    raca="Hulk	",
                    classe="Agiota	", 
                    nivel=23,
                    forca=28, 
                    destreza=12,
                    constituicao=20, 
                    inteligencia=6,
                    sabedoria=15, 
                    carisma=2,
                    historia="""m meio ao desespero completo, muitos buscam salvação no vazio.
                    Acólito do caos, servo da maldade, nomeado como Hulk agiota, é aquele que vende uma falsa esperança 
                    para aqueles desprovidos de qualquer reserva monetária. É como a sensação de estar submerso quase sem 
                    fôlego e quando finalmente você se aproxima da superfície para enfim respirar, é subitamente puxado de 
                    volta para fundo. A falsa esperança que vem acompanhada de terror, sofrimento e acima de tudo, arrependimento.
                    Por isso lembre-se, uma dívida com o Hulk Agiota, NUNCA será esquecida.""", 
                    foto="1a9460c091846ad35f")
    
    p5 = Personagem(nome="Jarbas do Sul", 
                    raca="Humano",
                    classe="Sulista	", 
                    nivel=12,
                    forca=23, 
                    destreza=12,
                    constituicao=14, 
                    inteligencia=12,
                    sabedoria=73, 
                    carisma=15,
                    historia="""Grandíssimo mestre da arte da sinuca, porém superado devido ao seu ego e pressa, sendo a 
                    contrapartida perfeita para o mestre de Mauá""", 
                    foto="20a9de87e4f9fa687d")
    
    p6 = Personagem(nome="Deivid Elton", 
                    raca="Humano?",
                    classe="Deusvis", 
                    nivel=23,
                    forca=12, 
                    destreza=12,
                    constituicao=20, 
                    inteligencia=13,
                    sabedoria=21, 
                    carisma=20,
                    historia="""Sua origem ainda é incerta, porém sua fama o precede.
                    Sua chegada nunca é anunciada formalmente, porém Deivola pode ser sentido a 21cm de distância 
                    por vários sentidos distintos.""", 
                    foto="7a03cfee7a20c52bef")
    
    
    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    db.session.add(p6)
    db.session.commit()
    
    # Print de um Personagem normal e em Json
    print(p3)
    print(p3.json())
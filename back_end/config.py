
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)


path = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(path, 'rpg.db')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+arquivobd
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # remover warnings

db = SQLAlchemy(app)

#Importa as rotas dos Blueprints
from personagens.routes import personagens
app.register_blueprint(personagens)

from geral.routes import geral
app.register_blueprint(geral)

#from erros.handlers import erros
#app.register_blueprint(erros)
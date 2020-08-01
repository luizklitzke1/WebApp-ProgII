
from flask import Flask, jsonify, request, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from PIL import Image

import secrets
import os

app = Flask(__name__)
CORS(app)


path = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(path, 'rpg.db')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+arquivobd
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # remover warnings

db = SQLAlchemy(app)



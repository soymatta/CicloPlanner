from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.template_folder = '../templates'
app.static_folder = '..//static'

app.secret_key = "E2A0C0E8AB7B6F2C96822D548FCC7E5C"

app.config['SQLALCHEMY_DATABASE_URI']= "mysql+pymysql://root@localhost/cicloplanner"
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
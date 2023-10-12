from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.template_folder = '../templates'
app.static_folder = '..//static'

app.config['SQLALCHEMY_DATABASE_URI']= "mysql+pymysql://root@localhost/cicloplanner"
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
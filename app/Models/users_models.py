from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from db.db import app

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(30))
    email = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(30), nullable=False)
    image = db.Column(db.String(300))
    address = db.Column(db.String(300))

    def __init__(self, username, email, password, image, address):
        self.username = username
        self.email = email
        self.password = password
        self.image = image
        self.address = address

class UsuariosSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Usuarios

usuario_schema = UsuariosSchema()
usuarios_schema = UsuariosSchema(many=True)

with app.app_context():
    db.create_all()
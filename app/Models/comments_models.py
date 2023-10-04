from Models.users_models import db, ma
from db.db import app

class Comentarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=True)
    date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))

    def __init__(self, content, date, user_id):
        self.content = content
        self.date = date
        self.user_id = user_id

class ComentariosSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comentarios

comentario_schema = ComentariosSchema()
comentarios_schema = ComentariosSchema(many=True)

with app.app_context():
    db.create_all()
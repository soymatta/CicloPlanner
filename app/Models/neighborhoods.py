from Models.users_models import db, ma
from db.db import app

class Neighborhoods(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    coords = db.Column(db.String(255), nullable=True)
    alarm_id = db.Column(db.Integer, db.ForeignKey('rutas.alarms'))

    def __init__(self, name, coords, alarm_id):
        self.name = name
        self.coords = coords
        self.alarm_id = alarm_id

class NeighborhoodsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Neighborhoods

neighborhoods_schema = NeighborhoodsSchema()
neighborhoods_schema = NeighborhoodsSchema(many=True)

with app.app_context():
    db.create_all()
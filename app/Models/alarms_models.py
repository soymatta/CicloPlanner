from db.db import app, db, ma

class Alarms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    neighborhood_id = db.Column(db.Integer, db.ForeignKey('rutas.neighborhood'))

    def __init__(self, titulo, description, neighborhood_id):
        self.titulo = titulo
        self.description = description
        self.neighborhood_id = neighborhood_id

class AlarmsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Alarms

alarm_schema = AlarmsSchema()
alarms_schema = AlarmsSchema(many=True)

with app.app_context():
    db.create_all()
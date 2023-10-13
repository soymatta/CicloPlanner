from db.db import app, db, ma

class Alarms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)

    def __init__(self, titulo, description):
        self.titulo = titulo
        self.description = description

class AlarmsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Alarms

alarm_schema = AlarmsSchema()
alarms_schema = AlarmsSchema(many=True)

with app.app_context():
    db.create_all()

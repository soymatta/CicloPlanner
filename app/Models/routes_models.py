from db.db import app, db, ma

class Routes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    distance = db.Column(db.String(255), nullable=False)
    aprox_time = db.Column(db.Time, nullable=False)
    start = db.Column(db.String(255), nullable=False)
    destiny = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    favorite = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))

    def __init__(self, nombre, distance, aprox_time, start, destiny, state, user_id):
        self.nombre = nombre
        self.distance = distance
        self.aprox_time = aprox_time
        self.start = start
        self.destiny = destiny
        self.state = state
        self.user_id = user_id

class RoutesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Routes

route_schema = RoutesSchema()
routes_schema = RoutesSchema(many=True)

with app.app_context():
    db.create_all()
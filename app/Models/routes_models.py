from db.db import app, db, ma

class Routes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    start = db.Column(db.String(255), nullable=False)
    destiny = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, nombre, start, destiny, user_id):
        self.nombre = nombre
        self.start = start
        self.destiny = destiny
        self.user_id = user_id

class RoutesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Routes
        fields = ("id", "nombre", "start","destiny" ,"user_id")

route_schema = RoutesSchema()
routes_schema = RoutesSchema(many=True)

with app.app_context():
    db.create_all()
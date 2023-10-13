from db.db import app, db, ma

class Neighborhoods(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    coords = db.Column(db.String(255), nullable=True)

    def __init__(self, name, coords):
        self.name = name
        self.coords = coords

class NeighborhoodsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Neighborhoods

neighborhood_schema = NeighborhoodsSchema()
neighborhoods_schema = NeighborhoodsSchema(many=True)

with app.app_context():
    db.create_all()
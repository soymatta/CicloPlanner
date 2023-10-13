from db.db import app, db, ma

class NeighborhoodsAlarms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    neighborhoods_id = db.Column(db.Integer, db.ForeignKey('neighborhoods.id'), nullable=False)
    alarms_id = db.Column(db.Integer, db.ForeignKey('alarms.id'), nullable=False)

    def __init__(self, neighborhoods_id, alarms_id):
        self.neighborhoods_id = neighborhoods_id
        self.alarms_id = alarms_id


class NeighborhoodsAlarmsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = NeighborhoodsAlarms

neighborhoodAlarm_schema = NeighborhoodsAlarmsSchema()
neighborhoodsAlarms_schema = NeighborhoodsAlarmsSchema(many=True)

with app.app_context():
    db.create_all()
